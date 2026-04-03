import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession, getSession } from "@/lib/session";
import { requireWorldId, JOUST_LIMITS } from "@/lib/world-id";
import { notifyUser } from "@/lib/notifications";

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
    const check = requireWorldId(session.worldIdVerified, session.worldIdLevel, "device");
    if (!check.allowed) {
      return NextResponse.json({ error: check.reason }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createJoustSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const amount = BigInt(data.amount);

    // Device-level users limited to 1 USDC per joust
    if (session.worldIdLevel !== "orb") {
      const limit = JOUST_LIMITS.device.maxAmount;
      if (amount > limit) {
        return NextResponse.json(
          { error: "Device-verified users limited to 1 USDC per joust. Verify with Orb for unlimited." },
          { status: 403 }
        );
      }
    }

    // Verify pool exists and is active
    const pool = await prisma.pool.findUnique({ where: { id: data.poolId } });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }
    if (pool.state !== "ACTIVE") {
      return NextResponse.json({ error: "Pool is not active" }, { status: 400 });
    }

    const joust = await prisma.joust.create({
      data: {
        userId: session.userId,
        poolId: data.poolId,
        joustType: data.joustType,
        amount,
        txHash: data.txHash,
      },
    });

    // Update pool total
    await prisma.pool.update({
      where: { id: data.poolId },
      data: { totalAmountJousted: { increment: amount } },
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
    console.error("Create joust error:", error);
    return NextResponse.json({ error: "Failed to create joust" }, { status: 500 });
  }
}
