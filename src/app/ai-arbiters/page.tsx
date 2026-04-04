"use client";

import Link from "next/link";
import { useAiArbiters } from "@/hooks/use-ai-arbiter";
import { AiArbiterBadge } from "@/components/ai-arbiter-badge";
import { TabNavigation } from "@/components/tab-navigation";
import { VerificationBadge } from "@/components/verification-badge";

export default function AiArbitersPage() {
  const { data, isLoading } = useAiArbiters();

  const arbiters = data?.arbiters ?? [];
  const agentBookVerified = data?.agentWallet?.agentBookVerified ?? false;
  const agentAddress = data?.agentWallet?.address;

  return (
    <main className="pb-20 px-4 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">AI Arbiters</h1>
        <Link
          href="/ai-arbiters/create"
          className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-sm font-medium"
        >
          + Create
        </Link>
      </div>

      {/* Agent Wallet Status */}
      <div className="bg-card rounded-xl border border-border p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Agent Wallet</div>
            <div className="text-sm font-mono">
              {agentAddress ? `${agentAddress.slice(0, 6)}...${agentAddress.slice(-4)}` : "..."}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">AgentBook</div>
            {agentBookVerified ? (
              <span className="text-xs text-green-400 font-medium">Verified ✓</span>
            ) : (
              <span className="text-xs text-yellow-400 font-medium">Not Registered</span>
            )}
          </div>
        </div>
        {data?.agentWallet?.humanId && (
          <div className="mt-2 text-[10px] text-muted-foreground font-mono break-all">
            Human ID: {data.agentWallet.humanId.slice(0, 16)}...
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : arbiters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-3">No AI arbiters yet.</p>
          <Link href="/ai-arbiters/create" className="text-accent text-sm">
            Create the first one
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {arbiters.map((arb) => (
            <Link key={arb.id} href={`/ai-arbiters/${arb.id}`}>
              <div className="bg-card rounded-xl border border-border p-4 hover:border-violet-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <AiArbiterBadge
                    name={arb.name}
                    agentBookVerified={agentBookVerified}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {arb.category}
                  </span>
                </div>
                {arb.description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {arb.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    by {arb.creator.username}
                    <VerificationBadge level={arb.creator.worldIdLevel} />
                  </span>
                  <span>{arb._count.pools} pools arbitrated</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
