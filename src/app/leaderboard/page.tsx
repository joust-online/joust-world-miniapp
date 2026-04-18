"use client";

import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/tab-navigation";
import { VerificationBadge } from "@/components/verification-badge";
import { shortenAddress } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function LeaderboardPage() {
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

      <Tabs defaultValue="arbiters" className="flex flex-col">
        <TabsList className="mb-4 w-full rounded-xl">
          <TabsTrigger value="arbiters" className="flex-1 rounded-lg">
            Top Arbiters
          </TabsTrigger>
          <TabsTrigger value="jousters" className="flex-1 rounded-lg">
            Top Predictors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="arbiters">
          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">Loading...</div>
          ) : (
            <div className="space-y-2">
              {data?.topArbiters?.map((item: any, i: number) => (
                <Card key={item.arbiterId} className="rounded-xl py-0 shadow-none overflow-visible">
                  <CardContent className="flex items-center gap-3 p-3">
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
                    <span className="text-accent text-sm font-semibold">{item.score}</span>
                  </CardContent>
                </Card>
              ))}
              {(!data?.topArbiters || data.topArbiters.length === 0) && (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No arbiter scores yet
                </p>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="jousters">
          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">Loading...</div>
          ) : (
            <div className="space-y-2">
              {data?.topJousters?.map((item: any, i: number) => (
                <Card key={item.id} className="rounded-xl py-0 shadow-none overflow-visible">
                  <CardContent className="flex items-center gap-3 p-3">
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
                  </CardContent>
                </Card>
              ))}
              {(!data?.topJousters || data.topJousters.length === 0) && (
                <p className="text-muted-foreground py-6 text-center text-sm">No predictors yet</p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <TabNavigation />
    </main>
  );
}
