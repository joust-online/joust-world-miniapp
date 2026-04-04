import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { publicClient } from "@/lib/viem-server";
import { notifyUser } from "@/lib/notifications";

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
  contractId: z.number().optional(),
  winningJoustType: z.number().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const body = await req.json();
    const parsed = recordTxSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { txHash, action, contractId, winningJoustType } = parsed.data;

    // Verify tx exists on-chain
    const receipt = await publicClient.getTransactionReceipt({ hash: txHash as `0x${string}` });
    if (!receipt || receipt.status !== "success") {
      return NextResponse.json({ error: "Transaction not found or failed" }, { status: 400 });
    }

    const pool = await prisma.pool.findUnique({ where: { id } });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    let updatedPool;
    switch (action) {
      case "deploy":
        if (contractId === undefined) {
          return NextResponse.json({ error: "contractId required for deploy" }, { status: 400 });
        }
        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            contractId: BigInt(contractId),
            deployedAt: new Date(),
            contractEndTime: Math.floor(pool.endTime.getTime() / 1000),
          },
        });
        break;

      case "accept-arbiter": {
        // Link arbiter user if exists
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

        // Notify pool creator that arbiter accepted
        const creator = await prisma.user.findUnique({
          where: { id: pool.creatorId },
        });
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

      case "close":
        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "CLOSED", closedAt: new Date() },
        });
        break;

      case "settle":
        if (winningJoustType === undefined) {
          return NextResponse.json({ error: "winningJoustType required for settle" }, { status: 400 });
        }
        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            state: "SETTLED",
            winningJoustType,
            settledAt: new Date(),
          },
        });
        // Mark winning jousts
        await prisma.joust.updateMany({
          where: { poolId: id, joustType: winningJoustType },
          data: { isWinner: true },
        });

        await notifyAllJousters(id, "POOL_SETTLED", "Pool Settled", `The pool "${pool.title}" has been settled.`);
        break;

      case "refund":
        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "REFUNDED", refundedAt: new Date() },
        });

        await notifyAllJousters(id, "POOL_REFUNDED", "Pool Refunded", `The pool "${pool.title}" has been refunded.`);
        break;
    }

    return NextResponse.json({ pool: updatedPool });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Record tx error:", error);
    return NextResponse.json({ error: "Failed to record transaction" }, { status: 500 });
  }
}
