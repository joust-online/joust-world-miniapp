import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { getDeviceJoustLimit } from "@/lib/world-id";
import { notifyUser } from "@/lib/notifications";
import { getVerifiedReceipt, decodeContractLogs, TxVerificationError } from "@/lib/tx-verify";

const createJoustSchema = z.object({
  poolId: z.string().uuid(),
  joustType: z.number().int().min(1),
  amount: z.string(), // BigInt as string
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const poolId = searchParams.get("poolId");
  const userId = searchParams.get("userId");

  const where: Record<string, unknown> = {};
  if (poolId) where.poolId = poolId;
  if (userId) where.userId = parseInt(userId);

  const jousts = await prisma.joust.findMany({
    where,
    include: {
      user: { select: { id: true, username: true, address: true } },
      pool: { select: { id: true, title: true, collateral: true, state: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ jousts });
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();

    const body = await req.json();
    const parsed = createJoustSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Verify pool exists and is active
    const pool = await prisma.pool.findUnique({
      where: { id: data.poolId },
      include: { options: true },
    });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }
    if (pool.state !== "ACTIVE") {
      return NextResponse.json({ error: "Pool is not active" }, { status: 400 });
    }

    // W6: Validate joustType against pool options
    const validJoustTypes = pool.options.map((o) => o.joustType);
    if (!validJoustTypes.includes(data.joustType)) {
      return NextResponse.json({ error: "Invalid joust type for this pool" }, { status: 400 });
    }

    // C6: Verify the tx on-chain and extract amount from NewJoust event
    const receipt = await getVerifiedReceipt(data.txHash as `0x${string}`);
    const decodedLogs = decodeContractLogs(receipt.logs);

    const joustEvent = decodedLogs.find(
      (e) =>
        e.eventName === "NewJoust" &&
        BigInt(e.args.poolId as bigint) === pool.contractId &&
        (e.args.player as string).toLowerCase() === session.address.toLowerCase(),
    );
    if (!joustEvent) {
      return NextResponse.json(
        { error: "No matching NewJoust event found in transaction" },
        { status: 400 },
      );
    }

    // W7: Use on-chain amount as source of truth
    const verifiedAmount = BigInt(joustEvent.args.amount as bigint);

    // Device-level users have per-collateral limits
    if (session.worldIdLevel !== "orb") {
      const limit = getDeviceJoustLimit(pool.collateral);
      if (limit && verifiedAmount > limit) {
        return NextResponse.json(
          { error: "Device-verified users have limited stakes. Verify with Orb for unlimited." },
          { status: 403 },
        );
      }
    }

    const joust = await prisma.joust.create({
      data: {
        userId: session.userId,
        poolId: data.poolId,
        joustType: data.joustType,
        amount: verifiedAmount,
        txHash: data.txHash,
      },
    });

    // Update pool total with verified on-chain amount
    await prisma.pool.update({
      where: { id: data.poolId },
      data: { totalAmountJousted: { increment: verifiedAmount } },
    });

    // Notify the pool's arbiter about the new joust
    if (pool.arbiterId) {
      const arbiterUser = await prisma.user.findUnique({
        where: { id: pool.arbiterId },
      });
      if (arbiterUser) {
        await notifyUser(
          prisma,
          arbiterUser.id,
          "JOUST_CREATED",
          "New Joust Placed",
          `A new joust has been placed in "${pool.title}".`,
          pool.id,
          arbiterUser.address,
          `/pool/${pool.id}`,
        );
      }
    }

    return NextResponse.json({ joust }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof TxVerificationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Create joust error:", error);
    return NextResponse.json({ error: "Failed to create joust" }, { status: 500 });
  }
}
