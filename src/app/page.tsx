"use client";

import { useSession } from "@/hooks/use-profile";
import { usePools } from "@/hooks/use-pool";
import { useMyJousts } from "@/hooks/use-joust";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";
import { VerificationBadge } from "@/components/verification-badge";
import { NotificationBell } from "@/components/notification-bell";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  const { data: activePools } = usePools("ACTIVE");
  const { data: myJousts } = useMyJousts(session?.user?.userId);

  return (
    <main className="px-4 pt-4 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Joust</h1>
        <div className="flex items-center gap-1">
          <NotificationBell />
        </div>
      </div>

      {/* World ID status banner */}
      {session?.authenticated && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
            session.user.worldIdLevel === "orb"
              ? "border border-green-500/30 bg-green-500/10"
              : session.user.worldIdLevel === "device"
                ? "border border-blue-500/30 bg-blue-500/10"
                : "border border-red-500/30 bg-red-500/10"
          }`}
        >
          <VerificationBadge level={session.user.worldIdLevel ?? null} size="md" />
          <span className="text-muted-foreground text-xs">
            {session.user.worldIdLevel === "orb"
              ? "Full access — Orb verified"
              : session.user.worldIdLevel === "device"
                ? "Verified with World ID"
                : "Not verified — verify with World ID for full access"}
          </span>
          {!session.user.worldIdVerified && (
            <Link href="/profile" className="text-accent ml-auto text-xs font-medium">
              Verify
            </Link>
          )}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
          Active Pools
        </h2>
        {activePools?.pools?.length ? (
          <div className="space-y-3">
            {activePools.pools.slice(0, 5).map((pool: any) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-6 text-center text-sm">
            No active pools yet. Create one!
          </p>
        )}
      </section>

      {myJousts?.jousts?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
            Your Recent Predictions
          </h2>
          <div className="space-y-2">
            {myJousts.jousts.slice(0, 5).map((joust: any) => {
              const pool = joust.pool;
              const option = pool?.options?.find((o: any) => o.joustType === joust.joustType);
              const isSettled = pool?.state === "SETTLED";
              const isWin = isSettled && pool?.winningJoustType === joust.joustType;

              function getJoustStatus(): { text: string; color: string } {
                if (!isSettled) return { text: "Pending", color: "text-yellow-400" };
                if (isWin) return { text: "Won", color: "text-green-400" };
                return { text: "Lost", color: "text-red-400" };
              }
              const status = getJoustStatus();

              return (
                <Link key={joust.id} href={`/pool/${pool?.id}`} className="block">
                  <div className="bg-card border-border hover:border-accent/30 rounded-xl border p-3 transition-colors">
                    <div className="mb-1 flex items-start justify-between">
                      <span className="mr-2 flex-1 truncate text-sm font-medium">
                        {pool?.title ?? "Unknown pool"}
                      </span>
                      <span className={`text-xs font-medium ${status.color}`}>{status.text}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
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
