"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAiArbiter } from "@/hooks/use-ai-arbiter";
import { AiArbiterBadge } from "@/components/ai-arbiter-badge";
import { VerificationBadge } from "@/components/verification-badge";
import { TabNavigation } from "@/components/tab-navigation";
import { formatAmount } from "@/lib/utils";
import { getCollateralInfo } from "@/lib/contracts";

export default function AiArbiterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAiArbiter(parseInt(id));

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-muted-foreground">Loading...</div>;
  }

  if (!data?.arbiter) {
    return <div className="text-center py-16 text-muted-foreground">AI Arbiter not found</div>;
  }

  const { arbiter, agentBookVerified, humanId, stats } = data;

  return (
    <main className="pb-20 px-4 pt-4">
      <button onClick={() => window.history.back()} className="text-sm text-muted-foreground mb-3">
        &larr; Back
      </button>

      {/* Header */}
      <div className="mb-4">
        <AiArbiterBadge name={arbiter.name} agentBookVerified={agentBookVerified} size="lg" />
        <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {arbiter.category}
        </span>
      </div>

      {/* AgentBook Verification */}
      <div className={`rounded-xl px-4 py-3 mb-4 text-sm flex items-center gap-2 ${
        agentBookVerified
          ? "bg-green-500/10 border border-green-500/30 text-green-400"
          : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
      }`}>
        {agentBookVerified ? (
          <>
            <span>✓</span>
            <div>
              <div className="font-medium">Verified in AgentBook</div>
              <div className="text-xs opacity-70 font-mono">
                Human-backed agent on World Chain
              </div>
            </div>
          </>
        ) : (
          <>
            <span>⚠</span>
            <div>
              <div className="font-medium">Not yet registered in AgentBook</div>
              <div className="text-xs opacity-70">Agent wallet needs AgentBook registration</div>
            </div>
          </>
        )}
      </div>

      {/* Description */}
      {arbiter.description && (
        <p className="text-sm text-muted-foreground mb-4">{arbiter.description}</p>
      )}

      {/* Strategy */}
      <div className="bg-card rounded-xl border border-border p-3 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Settlement Strategy</div>
        <p className="text-sm">{arbiter.strategy}</p>
      </div>

      {/* Creator */}
      <div className="bg-card rounded-xl border border-border p-3 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Created by</div>
        <div className="flex items-center gap-1.5 text-sm">
          {arbiter.creator.username}
          <VerificationBadge level={arbiter.creator.worldIdLevel} />
        </div>
      </div>

      {/* Agent Wallet */}
      <div className="bg-card rounded-xl border border-border p-3 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Agent Wallet</div>
        <div className="text-sm font-mono break-all">{arbiter.walletAddress}</div>
        {humanId && (
          <div className="text-[10px] text-muted-foreground mt-1 font-mono">
            Human ID: {humanId.slice(0, 20)}...
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-bold">{stats.totalPools}</div>
          <div className="text-[10px] text-muted-foreground">Pools</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-bold">{stats.settledPools}</div>
          <div className="text-[10px] text-muted-foreground">Settled</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-bold text-green-400">{stats.upvotes}</div>
          <div className="text-[10px] text-muted-foreground">Fair</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-bold text-red-400">{stats.downvotes}</div>
          <div className="text-[10px] text-muted-foreground">Unfair</div>
        </div>
      </div>

      {/* Pools Arbitrated */}
      {arbiter.pools?.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Pools Arbitrated</h3>
          <div className="space-y-2">
            {arbiter.pools.map((pool: any) => {
              const c = getCollateralInfo(pool.collateral);
              const winningLabel = pool.state === "SETTLED"
                ? pool.options?.find((o: any) => o.joustType === pool.winningJoustType)?.label
                : null;
              return (
                <Link key={pool.id} href={`/pool/${pool.id}`}>
                  <div className="bg-card rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium line-clamp-1">{pool.title}</span>
                      <span className={`text-xs ${
                        pool.state === "SETTLED" ? "text-blue-400" :
                        pool.state === "ACTIVE" ? "text-green-400" :
                        "text-muted-foreground"
                      }`}>
                        {pool.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatAmount(BigInt(pool.totalAmountJousted?.toString() ?? "0"), c.decimals)} {c.symbol}</span>
                      <span>{pool._count.jousts} predictions</span>
                      {winningLabel && <span className="text-green-400">Winner: {winningLabel}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
