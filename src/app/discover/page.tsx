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
    <main className="px-4 pt-4 pb-20">
      <h1 className="mb-4 text-xl font-bold">Discover</h1>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f.key ? "bg-accent text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-muted-foreground py-8 text-center">Loading...</div>
      ) : data?.pools?.length ? (
        <div className="space-y-3">
          {data.pools.map((pool: any) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground py-8 text-center">No pools found</div>
      )}

      <TabNavigation />
    </main>
  );
}
