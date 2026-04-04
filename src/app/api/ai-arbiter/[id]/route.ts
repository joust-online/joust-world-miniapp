import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAgentBookVerified } from "@/lib/agentkit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const arbiterId = parseInt(id);
  if (isNaN(arbiterId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const arbiter = await prisma.aiArbiter.findUnique({
    where: { id: arbiterId },
    include: {
      creator: { select: { id: true, username: true, worldIdLevel: true, pfp: true } },
      pools: {
        where: { contractId: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          title: true,
          state: true,
          totalAmountJousted: true,
          collateral: true,
          endTime: true,
          settledAt: true,
          winningJoustType: true,
          _count: { select: { jousts: true } },
          options: { orderBy: { orderIndex: "asc" }, select: { joustType: true, label: true } },
        },
      },
    },
  });

  if (!arbiter) {
    return NextResponse.json({ error: "AI Arbiter not found" }, { status: 404 });
  }

  // Check AgentBook verification
  const { verified: agentBookVerified, humanId } = await isAgentBookVerified(arbiter.walletAddress);

  // Calculate stats
  const settledPools = arbiter.pools.filter((p) => p.state === "SETTLED");
  const totalPools = arbiter.pools.length;

  // Get honor score across all pools arbitrated by this AI
  const honorVotes = await prisma.honorVote.findMany({
    where: { poolId: { in: arbiter.pools.map((p) => p.id) } },
  });

  const upvotes = honorVotes.filter((v) => v.voteType === "UPVOTE").length;
  const downvotes = honorVotes.filter((v) => v.voteType === "DOWNVOTE").length;

  return NextResponse.json({
    arbiter,
    agentBookVerified,
    humanId,
    stats: {
      totalPools,
      settledPools: settledPools.length,
      upvotes,
      downvotes,
      honorScore: upvotes - downvotes,
    },
  });
}
