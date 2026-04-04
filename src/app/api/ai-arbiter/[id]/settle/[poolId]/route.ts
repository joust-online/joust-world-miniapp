import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { agentSettlePool, agentClosePool } from "@/lib/agent-wallet";
import { determineOutcome } from "@/lib/ai-settler";
import { verifyAgentRequest, settlementExtension } from "@/lib/agentkit";
import { notifyUser } from "@/lib/notifications";

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; poolId: string }> }
) {
  const { id, poolId } = await params;
  const arbiterId = parseInt(id);

  try {
    // ── Validate AI arbiter exists ──
    const arbiter = await prisma.aiArbiter.findUnique({
      where: { id: arbiterId },
    });
    if (!arbiter) {
      return NextResponse.json({ error: "AI Arbiter not found" }, { status: 404 });
    }

    // ── Validate pool exists and belongs to this arbiter ──
    const pool = await prisma.pool.findUnique({
      where: { id: poolId },
      include: {
        options: { orderBy: { orderIndex: "asc" } },
        _count: { select: { jousts: true } },
      },
    });

    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }
    if (pool.aiArbiterId !== arbiterId) {
      return NextResponse.json({ error: "Pool not assigned to this AI arbiter" }, { status: 400 });
    }
    if (!pool.contractId) {
      return NextResponse.json({ error: "Pool not deployed on-chain" }, { status: 400 });
    }
    if (pool.state === "SETTLED" || pool.state === "REFUNDED") {
      return NextResponse.json({ error: "Pool already settled or refunded" }, { status: 400 });
    }
    if (pool._count.jousts === 0) {
      return NextResponse.json({ error: "No predictions to settle" }, { status: 400 });
    }

    // Only settle if pool is CLOSED or expired
    const expired = new Date(pool.endTime) < new Date();
    if (pool.state === "ACTIVE" && !expired) {
      return NextResponse.json({ error: "Pool is still active and not expired" }, { status: 400 });
    }

    // ── Dual auth: session (browser) OR AgentKit (agent-to-agent) ──
    const session = await getSession();
    const hasSession = !!session.userId;

    if (!hasSession) {
      // No browser session — try AgentKit x402 verification
      const path = `/api/ai-arbiter/${id}/settle/${poolId}`;
      const verification = await verifyAgentRequest(req, path);

      if (!verification.granted) {
        return NextResponse.json(
          {
            error: "Authentication required. Sign in or provide AgentKit credentials.",
            message: verification.error,
            extensions: settlementExtension,
            agentBook: {
              network: "eip155:480",
              info: "Register your agent at https://agentbook.world to get free trial access",
            },
          },
          { status: 402 },
        );
      }
    }

    // ── Close pool on-chain if still active + expired ──
    const contractId = BigInt(pool.contractId.toString());

    if (pool.state === "ACTIVE" && expired) {
      try {
        await agentClosePool(contractId);
        await prisma.pool.update({
          where: { id: poolId },
          data: { state: "CLOSED", closedAt: new Date() },
        });
      } catch (err) {
        console.error("Agent close pool error:", err);
        // Pool might already be closed on-chain, continue
      }
    }

    // ── AI determines the outcome ──
    const outcome = await determineOutcome({
      title: pool.title,
      description: pool.description,
      options: pool.options.map((o) => ({ joustType: o.joustType, label: o.label })),
      strategy: arbiter.strategy,
    });

    // ── Settle on-chain ──
    const txHash = await agentSettlePool(contractId, outcome.winningJoustType);

    // ── Update DB state ──
    await prisma.pool.update({
      where: { id: poolId },
      data: {
        state: "SETTLED",
        winningJoustType: outcome.winningJoustType,
        settledAt: new Date(),
      },
    });

    // Mark winning jousts
    await prisma.joust.updateMany({
      where: { poolId, joustType: outcome.winningJoustType },
      data: { isWinner: true },
    });

    // Notify jousters
    const winningOption = pool.options.find((o) => o.joustType === outcome.winningJoustType);
    await notifyAllJousters(
      poolId,
      "POOL_SETTLED",
      "AI Arbiter Settled Pool",
      `"${pool.title}" was settled by AI. Winner: ${winningOption?.label ?? "Unknown"}. Reason: ${outcome.reasoning}`,
    );

    return NextResponse.json({
      success: true,
      txHash,
      winningJoustType: outcome.winningJoustType,
      winningOption: winningOption?.label,
      reasoning: outcome.reasoning,
    });
  } catch (error: unknown) {
    console.error("AI settlement error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Settlement failed" },
      { status: 500 },
    );
  }
}
