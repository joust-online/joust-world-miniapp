"use client";

import { useState } from "react";
import { usePools } from "@/hooks/use-pool";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

      <Tabs value={filter} onValueChange={setFilter} className="mb-4">
        <TabsList className="w-full">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.key} value={f.key} className="flex-1">
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
