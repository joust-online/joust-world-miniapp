"use client";

import Link from "next/link";
import { formatAmount } from "@/lib/utils";
import { getCollateralInfo } from "@/lib/contracts";
import { formatDistanceToNow } from "date-fns";

interface PoolCardProps {
  pool: {
    id: string;
    title: string;
    state: string;
    collateral: string;
    totalAmountJousted: bigint | string;
    endTime: string;
    options: { label: string; joustType: number }[];
    creator: { username: string; worldIdLevel?: string };
    _count: { jousts: number };
  };
}

function stateLabel(state: string) {
  const map: Record<string, { text: string; color: string }> = {
    ACTIVE: { text: "Active", color: "text-green-400" },
    PENDING_ARBITER: { text: "Pending", color: "text-yellow-400" },
    CLOSED: { text: "Closed", color: "text-orange-400" },
    SETTLED: { text: "Settled", color: "text-blue-400" },
    REFUNDED: { text: "Refunded", color: "text-muted-foreground" },
  };
  return map[state] ?? { text: state, color: "text-muted-foreground" };
}

export function PoolCard({ pool }: PoolCardProps) {
  const collateral = getCollateralInfo(pool.collateral);
  const total = typeof pool.totalAmountJousted === "string"
    ? BigInt(pool.totalAmountJousted)
    : pool.totalAmountJousted;
  const state = stateLabel(pool.state);
  const timeLeft = formatDistanceToNow(new Date(pool.endTime), { addSuffix: true });

  return (
    <Link href={`/pool/${pool.id}`} className="block">
      <div className="bg-card rounded-xl border border-border p-4 hover:border-accent/30 transition-colors">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm leading-tight flex-1 mr-2">{pool.title}</h3>
          <span className={`text-xs font-medium ${state.color}`}>{state.text}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pool.options.map((opt) => (
            <span key={opt.joustType} className="text-xs bg-muted rounded-full px-2 py-0.5">
              {opt.label}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatAmount(total, collateral.decimals)} {collateral.symbol} pooled</span>
          <span>{pool._count.jousts} predictions</span>
          <span>{timeLeft}</span>
        </div>
      </div>
    </Link>
  );
}
