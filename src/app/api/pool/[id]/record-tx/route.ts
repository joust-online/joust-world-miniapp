import { NextRequest, NextResponse } from "next/server";
import { jsonResponse } from "@/lib/json";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { notifyUser } from "@/lib/notifications";
import {
  getVerifiedReceipt,
  decodeContractLogs,
  requireEvent,
  TxVerificationError,
} from "@/lib/tx-verify";
import { PoolState, NotificationType } from "@/generated/prisma";

/** Notify all unique jousters in a pool. Non-blocking — errors are logged, not thrown. */
async function notifyAllJousters(
  poolId: string,
  type: NotificationType,
  title: string,
  body: string,
): Promise<void> {
  try {
    const jousts = await prisma.joust.findMany({
      where: { poolId },
      include: { user: { select: { id: true, address: true } } },
    });
    const notifiedUserIds = new Set<number>();
    for (const j of jousts) {
      if (notifiedUserIds.has(j.user.id)) continue;
      notifiedUserIds.add(j.user.id);
      await notifyUser(
        prisma,
        j.user.id,
        type,
        title,
        body,
        poolId,
        j.user.address,
        `/pool/${poolId}`,
      );
    }
  } catch (err) {
    console.error("notifyAllJousters failed (non-blocking):", err);
  }
}

const recordTxSchema = z.object({
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  action: z.enum(["deploy", "accept-arbiter", "close", "settle", "refund"]),
  winningJoustType: z.number().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const body = await req.json();
    const parsed = recordTxSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { txHash, action } = parsed.data;

    const pool = await prisma.pool.findUnique({ where: { id } });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    // ── Authorization ──
    if (action === "deploy") {
      if (session.userId !== pool.creatorId) {
        return NextResponse.json(
          { error: "Only pool creator can record deployment" },
          { status: 403 },
        );
      }
    } else {
      if (session.address.toLowerCase() !== pool.arbiterAddress.toLowerCase()) {
        return NextResponse.json(
          { error: "Only arbiter can perform this action" },
          { status: 403 },
        );
      }
    }

    // ── Verify tx on-chain ──
    const receipt = await getVerifiedReceipt(txHash as `0x${string}`);
    const decodedLogs = decodeContractLogs(receipt.logs);

    let updatedPool;
    switch (action) {
      case "deploy": {
        // #5: State precondition — pool must not already be deployed
        if (pool.contractId !== null) {
          return NextResponse.json({ error: "Pool already deployed" }, { status: 400 });
        }

        const event = requireEvent(decodedLogs, "PoolCreated", "PoolCreationPending");
        const contractId = BigInt(event.args.id as bigint);

        // #1: Tx replay check — ensure this txHash hasn't been used for another deploy
        const existingDeploy = await prisma.pool.findFirst({
          where: { deployTxHash: txHash },
        });
        if (existingDeploy) {
          return NextResponse.json({ error: "Transaction already used" }, { status: 409 });
        }

        // #12: Populate deployTxHash
        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            contractId,
            deployTxHash: txHash,
            deployedAt: new Date(),
            contractEndTime: Math.floor(pool.endTime.getTime() / 1000),
          },
        });
        break;
      }

      case "accept-arbiter": {
        // #5: State precondition
        if (pool.arbiterAccepted) {
          return NextResponse.json({ error: "Arbiter already accepted" }, { status: 400 });
        }

        const matchingEvent = decodedLogs.find(
          (e) => e.eventName === "PoolCreated" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        const arbiterUser = await prisma.user.findUnique({
          where: { address: pool.arbiterAddress },
        });
        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            arbiterAccepted: true,
            state: PoolState.ACTIVE,
            ...(arbiterUser ? { arbiterId: arbiterUser.id } : {}),
          },
        });

        // #10: Notifications after response-critical DB update, wrapped in try/catch
        const creator = await prisma.user.findUnique({ where: { id: pool.creatorId } });
        if (creator) {
          try {
            await notifyUser(
              prisma,
              creator.id,
              "ARBITER_ACCEPTED",
              "Arbiter Accepted",
              `The arbiter has accepted your pool "${pool.title}".`,
              id,
              creator.address,
              `/pool/${id}`,
            );
          } catch (err) {
            console.error("Failed to notify creator (non-blocking):", err);
          }
        }
        break;
      }

      case "close": {
        // #5: State precondition
        if (pool.state !== PoolState.ACTIVE) {
          return NextResponse.json({ error: "Pool must be active to close" }, { status: 400 });
        }

        const matchingEvent = decodedLogs.find(
          (e) => e.eventName === "PoolClosed" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: PoolState.CLOSED, closedAt: new Date() },
        });
        break;
      }

      case "settle": {
        // #5: State precondition — must be CLOSED or ACTIVE+expired
        const expired = pool.endTime < new Date();
        if (pool.state !== PoolState.CLOSED && !(pool.state === PoolState.ACTIVE && expired)) {
          return NextResponse.json(
            { error: "Pool must be closed or expired to settle" },
            { status: 400 },
          );
        }

        const matchingEvent = decodedLogs.find(
          (e) => e.eventName === "PoolSettled" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        // #2: Extract winningJoustType from on-chain event, not client
        const onChainWinningType = Number(matchingEvent.args.winningJoustType);

        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            state: PoolState.SETTLED,
            winningJoustType: onChainWinningType,
            settledAt: new Date(),
          },
        });
        await prisma.joust.updateMany({
          where: { poolId: id, joustType: onChainWinningType },
          data: { isWinner: true },
        });

        // #10: Non-blocking notifications
        await notifyAllJousters(
          id,
          "POOL_SETTLED",
          "Pool Settled",
          `The pool "${pool.title}" has been settled.`,
        );
        break;
      }

      case "refund": {
        // #5: State precondition — must not already be settled/refunded
        if (pool.state === PoolState.SETTLED || pool.state === PoolState.REFUNDED) {
          return NextResponse.json({ error: "Pool already settled or refunded" }, { status: 400 });
        }

        const matchingEvent = decodedLogs.find(
          (e) => e.eventName === "PoolRefunded" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: PoolState.REFUNDED, refundedAt: new Date() },
        });

        // #10: Non-blocking notifications
        await notifyAllJousters(
          id,
          "POOL_REFUNDED",
          "Pool Refunded",
          `The pool "${pool.title}" has been refunded.`,
        );
        break;
      }
    }

    return jsonResponse({ pool: updatedPool });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof TxVerificationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Record tx error:", error);
    return NextResponse.json({ error: "Failed to record transaction" }, { status: 500 });
  }
}
