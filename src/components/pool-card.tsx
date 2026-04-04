"use client";

import Link from "next/link";
import { formatAmount } from "@/lib/utils";
import { getCollateralInfo } from "@/lib/contracts";
import { VerificationBadge } from "@/components/verification-badge";
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
  const total =
    typeof pool.totalAmountJousted === "string"
      ? BigInt(pool.totalAmountJousted)
      : pool.totalAmountJousted;
  const state = getDisplayState(pool.state, pool.endTime, pool._count.jousts);
  const expired = new Date(pool.endTime) < new Date();
  const timeDistance = formatDistanceToNow(new Date(pool.endTime), { addSuffix: true });
  const timeLabel = expired ? `Ended ${timeDistance}` : `Ends ${timeDistance}`;

  return (
    <Link href={`/pool/${pool.id}`} className="block">
      <div className="bg-card border-border hover:border-accent/30 rounded-xl border p-4 transition-colors">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="mr-2 flex-1 text-sm leading-tight font-semibold">{pool.title}</h3>
          <span className={`text-xs font-medium ${state.color}`}>{state.text}</span>
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {pool.options.map((opt) => (
            <span key={opt.joustType} className="bg-muted rounded-full px-2 py-0.5 text-xs">
              {opt.label}
            </span>
          ))}
        </div>
        <div className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs">
          <span>by {pool.creator.username}</span>
          <VerificationBadge level={pool.creator.worldIdLevel} />
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>
            {formatAmount(total, collateral.decimals)} {collateral.symbol} pooled
          </span>
          <span>{pool._count.jousts} predictions</span>
          <span>{timeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
