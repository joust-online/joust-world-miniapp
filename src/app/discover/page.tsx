"use client";

import { useState } from "react";
import { usePools } from "@/hooks/use-pool";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";

const FILTERS = [
  { key: "ACTIVE", label: "Active" },
  { key: "SETTLED", label: "Settled" },
  { key: "REFUNDED", label: "Refunded" },
] as const;

export default function DiscoverPage() {
  const [filter, setFilter] = useState<string>("ACTIVE");
  const { data, isLoading } = usePools(filter);

  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">Discover</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? "bg-accent text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : data?.pools?.length ? (
        <div className="space-y-3">
          {data.pools.map((pool: any) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No pools found
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
