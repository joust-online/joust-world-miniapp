"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TabNavigation } from "@/components/tab-navigation";
import { WorldIdGate } from "@/components/world-id-gate";
import { useCreatePool } from "@/hooks/use-pool";
import { useTransaction } from "@/hooks/use-transaction";
import { useSession } from "@/hooks/use-profile";
import { COLLATERAL_TOKENS, JOUST_ARENA_ADDRESS } from "@/lib/contracts";
import { joustArenaAbi } from "@/lib/abi";
import { sendHaptic, createPoolOnChain } from "@/lib/minikit";
import { createPublicClient, http, decodeEventLog } from "viem";
import { worldchain } from "viem/chains";

function CreatePoolForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const createPool = useCreatePool();
  const tx = useTransaction();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collateral, setCollateral] = useState("ETH");
  const [minAmount, setMinAmount] = useState("0.001");
  const [arbiterFee, setArbiterFee] = useState("100");
  const [endDate, setEndDate] = useState("");
  const [step, setStep] = useState<"form" | "deploying" | "recording" | "done">("form");
  const [poolId, setPoolId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState([
    { label: "Yes", joustType: 1, orderIndex: 0 },
    { label: "No", joustType: 2, orderIndex: 1 },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = COLLATERAL_TOKENS[collateral];
    const minAmountBigInt = BigInt(Math.floor(parseFloat(minAmount) * 10 ** token.decimals));
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    try {
      // Step 1: Create pool record in DB
      const result = await createPool.mutateAsync({
        title,
        description: description || undefined,
        arbiterAddress: session?.user?.address,
        arbiterFee: parseInt(arbiterFee),
        collateral: token.address,
        minJoustAmount: minAmountBigInt.toString(),
        endTime: new Date(endDate).toISOString(),
        options,
      });

      const dbPoolId = result.pool.id;
      setPoolId(dbPoolId);
      setStep("deploying");

      // Step 2: Deploy to chain via MiniKit
      const txHash = await tx.execute(() =>
        createPoolOnChain({
          arbiter: session?.user?.address,
          arbiterFee: parseInt(arbiterFee),
          collateral: token.address,
          minJoustAmount: minAmountBigInt,
          supportedJoustTypes: options.length,
          endTime: endTimestamp,
        })
      );

      setStep("recording");

      // Step 3: Read the contractId from the tx receipt via PoolCreated event
      const client = createPublicClient({
        chain: worldchain,
        transport: http(),
      });

      const receipt = await client.waitForTransactionReceipt({ hash: txHash });
      let contractId: number | undefined;

      for (const log of receipt.logs) {
        try {
          const decoded = decodeEventLog({
            abi: joustArenaAbi,
            data: log.data,
            topics: log.topics,
          });
          if (decoded.eventName === "PoolCreated") {
            contractId = Number((decoded.args as unknown as { id: bigint }).id);
            break;
          }
        } catch {
          // Not this event, skip
        }
      }

      // Fallback: read poolCounter from chain (the latest pool id)
      if (contractId === undefined) {
        const counter = await client.readContract({
          address: JOUST_ARENA_ADDRESS,
          abi: joustArenaAbi,
          functionName: "poolCounter",
        });
        contractId = Number(counter);
      }

      // Step 4: Record tx hash and contractId back to DB
      const recordRes = await fetch(`/api/pool/${dbPoolId}/record-tx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: txHash,
          action: "deploy",
          contractId,
        }),
      });

      if (!recordRes.ok) {
        const err = await recordRes.json();
        throw new Error(err.error ?? "Failed to record deployment");
      }

      setStep("done");
      sendHaptic("success");
      router.push(`/pool/${dbPoolId}`);
    } catch (err) {
      console.error("Failed to create pool:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      sendHaptic("error");
      // If we created the DB record but chain tx failed, still allow navigation
      if (poolId && step !== "form") {
        setStep("form");
      }
    }
  };

  const isSubmitting = createPool.isPending || step === "deploying" || step === "recording";
  const buttonLabel =
    step === "deploying"
      ? "Deploying on-chain..."
      : step === "recording"
      ? "Recording transaction..."
      : createPool.isPending
      ? "Creating..."
      : "Create Pool";

  const addOption = () => {
    const nextType = options.length + 1;
    setOptions([...options, { label: "", joustType: nextType, orderIndex: options.length }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground block mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Will ETH hit $5k by July?"
          required
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none resize-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">Options</label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <input
              key={i}
              value={opt.label}
              onChange={(e) => {
                const next = [...options];
                next[i] = { ...next[i], label: e.target.value };
                setOptions(next);
              }}
              placeholder={`Option ${i + 1}`}
              required
              className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none"
            />
          ))}
          {options.length < 6 && (
            <button type="button" onClick={addOption} className="text-xs text-accent">
              + Add option
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Collateral</label>
          <select
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border outline-none"
          >
            {Object.entries(COLLATERAL_TOKENS).map(([key, t]) => (
              <option key={key} value={key}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Min Stake</label>
          <input
            type="number"
            step="any"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            required
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Arbiter Fee (bps)</label>
          <input
            type="number"
            value={arbiterFee}
            onChange={(e) => setArbiterFee(e.target.value)}
            min="0"
            max="200"
            required
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-accent outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-accent text-white rounded-xl font-semibold disabled:opacity-50"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

export default function CreatePage() {
  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">Create Pool</h1>
      <WorldIdGate level="orb" action="create-pool">
        <CreatePoolForm />
      </WorldIdGate>
      <TabNavigation />
    </main>
  );
}
