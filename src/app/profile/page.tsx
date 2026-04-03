"use client";

import { useProfile, useSession } from "@/hooks/use-profile";
import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";
import { AuthButton } from "@/components/auth-button";
import { shortenAddress } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useProfile();
  const { data: myPoolsData } = useQuery({
    queryKey: ["pools", "my"],
    queryFn: async () => {
      const res = await fetch("/api/pool?mine=true");
      if (!res.ok) throw new Error("Failed to fetch pools");
      return res.json();
    },
    enabled: !!session?.authenticated,
  });

  if (!session?.authenticated) {
    return (
      <main className="pb-20 px-4 pt-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Sign in to view your profile</p>
          <AuthButton large />
        </div>
        <TabNavigation />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="pb-20 px-4 pt-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
        <TabNavigation />
      </main>
    );
  }

  const user = profileData?.user;

  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      {user && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-2xl">
              {user.pfp ? (
                <img src={user.pfp} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                "👤"
              )}
            </div>
            <h2 className="font-semibold">{user.username}</h2>
            <p className="text-xs text-muted-foreground">{shortenAddress(user.address)}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {user.worldIdVerified && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  user.worldIdLevel === "orb"
                    ? "bg-accent/20 text-accent"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                  {user.worldIdLevel === "orb" ? "🔮 Orb Verified" : "📱 Device Verified"}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.jousts ?? 0}</div>
              <div className="text-xs text-muted-foreground">Predictions</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold text-green-400">{user.winCount ?? 0}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.createdPools ?? 0}</div>
              <div className="text-xs text-muted-foreground">Pools</div>
            </div>
          </div>

          {user.honorScore && (
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-sm mb-2">Arbiter Honor</h3>
              <div className="flex items-center gap-4">
                <span className="text-green-400">+{user.honorScore.totalUpvotes}</span>
                <span className="text-destructive">-{user.honorScore.totalDownvotes}</span>
                <span className="text-sm text-muted-foreground">
                  Score: {user.honorScore.score.toFixed(1)}
                </span>
              </div>
            </div>
          )}

          <div className="bg-card rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Points</div>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
          </div>

          {myPoolsData?.pools?.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2">Your Pools</h3>
              <div className="space-y-3">
                {myPoolsData.pools.map((pool: any) => (
                  <PoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
