import {
  createAgentBookVerifier,
  createAgentkitHooks,
  declareAgentkitExtension,
  agentkitResourceServerExtension,
  parseAgentkitHeader,
  validateAgentkitMessage,
  verifyAgentkitSignature,
  InMemoryAgentKitStorage,
  type AgentKitStorage,
  type AgentkitMode,
} from "@worldcoin/agentkit";
import prisma from "@/lib/prisma";

// ── Prisma-backed AgentKit Storage ──

class PrismaAgentKitStorage implements AgentKitStorage {
  async tryIncrementUsage(endpoint: string, humanId: string, limit: number): Promise<boolean> {
    // Atomic check-and-increment using a transaction
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.agentKitUsage.findUnique({
        where: { endpoint_humanId: { endpoint, humanId } },
      });

      const currentCount = existing?.count ?? 0;
      if (currentCount >= limit) return false;

      await tx.agentKitUsage.upsert({
        where: { endpoint_humanId: { endpoint, humanId } },
        create: { endpoint, humanId, count: 1 },
        update: { count: { increment: 1 } },
      });

      return true;
    });

    return result;
  }

  async hasUsedNonce(nonce: string): Promise<boolean> {
    const existing = await prisma.agentKitNonce.findUnique({
      where: { nonce },
    });
    return !!existing;
  }

  async recordNonce(nonce: string): Promise<void> {
    await prisma.agentKitNonce.create({
      data: { nonce },
    }).catch(() => {
      // Ignore duplicate nonce errors
    });
  }
}

// ── AgentBook Verifier ──
// Pinned to World Chain — resolves agent wallet addresses to anonymous human IDs

// Default: World Chain AgentBook deployment at 0xA23aB2712eA7BBa896930544C7d6636a96b944dA
export const agentBook = createAgentBookVerifier();

// ── Storage ──

export const agentKitStorage = new PrismaAgentKitStorage();

// ── Mode ──

const AGENTKIT_MODE: AgentkitMode = { type: "free-trial", uses: 3 };

// ── Hooks ──
// These validate incoming requests against AgentBook registration

export const agentKitHooks = createAgentkitHooks({
  agentBook,
  storage: agentKitStorage,
  mode: AGENTKIT_MODE,
  onEvent: (event) => {
    console.log("[AgentKit]", event.type, event);
  },
});

// ── Extension Declaration ──
// Returned in 402 responses so agents know how to authenticate

export const settlementExtension = declareAgentkitExtension({
  statement: "Verify your agent is backed by a real human to trigger AI settlement",
  mode: AGENTKIT_MODE,
});

// ── Resource Server Extension ──
// Re-export for use in x402 resource server setup

export { agentkitResourceServerExtension };

// ── Helper: Verify Agent Request in Next.js ──

export async function verifyAgentRequest(
  req: Request,
  path: string,
): Promise<{ granted: boolean; error?: string }> {
  try {
    const result = await agentKitHooks.requestHook({
      adapter: {
        getHeader: (name: string) => req.headers.get(name) ?? undefined,
        getUrl: () => req.url,
      },
      path,
    });

    // If result has grantAccess: true, the agent is verified and within free-trial
    if (result && typeof result === "object" && "grantAccess" in result) {
      return { granted: true };
    }

    // No result means the hook didn't grant access (agent not registered or exhausted trials)
    return { granted: false, error: "Agent not verified or free trial exhausted" };
  } catch (err) {
    return { granted: false, error: err instanceof Error ? err.message : "Verification failed" };
  }
}

// ── Helper: Look up if address is registered in AgentBook ──

export async function isAgentBookVerified(address: string): Promise<{
  verified: boolean;
  humanId: string | null;
}> {
  try {
    const humanId = await agentBook.lookupHuman(address, "eip155:480");
    return { verified: !!humanId, humanId };
  } catch {
    return { verified: false, humanId: null };
  }
}

// ── Low-level helpers (re-exported for maximum API surface coverage) ──

export {
  parseAgentkitHeader,
  validateAgentkitMessage,
  verifyAgentkitSignature,
  InMemoryAgentKitStorage,
};
