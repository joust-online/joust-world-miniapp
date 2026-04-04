import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { requireWorldId } from "@/lib/world-id";
import { getAgentAddress } from "@/lib/agent-wallet";
import { isAgentBookVerified } from "@/lib/agentkit";

export async function GET() {
  const arbiters = await prisma.aiArbiter.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      creator: { select: { id: true, username: true, worldIdLevel: true } },
      _count: { select: { pools: true } },
    },
  });

  // Check AgentBook verification for the agent wallet
  const agentAddress = getAgentAddress();
  const { verified: agentBookVerified, humanId } = await isAgentBookVerified(agentAddress);

  return NextResponse.json({
    arbiters,
    agentWallet: {
      address: agentAddress,
      agentBookVerified,
      humanId,
    },
  });
}

const createArbiterSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  category: z.enum(["crypto", "sports", "politics", "entertainment", "general"]),
  strategy: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const wid = requireWorldId(session.worldIdVerified ?? false, session.worldIdLevel ?? null, "orb");
    if (!wid.allowed) {
      return NextResponse.json({ error: wid.reason }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createArbiterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const walletAddress = getAgentAddress();

    const arbiter = await prisma.aiArbiter.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        strategy: data.strategy,
        walletAddress,
        creatorId: session.userId,
      },
      include: {
        creator: { select: { id: true, username: true, worldIdLevel: true } },
      },
    });

    return NextResponse.json({ arbiter }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create AI arbiter error:", error);
    return NextResponse.json({ error: "Failed to create AI arbiter" }, { status: 500 });
  }
}
