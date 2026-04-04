import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { requireWorldId } from "@/lib/world-id";

const honorVoteSchema = z.object({
  arbiterId: z.number().int(),
  poolId: z.string().uuid(),
  voteType: z.enum(["UPVOTE", "DOWNVOTE"]),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const arbiterId = searchParams.get("arbiterId");

  if (!arbiterId) {
    return NextResponse.json({ error: "arbiterId required" }, { status: 400 });
  }

  const honorScore = await prisma.honorScore.findUnique({
    where: { arbiterId: parseInt(arbiterId) },
  });

  const votes = await prisma.honorVote.findMany({
    where: { arbiterId: parseInt(arbiterId) },
    include: {
      voter: { select: { id: true, username: true } },
      pool: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ honorScore, votes });
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const check = requireWorldId(session.worldIdVerified, session.worldIdLevel, "orb");
    if (!check.allowed) {
      return NextResponse.json({ error: check.reason }, { status: 403 });
    }

    const body = await req.json();
    const parsed = honorVoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { arbiterId, poolId, voteType } = parsed.data;

    // Can't vote for yourself
    if (arbiterId === session.userId) {
      return NextResponse.json({ error: "Cannot vote for yourself" }, { status: 400 });
    }

    // Check pool is settled
    const pool = await prisma.pool.findUnique({ where: { id: poolId } });
    if (!pool || pool.state !== "SETTLED") {
      return NextResponse.json({ error: "Pool must be settled to vote" }, { status: 400 });
    }

    // 1 person = 1 vote per pool per arbiter (enforced by unique constraint)
    const vote = await prisma.honorVote.create({
      data: {
        voterId: session.userId,
        arbiterId,
        poolId,
        voteType,
      },
    });

    // Update honor score
    await prisma.honorScore.upsert({
      where: { arbiterId },
      create: {
        arbiterId,
        totalUpvotes: voteType === "UPVOTE" ? 1 : 0,
        totalDownvotes: voteType === "DOWNVOTE" ? 1 : 0,
        score: voteType === "UPVOTE" ? 1 : -1,
      },
      update: {
        totalUpvotes: voteType === "UPVOTE" ? { increment: 1 } : undefined,
        totalDownvotes: voteType === "DOWNVOTE" ? { increment: 1 } : undefined,
        score: { increment: voteType === "UPVOTE" ? 1 : -1 },
      },
    });

    return NextResponse.json({ vote }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Unique constraint violation = already voted
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "Already voted on this pool" }, { status: 409 });
    }
    console.error("Honor vote error:", error);
    return NextResponse.json({ error: "Failed to record vote" }, { status: 500 });
  }
}
