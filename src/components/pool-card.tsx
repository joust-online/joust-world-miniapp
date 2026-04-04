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

function getDisplayState(state: string, endTime: string, joustCount: number) {
  const expired = new Date(endTime) < new Date();

  if (state === "SETTLED") return { text: "Settled", color: "text-blue-400" };
  if (state === "REFUNDED") return { text: "Refunded", color: "text-muted-foreground" };
  if (state === "CLOSED" && !expired) return { text: "Closed", color: "text-orange-400" };
  if (expired && joustCount > 0) return { text: "Awaiting Settlement", color: "text-yellow-400" };
  if (expired) return { text: "Expired", color: "text-red-400" };
  if (state === "PENDING_ARBITER") return { text: "Pending Arbiter", color: "text-yellow-400" };
  if (state === "ACTIVE") return { text: "Active", color: "text-green-400" };
  return { text: state, color: "text-muted-foreground" };
}

export function PoolCard({ pool }: PoolCardProps) {
  const collateral = getCollateralInfo(pool.collateral);
  const total = typeof pool.totalAmountJousted === "string"
    ? BigInt(pool.totalAmountJousted)
    : pool.totalAmountJousted;
  const state = getDisplayState(pool.state, pool.endTime, pool._count.jousts);
  const expired = new Date(pool.endTime) < new Date();
  const timeLabel = expired ? `Ended ${formatDistanceToNow(new Date(pool.endTime), { addSuffix: true })}` : `Ends ${formatDistanceToNow(new Date(pool.endTime), { addSuffix: true })}`;

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
          <span>{timeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
