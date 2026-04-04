"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { usePool, useRecordTx } from "@/hooks/use-pool";
import { useSession } from "@/hooks/use-profile";
import { useEthPrice } from "@/hooks/use-eth-price";
import { useTransaction } from "@/hooks/use-transaction";
import { WorldIdGate } from "@/components/world-id-gate";
import { VerificationBadge } from "@/components/verification-badge";
import { formatAmount, shortenAddress } from "@/lib/utils";
import { getCollateralInfo, ETH_ADDRESS } from "@/lib/contracts";
import { sharePool, shareContacts, closeMiniApp, sendHaptic, sendTransaction, sendERC20Transaction } from "@/lib/minikit";
import { HonorVote } from "@/components/honor-vote";
import { formatDistanceToNow } from "date-fns";
import { parseUnits } from "viem";
import { useQueryClient } from "@tanstack/react-query";

/* ── Pool lifecycle stages ── */
const LIFECYCLE_STAGES = ["PENDING", "ACTIVE", "CLOSED", "SETTLED"] as const;

function getPoolStatusDisplay(state: string, expired: boolean, joustCount: number): { text: string; color: string } {
  if (state === "SETTLED") return { text: "SETTLED", color: "text-blue-400" };
  if (state === "REFUNDED") return { text: "REFUNDED", color: "text-red-400" };
  if (expired && joustCount > 0) return { text: "AWAITING SETTLEMENT", color: "text-yellow-400" };
  if (expired) return { text: "EXPIRED", color: "text-red-400" };
  if (state === "ACTIVE") return { text: "ACTIVE", color: "text-green-400" };
  if (state === "CLOSED") return { text: "CLOSED", color: "text-orange-400" };
  return { text: state, color: "" };
}

function PoolLifecycleBar({ state }: { state: string }) {
  const currentIdx = LIFECYCLE_STAGES.indexOf(state as typeof LIFECYCLE_STAGES[number]);
  const isRefunded = state === "REFUNDED";

  if (isRefunded) {
    return (
      <div className="mb-5">
        <div className="flex items-center gap-1 mb-1.5">
          {LIFECYCLE_STAGES.map((stage) => (
            <div key={stage} className="flex-1">
              <div className={`w-full h-1.5 rounded-full ${
                stage === "PENDING" || stage === "ACTIVE"
                  ? "bg-red-400/60"
                  : "bg-muted"
              }`} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
          {LIFECYCLE_STAGES.map((stage) => (
            <span key={stage} className="opacity-50">{stage}</span>
          ))}
        </div>
        <div className="text-center mt-1.5">
          <span className="text-xs font-medium text-red-400">Refunded</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex items-center gap-1 mb-1.5">
        {LIFECYCLE_STAGES.map((stage, i) => (
          <div key={stage} className="flex-1">
            <div className={`w-full h-1.5 rounded-full transition-colors ${
              i <= currentIdx
                ? i === currentIdx
                  ? "bg-accent"
                  : "bg-accent/60"
                : "bg-muted"
            }`} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
        {LIFECYCLE_STAGES.map((stage, i) => (
          <span key={stage} className={i <= currentIdx ? "text-foreground font-medium" : ""}>
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Transaction feedback banner ── */
const TX_BANNER_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300",
  confirming: "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300",
  success: "bg-green-500/10 border border-green-500/30 text-green-300",
  error: "bg-red-500/10 border border-red-500/30 text-red-300",
};

const TX_BANNER_TEXT: Record<string, string> = {
  pending: "Sending transaction...",
  confirming: "Confirming on chain...",
  success: "Transaction confirmed!",
};

function TxBanner({ status, error, onReset }: {
  status: string;
  error: string | null;
  onReset: () => void;
}) {
  if (status === "idle") return null;

  const message = status === "error" ? (error ?? "Transaction failed") : TX_BANNER_TEXT[status];
  const dismissable = status === "success" || status === "error";

  return (
    <div className={`rounded-xl px-4 py-3 mb-3 text-sm flex items-center justify-between ${TX_BANNER_STYLES[status]}`}>
      <span>{message}</span>
      {dismissable && (
        <button onClick={onReset} className="ml-3 text-xs underline opacity-70 hover:opacity-100">
          Dismiss
        </button>
      )}
    </div>
  );
}

export default function PoolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = usePool(id);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const recordTx = useRecordTx(id);

  // Separate tx trackers for joust vs arbiter actions
  const joustTx = useTransaction();
  const arbiterTx = useTransaction();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const ethPrice = useEthPrice();
  const [showJoust, setShowJoust] = useState(false);

  // Auto-fill min stake amount when pool loads
  const [amountInitialized, setAmountInitialized] = useState(false);
  useEffect(() => {
    if (data?.pool && !amountInitialized) {
      const c = getCollateralInfo(data.pool.collateral);
      const min = formatAmount(BigInt(data.pool.minJoustAmount?.toString() ?? "0"), c.decimals);
      if (min && min !== "0") {
        setAmount(min);
      }
      setAmountInitialized(true);
    }
  }, [data?.pool, amountInitialized]);

  // Settle flow state
  const [showSettlePicker, setShowSettlePicker] = useState(false);
  const [settleOption, setSettleOption] = useState<number | null>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-muted-foreground">Loading...</div>;
  }

  const pool = data?.pool;
  if (!pool) {
    return <div className="text-center py-16 text-muted-foreground">Pool not found</div>;
  }

  const collateral = getCollateralInfo(pool.collateral);
  const total = BigInt(pool.totalAmountJousted?.toString() ?? "0");
  const expired = new Date(pool.endTime) < new Date();
  const isActive = pool.state === "ACTIVE" && !expired;
  const isETH = pool.collateral.toLowerCase() === ETH_ADDRESS.toLowerCase();
  const contractId = pool.contractId != null ? BigInt(pool.contractId.toString()) : null;

  // Check if current user is the arbiter
  const userAddress = session?.user?.address?.toLowerCase() ?? "";
  const isArbiter = userAddress && pool.arbiterAddress?.toLowerCase() === userAddress;

  /* ── Joust handler ── */
  const handleJoust = async () => {
    if (selectedOption == null || !amount || contractId == null) return;

    const amountWei = parseUnits(amount, collateral.decimals);

    const hash = await joustTx.execute(async () => {
      // Build the Joust struct as tuple: [id, amount, player, joustType]
      const joustStruct = {
        id: contractId,
        amount: amountWei,
        player: session!.user.address as `0x${string}`,
        joustType: selectedOption,
      };
      const joustArgs = [joustStruct];

      if (isETH) {
        return sendTransaction("createJoust", joustArgs, amountWei);
      } else {
        return sendERC20Transaction(
          "createJoust",
          joustArgs,
          pool.collateral,
          amountWei,
        );
      }
    });

    if (hash) {
      // Record the joust in the DB
      try {
        await fetch("/api/joust", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            poolId: pool.id,
            joustType: selectedOption,
            amount: amountWei.toString(),
            txHash: hash,
          }),
        });
        sendHaptic("success");
        setAmount("");
        setSelectedOption(null);
        setShowJoust(false);
        // Refresh pool data
        queryClient.invalidateQueries({ queryKey: ["pool", id] });
        queryClient.invalidateQueries({ queryKey: ["pools"] });
      } catch (err) {
        console.error("Failed to record joust:", err);
      }
    }
  };

  /* ── Arbiter actions ── */
  const handleAcceptArbiter = async () => {
    if (contractId == null) return;
    const hash = await arbiterTx.execute(async () => {
      return sendTransaction("acceptArbiterDelegation", [contractId]);
    });
    if (hash) {
      await recordTx.mutateAsync({ txHash: hash, action: "accept-arbiter" });
      sendHaptic("success");
      refetch();
    }
  };

  const handleClosePool = async () => {
    if (contractId == null) return;
    const hash = await arbiterTx.execute(async () => {
      return sendTransaction("closePool", [contractId]);
    });
    if (hash) {
      await recordTx.mutateAsync({ txHash: hash, action: "close" });
      sendHaptic("success");
      refetch();
    }
  };

  const handleSettlePool = async () => {
    if (contractId == null || settleOption == null) return;
    const hash = await arbiterTx.execute(async () => {
      return sendTransaction("settlePoolAndPayout", [
        contractId,
        settleOption,
      ]);
    });
    if (hash) {
      await recordTx.mutateAsync({
        txHash: hash,
        action: "settle",
        winningJoustType: settleOption,
      });
      sendHaptic("success");
      setShowSettlePicker(false);
      setSettleOption(null);
      refetch();
    }
  };

  const handleRefundPool = async () => {
    if (contractId == null) return;
    const hash = await arbiterTx.execute(async () => {
      return sendTransaction("refundPool", [contractId]);
    });
    if (hash) {
      await recordTx.mutateAsync({ txHash: hash, action: "refund" });
      sendHaptic("success");
      refetch();
    }
  };

  /* ── Determine which arbiter actions are available ── */
  const canAcceptArbiter = isArbiter && !pool.arbiterAccepted && pool.state === "PENDING";
  const canClosePool = isArbiter && pool.arbiterAccepted && pool.state === "ACTIVE";
  const canSettlePool = isArbiter && pool.arbiterAccepted && pool.state === "CLOSED";
  const canRefundPool = isArbiter && pool.arbiterAccepted && (pool.state === "ACTIVE" || pool.state === "CLOSED");
  const showArbiterPanel = isArbiter && (canAcceptArbiter || canClosePool || canSettlePool || canRefundPool);
  const arbiterBusy = arbiterTx.status === "pending" || arbiterTx.status === "confirming";

  const statusDisplay = getPoolStatusDisplay(pool.state, expired, pool._count?.jousts ?? 0);

  return (
    <main className="pb-20 px-4 pt-4">
      <button onClick={() => window.history.back()} className="text-sm text-muted-foreground mb-3">
        &larr; Back
      </button>

      <div className="mb-4">
        <h1 className="text-xl font-bold mb-1">{pool.title}</h1>
        {pool.description && (
          <p className="text-sm text-muted-foreground">{pool.description}</p>
        )}
      </div>

      <PoolLifecycleBar state={pool.state} />

      {/* Arbiter World ID trust banner */}
      {pool.arbiter?.worldIdLevel === "orb" ? (
        <div className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-2.5 mb-4 text-sm text-green-400">
          <span className="text-base">&#x2714;</span>
          <span className="font-medium">Arbitrated by Orb-verified human</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2.5 mb-4 text-sm text-red-400">
          <span className="text-base">&#x26A0;</span>
          <span className="font-medium">Arbiter not verified with World ID</span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className={`font-medium ${statusDisplay.color}`}>
          {statusDisplay.text}
        </span>
        <span>{formatAmount(total, collateral.decimals)} {collateral.symbol}</span>
        <span>{pool._count?.jousts ?? 0} predictions</span>
        <span>Ends {formatDistanceToNow(new Date(pool.endTime), { addSuffix: true })}</span>
      </div>

      {/* Options / Results */}
      <div className="space-y-2 mb-4">
        {pool.options?.map((opt: any) => {
          const isWinner = pool.state === "SETTLED" && opt.joustType === pool.winningJoustType;
          const isSelected = selectedOption === opt.joustType;
          return (
            <button
              key={opt.joustType}
              onClick={() => isActive && setSelectedOption(opt.joustType)}
              disabled={!isActive}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${
                isWinner
                  ? "border-green-500 bg-green-500/10"
                  : isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{opt.label}</span>
                {isWinner && <span className="text-xs text-green-400">Winner</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Joust Transaction Feedback */}
      <TxBanner status={joustTx.status} error={joustTx.error} onReset={joustTx.reset} />

      {/* Joust Form */}
      {isActive && session?.authenticated && (
        <WorldIdGate level="device">
          {showJoust ? (
            <div className="bg-card rounded-xl border border-border p-4 mb-4">
              <h3 className="font-semibold text-sm mb-3">Stake Prediction</h3>
              {selectedOption ? (
                <>
                  <p className="text-xs text-muted-foreground mb-2">
                    Predicting: {pool.options?.find((o: any) => o.joustType === selectedOption)?.label}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      step="any"
                      placeholder={formatAmount(BigInt(pool.minJoustAmount?.toString() ?? "0"), collateral.decimals)}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 bg-muted rounded-lg px-3 py-2.5 text-sm border border-border outline-none"
                    />
                    <span className="flex items-center text-sm text-muted-foreground">{collateral.symbol}</span>
                  </div>
                  {ethPrice && (
                    <p className="text-xs text-muted-foreground mb-3">
                      ≈ ${((parseFloat(amount) || 0) * ethPrice).toFixed(2)} USD
                    </p>
                  )}
                  {contractId == null && (
                    <p className="text-xs text-red-400 mb-2">
                      Pool not yet deployed on-chain. Cannot stake predictions.
                    </p>
                  )}
                  <button
                    onClick={handleJoust}
                    disabled={!amount || joustTx.status === "pending" || joustTx.status === "confirming" || contractId == null}
                    className="w-full py-2.5 bg-accent text-white rounded-xl font-medium text-sm disabled:opacity-50"
                  >
                    {joustTx.status === "pending" && "Sending..."}
                    {joustTx.status === "confirming" && "Confirming..."}
                    {joustTx.status !== "pending" && joustTx.status !== "confirming" && "Stake Prediction"}
                  </button>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">Select an option above first</p>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowJoust(true)}
              className="w-full py-3 bg-accent text-white rounded-xl font-semibold mb-4"
            >
              Stake Prediction
            </button>
          )}
        </WorldIdGate>
      )}

      {/* Share / Invite / Done Actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => sharePool(pool.id, pool.title)}
          className="flex-1 py-2 bg-muted rounded-xl text-sm text-center"
        >
          Share
        </button>
        <button
          onClick={() => shareContacts(pool.title)}
          className="flex-1 py-2 bg-muted rounded-xl text-sm text-center"
        >
          Invite Friends
        </button>
        <button
          onClick={closeMiniApp}
          className="flex-1 py-2 bg-muted rounded-xl text-sm text-center"
        >
          Done
        </button>
      </div>

      {/* Arbiter Panel */}
      {showArbiterPanel && session?.authenticated && (
        <div className="bg-card rounded-xl border border-accent/30 p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3 text-accent">Arbiter Actions</h3>

          <TxBanner status={arbiterTx.status} error={arbiterTx.error} onReset={arbiterTx.reset} />

          <div className="space-y-2">
            {canAcceptArbiter && (
              <button
                onClick={handleAcceptArbiter}
                disabled={arbiterBusy}
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm disabled:opacity-50 transition-colors"
              >
                {arbiterBusy ? "Processing..." : "Accept Arbiter Role"}
              </button>
            )}

            {canClosePool && (
              <button
                onClick={handleClosePool}
                disabled={arbiterBusy}
                className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium text-sm disabled:opacity-50 transition-colors"
              >
                {arbiterBusy ? "Processing..." : "Close Pool"}
              </button>
            )}

            {canSettlePool && (
              <>
                {showSettlePicker ? (
                  <div className="bg-muted rounded-lg p-3 space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">Select the winning option:</p>
                    {pool.options?.map((opt: any) => (
                      <button
                        key={opt.joustType}
                        onClick={() => setSettleOption(opt.joustType)}
                        className={`w-full text-left p-2.5 rounded-lg border text-sm transition-colors ${
                          settleOption === opt.joustType
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                    <button
                      onClick={handleSettlePool}
                      disabled={settleOption == null || arbiterBusy}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm disabled:opacity-50 transition-colors mt-2"
                    >
                      {arbiterBusy ? "Processing..." : "Confirm Settlement"}
                    </button>
                    <button
                      onClick={() => { setShowSettlePicker(false); setSettleOption(null); }}
                      className="w-full py-2 text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSettlePicker(true)}
                    disabled={arbiterBusy}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm disabled:opacity-50 transition-colors"
                  >
                    Settle Pool
                  </button>
                )}
              </>
            )}

            {canRefundPool && (
              <button
                onClick={handleRefundPool}
                disabled={arbiterBusy}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-sm disabled:opacity-50 transition-colors"
              >
                {arbiterBusy ? "Processing..." : "Refund Pool"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Arbiter Info */}
      <div className="bg-card rounded-xl border border-border p-3 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Arbiter</div>
        <div className="flex items-center justify-between">
          <span className="text-sm flex items-center gap-1.5">
            {pool.arbiter?.username ?? shortenAddress(pool.arbiterAddress)}
            <VerificationBadge level={pool.arbiter?.worldIdLevel} />
            {isArbiter && <span className="text-xs text-accent ml-0.5">(you)</span>}
          </span>
          <span className="text-xs text-muted-foreground">
            {pool.arbiterAccepted ? "Accepted" : "Pending"} &middot; {pool.arbiterFee / 100}% fee
          </span>
        </div>
      </div>

      {/* Recent Predictions */}
      {pool.jousts?.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Recent Predictions</h3>
          <div className="space-y-1.5">
            {pool.jousts.slice(0, 10).map((joust: any) => (
              <div key={joust.id} className="flex items-center justify-between text-xs bg-card rounded-lg border border-border p-2.5">
                <span className="flex items-center gap-1">
                  {joust.user?.username ?? shortenAddress(joust.user?.address ?? "")}
                  <VerificationBadge level={joust.user?.worldIdLevel} />
                </span>
                <span className="text-muted-foreground">
                  {pool.options?.find((o: any) => o.joustType === joust.joustType)?.label}
                </span>
                <span>{formatAmount(BigInt(joust.amount?.toString() ?? "0"), collateral.decimals)} {collateral.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Honor Vote */}
      {pool.state === "SETTLED" && pool.arbiter && (
        <div className="mb-4">
          <HonorVote
            arbiterId={pool.arbiter.id}
            arbiterUsername={pool.arbiter.username}
            poolId={pool.id}
            poolTitle={pool.title}
          />
        </div>
      )}
    </main>
  );
}
