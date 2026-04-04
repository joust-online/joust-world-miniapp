import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { agentAcceptArbiter } from "@/lib/agent-wallet";
import { getAgentAddress } from "@/lib/agent-wallet";
import { notifyUser } from "@/lib/notifications";

export async function POST() {
  const agentAddress = getAgentAddress();

  // Find all pools assigned to the AI agent wallet that are pending arbiter acceptance
  const pendingPools = await prisma.pool.findMany({
    where: {
      arbiterAddress: agentAddress,
      state: "PENDING_ARBITER",
      contractId: { not: null },
    },
    include: {
      creator: { select: { id: true, address: true } },
    },
  });

  const results: { poolId: string; status: string; error?: string }[] = [];

  for (const pool of pendingPools) {
    try {
      const contractId = BigInt(pool.contractId!.toString());
      const txHash = await agentAcceptArbiter(contractId);

      await prisma.pool.update({
        where: { id: pool.id },
        data: {
          arbiterAccepted: true,
          state: "ACTIVE",
        },
      });

      // Notify creator
      if (pool.creator) {
        await notifyUser(
          prisma,
          pool.creator.id,
          "ARBITER_ACCEPTED",
          "AI Arbiter Accepted",
          `The AI arbiter has accepted your pool "${pool.title}".`,
          pool.id,
          pool.creator.address,
          `/pool/${pool.id}`,
        );
      }

      results.push({ poolId: pool.id, status: "accepted" });
    } catch (error) {
      console.error(`Auto-accept failed for pool ${pool.id}:`, error);
      results.push({
        poolId: pool.id,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({
    processed: results.length,
    results,
  });
}
