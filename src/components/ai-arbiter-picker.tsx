"use client";

import { useAiArbiters } from "@/hooks/use-ai-arbiter";
import { AiArbiterBadge } from "./ai-arbiter-badge";

interface SelectedArbiter {
  id: number;
  walletAddress: string;
  name: string;
}

export function AiArbiterPicker({
  selected,
  onSelect,
}: {
  selected: SelectedArbiter | null;
  onSelect: (arbiter: SelectedArbiter | null) => void;
}) {
  const { data, isLoading } = useAiArbiters();

  if (isLoading) {
    return <div className="text-xs text-muted-foreground py-2">Loading AI arbiters...</div>;
  }

  const arbiters = data?.arbiters ?? [];
  const agentBookVerified = data?.agentWallet?.agentBookVerified ?? false;

  if (arbiters.length === 0) {
    return (
      <div className="text-xs text-muted-foreground py-2">
        No AI arbiters available.{" "}
        <a href="/ai-arbiters/create" className="text-accent underline">
          Create one
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {arbiters.map((arb) => (
        <button
          key={arb.id}
          type="button"
          onClick={() =>
            selected?.id === arb.id
              ? onSelect(null)
              : onSelect({ id: arb.id, walletAddress: arb.walletAddress, name: arb.name })
          }
          className={`w-full text-left p-3 rounded-xl border transition-colors ${
            selected?.id === arb.id
              ? "border-violet-500 bg-violet-500/10"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <AiArbiterBadge
              name={arb.name}
              agentBookVerified={agentBookVerified}
              size="sm"
            />
            <span className="text-[10px] text-muted-foreground">{arb.category}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {arb.description || arb.strategy.slice(0, 100)}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
            <span>by {arb.creator.username}</span>
            <span>{arb._count.pools} pools</span>
          </div>
        </button>
      ))}
    </div>
  );
}
