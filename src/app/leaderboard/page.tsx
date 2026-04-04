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
    <main className="px-4 pt-4 pb-20">
      <h1 className="mb-4 text-xl font-bold">Leaderboard</h1>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("arbiters")}
          className={`flex-1 rounded-xl py-2 text-sm font-medium ${
            tab === "arbiters" ? "bg-accent text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Top Arbiters
        </button>
        <button
          onClick={() => setTab("jousters")}
          className={`flex-1 rounded-xl py-2 text-sm font-medium ${
            tab === "jousters" ? "bg-accent text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Top Predictors
        </button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground py-8 text-center">Loading...</div>
      ) : tab === "arbiters" ? (
        <div className="space-y-2">
          {data?.topArbiters?.map((item: any, i: number) => (
            <div
              key={item.arbiterId}
              className="bg-card border-border flex items-center gap-3 rounded-xl border p-3"
            >
              <span className="text-muted-foreground w-6 text-center text-lg font-bold">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium">
                    {item.arbiter?.username ?? shortenAddress(item.arbiter?.address ?? "")}
                  </span>
                  <VerificationBadge level={item.arbiter?.worldIdLevel} />
                </div>
                <div className="text-muted-foreground mt-0.5 flex gap-3 text-xs">
                  <span className="text-green-400">+{item.totalUpvotes}</span>
                  <span className="text-red-400">-{item.totalDownvotes}</span>
                </div>
              </div>
              <span className="text-accent text-sm font-semibold">{item.score.toFixed(1)}</span>
            </div>
          ))}
          {(!data?.topArbiters || data.topArbiters.length === 0) && (
            <p className="text-muted-foreground py-6 text-center text-sm">No arbiter scores yet</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.topJousters?.map((item: any, i: number) => (
            <div
              key={item.id}
              className="bg-card border-border flex items-center gap-3 rounded-xl border p-3"
            >
              <span className="text-muted-foreground w-6 text-center text-lg font-bold">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium">
                    {item.username ?? shortenAddress(item.address)}
                  </span>
                  <VerificationBadge level={item.worldIdLevel} />
                </div>
                <span className="text-muted-foreground text-xs">
                  {item._count?.jousts ?? 0} predictions
                </span>
              </div>
              <span className="text-sm font-semibold">{item.totalPoints} pts</span>
            </div>
          ))}
          {(!data?.topJousters || data.topJousters.length === 0) && (
            <p className="text-muted-foreground py-6 text-center text-sm">No predictors yet</p>
          )}
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
