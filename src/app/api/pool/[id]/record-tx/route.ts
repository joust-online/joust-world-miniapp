import { NextRequest, NextResponse } from "next/server";
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

/** Notify all unique jousters in a pool. */
async function notifyAllJousters(
  poolId: string,
  type: string,
  title: string,
  body: string,
): Promise<void> {
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

    const { txHash, action, winningJoustType } = parsed.data;

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
        // Server extracts contractId from PoolCreated/PoolCreationPending event
        const event = requireEvent(decodedLogs, "PoolCreated", "PoolCreationPending");
        const contractId = BigInt(event.args.id as bigint);

        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            contractId,
            deployedAt: new Date(),
            contractEndTime: Math.floor(pool.endTime.getTime() / 1000),
          },
        });
        break;
      }

      case "accept-arbiter": {
        // Verify PoolCreated event matches this pool's contractId
        const matchingEvent = decodedLogs.find(
          (e) =>
            e.eventName === "PoolCreated" &&
            BigInt(e.args.id as bigint) === pool.contractId,
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
            state: "ACTIVE",
            ...(arbiterUser ? { arbiterId: arbiterUser.id } : {}),
          },
        });

        const creator = await prisma.user.findUnique({ where: { id: pool.creatorId } });
        if (creator) {
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
        }
        break;
      }

      case "close": {
        const matchingEvent = decodedLogs.find(
          (e) =>
            e.eventName === "PoolClosed" &&
            BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "CLOSED", closedAt: new Date() },
        });
        break;
      }

      case "settle": {
        if (winningJoustType === undefined) {
          return NextResponse.json(
            { error: "winningJoustType required for settle" },
            { status: 400 },
          );
        }

        const matchingEvent = decodedLogs.find(
          (e) =>
            e.eventName === "PoolSettled" &&
            BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "SETTLED", winningJoustType, settledAt: new Date() },
        });
        await prisma.joust.updateMany({
          where: { poolId: id, joustType: winningJoustType },
          data: { isWinner: true },
        });
        await notifyAllJousters(
          id,
          "POOL_SETTLED",
          "Pool Settled",
          `The pool "${pool.title}" has been settled.`,
        );
        break;
      }

      case "refund": {
        const matchingEvent = decodedLogs.find(
          (e) =>
            e.eventName === "PoolRefunded" &&
            BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!matchingEvent) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "REFUNDED", refundedAt: new Date() },
        });
        await notifyAllJousters(
          id,
          "POOL_REFUNDED",
          "Pool Refunded",
          `The pool "${pool.title}" has been refunded.`,
        );
        break;
      }
    }

    return NextResponse.json({ pool: updatedPool });
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
