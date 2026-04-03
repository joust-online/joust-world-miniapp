"use client";

import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/tab-navigation";
import { VerificationBadge } from "@/components/verification-badge";
import { shortenAddress } from "@/lib/utils";
import { useState } from "react";

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"arbiters" | "jousters">("arbiters");
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("arbiters")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium ${
            tab === "arbiters" ? "bg-accent text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Top Arbiters
        </button>
        <button
          onClick={() => setTab("jousters")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium ${
            tab === "jousters" ? "bg-accent text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Top Predictors
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : tab === "arbiters" ? (
        <div className="space-y-2">
          {data?.topArbiters?.map((item: any, i: number) => (
            <div key={item.arbiterId} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3">
              <span className="text-lg font-bold text-muted-foreground w-6 text-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">
                    {item.arbiter?.username ?? shortenAddress(item.arbiter?.address ?? "")}
                  </span>
                  <VerificationBadge level={item.arbiter?.worldIdLevel} />
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="text-green-400">+{item.totalUpvotes}</span>
                  <span className="text-red-400">-{item.totalDownvotes}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-accent">{item.score.toFixed(1)}</span>
            </div>
          ))}
          {(!data?.topArbiters || data.topArbiters.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-6">No arbiter scores yet</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.topJousters?.map((item: any, i: number) => (
            <div key={item.id} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3">
              <span className="text-lg font-bold text-muted-foreground w-6 text-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">
                    {item.username ?? shortenAddress(item.address)}
                  </span>
                  <VerificationBadge level={item.worldIdLevel} />
                </div>
                <span className="text-xs text-muted-foreground">{item._count?.jousts ?? 0} predictions</span>
              </div>
              <span className="text-sm font-semibold">{item.totalPoints} pts</span>
            </div>
          ))}
          {(!data?.topJousters || data.topJousters.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-6">No predictors yet</p>
          )}
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
