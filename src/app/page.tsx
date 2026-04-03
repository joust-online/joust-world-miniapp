"use client";

import { useSession } from "@/hooks/use-profile";
import { usePools } from "@/hooks/use-pool";
import { useMyJousts } from "@/hooks/use-joust";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";
import { NotificationBell } from "@/components/notification-bell";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  const { data: activePools } = usePools("ACTIVE");
  const { data: myJousts } = useMyJousts(session?.user?.userId);

  return (
    <main className="pb-20 px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Joust</h1>
        <div className="flex items-center gap-1">
          <NotificationBell />
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Active Pools
        </h2>
        {activePools?.pools?.length ? (
          <div className="space-y-3">
            {activePools.pools.slice(0, 5).map((pool: any) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            No active pools yet. Create one!
          </p>
        )}
      </section>

      {myJousts?.jousts?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Your Recent Predictions
          </h2>
          <div className="space-y-2">
            {myJousts.jousts.slice(0, 5).map((joust: any) => {
              const pool = joust.pool;
              const option = pool?.options?.find(
                (o: any) => o.joustType === joust.joustType
              );
              const isSettled = pool?.state === "SETTLED";
              const isWin =
                isSettled && pool?.winningJoustType === joust.joustType;
              const isLoss =
                isSettled && pool?.winningJoustType !== joust.joustType;

              return (
                <Link
                  key={joust.id}
                  href={`/pool/${pool?.id}`}
                  className="block"
                >
                  <div className="bg-card rounded-xl border border-border p-3 hover:border-accent/30 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium truncate flex-1 mr-2">
                        {pool?.title ?? "Unknown pool"}
                      </span>
                      {isWin && (
                        <span className="text-xs font-medium text-green-400">
                          Won
                        </span>
                      )}
                      {isLoss && (
                        <span className="text-xs font-medium text-red-400">
                          Lost
                        </span>
                      )}
                      {!isSettled && (
                        <span className="text-xs font-medium text-yellow-400">
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="bg-muted rounded-full px-2 py-0.5">
                        {option?.label ?? `Option ${joust.joustType}`}
                      </span>
                      <span>{joust.amount} staked</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <TabNavigation />
    </main>
  );
}
