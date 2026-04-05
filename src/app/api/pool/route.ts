import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession, getSession } from "@/lib/session";
import { requireWorldId } from "@/lib/world-id";
import { PoolState } from "@/generated/prisma";

const createPoolSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  arbiterAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  arbiterFee: z.number().int().min(0).max(200),
  collateral: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  minJoustAmount: z.string(), // BigInt as string
  endTime: z.string().datetime(),
  options: z
    .array(
      z.object({
        label: z.string().min(1).max(400),
        joustType: z.number().int().min(1),
        orderIndex: z.number().int().min(0),
      }),
    )
    .min(2),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const mine = searchParams.get("mine");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);
  const cursor = searchParams.get("cursor");

  const where: Record<string, unknown> = {};
  if (state) where.state = state;

  // Filter for user's own pools (created or arbitrating)
  if (mine === "true") {
    const session = await getSession();
    if (session.userId) {
      where.OR = [{ creatorId: session.userId }, { arbiterId: session.userId }];
    }
  }

  // Always exclude pools that were never deployed on-chain
  where.contractId = { not: null };

  const pools = await prisma.pool.findMany({
    where,
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "desc" },
    include: {
      creator: { select: { id: true, username: true, address: true, worldIdLevel: true } },
      arbiter: { select: { id: true, username: true, address: true, worldIdLevel: true } },
      options: { orderBy: { orderIndex: "asc" } },
      _count: { select: { jousts: true } },
    },
  });

  // Filter out expired empty pools (no jousts, not settled/refunded)
  const now = new Date();
  const filtered = pools.filter((pool) => {
    const expired = pool.endTime < now;
    const terminal = pool.state === PoolState.SETTLED || pool.state === PoolState.REFUNDED;
    if (expired && pool._count.jousts === 0 && !terminal) return false;
    return true;
  });

  return NextResponse.json({
    pools: filtered,
    nextCursor: pools.length === limit ? pools[pools.length - 1]?.id : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();

    // #6: Pool creation requires Orb-level verification
    const worldIdCheck = requireWorldId(session.worldIdVerified, session.worldIdLevel, "orb");
    if (!worldIdCheck.allowed) {
      return NextResponse.json({ error: worldIdCheck.reason }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createPoolSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const isSelfArbiter = data.arbiterAddress.toLowerCase() === session.address.toLowerCase();

    const pool = await prisma.pool.create({
      data: {
        title: data.title,
        description: data.description,
        creatorId: session.userId,
        arbiterAddress: data.arbiterAddress.toLowerCase(),
        arbiterAccepted: isSelfArbiter,
        arbiterFee: data.arbiterFee,
        collateral: data.collateral.toLowerCase(),
        minJoustAmount: BigInt(data.minJoustAmount),
        supportedJoustTypes: data.options.length,
        state: isSelfArbiter ? PoolState.ACTIVE : PoolState.PENDING_ARBITER,
        endTime: new Date(data.endTime),
        options: {
          create: data.options.map((opt) => ({
            joustType: opt.joustType,
            label: opt.label,
            orderIndex: opt.orderIndex,
          })),
        },
      },
      include: { options: true },
    });

    return NextResponse.json({ pool }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create pool error:", error);
    return NextResponse.json({ error: "Failed to create pool" }, { status: 500 });
  }
}
