"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TabNavigation } from "@/components/tab-navigation";
import { WorldIdGate } from "@/components/world-id-gate";
import { useCreatePool } from "@/hooks/use-pool";
import { useSession } from "@/hooks/use-profile";
import { useEthPrice } from "@/hooks/use-eth-price";
import { COLLATERAL_TOKENS, JOUST_ARENA_ADDRESS } from "@/lib/contracts";
import { joustArenaAbi } from "@/lib/abi";
import { sendHaptic, createPoolOnChain } from "@/lib/minikit";
import { createPublicClient, http, decodeEventLog } from "viem";
import { worldchain } from "viem/chains";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function CreatePoolForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const createPool = useCreatePool();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collateral, setCollateral] = useState("ETH");
  const [minAmount, setMinAmount] = useState("0.001");
  const [arbiterFee, setArbiterFee] = useState("100");
  const [endDate, setEndDate] = useState("");
  const [step, setStep] = useState<"form" | "deploying" | "recording" | "done">("form");
  const [poolId, setPoolId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ethPrice = useEthPrice();

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
      const txResult = await createPoolOnChain({
        arbiter: session?.user?.address,
        arbiterFee: parseInt(arbiterFee),
        collateral: token.address,
        minJoustAmount: minAmountBigInt,
        supportedJoustTypes: options.length,
        endTime: endTimestamp,
      });

      const userOpHash = txResult.userOpHash;
      setStep("recording");

      // Step 3: Poll for user operation to be mined and get real tx hash
      let txHash: string | undefined;
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const statusRes = await fetch(
          `https://developer.world.org/api/v2/minikit/userop/${userOpHash}`,
        );
        if (statusRes.ok) {
          const status = await statusRes.json();
          if (status.status === "success" && status.transaction_hash) {
            txHash = status.transaction_hash;
            break;
          }
        }
      }

      if (!txHash) {
        throw new Error("Transaction not confirmed after 60s");
      }

      // Step 4: Read contractId from chain (poolCounter - 1 is the latest pool)
      const client = createPublicClient({
        chain: worldchain,
        transport: http(),
      });

      let contractId: number = 0;
      try {
        const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });
        let found = false;
        for (const log of receipt.logs) {
          try {
            const decoded = decodeEventLog({
              abi: joustArenaAbi,
              data: log.data,
              topics: log.topics,
            });
            if (
              decoded.eventName === "PoolCreated" ||
              decoded.eventName === "PoolCreationPending"
            ) {
              contractId = Number((decoded.args as any).id);
              found = true;
              break;
            }
          } catch {
            // Non-target log, skip
          }
        }
        if (!found) {
          const counter = await client.readContract({
            address: JOUST_ARENA_ADDRESS,
            abi: joustArenaAbi,
            functionName: "poolCounter",
          });
          contractId = Number(counter) - 1;
        }
      } catch {
        const counter = await client.readContract({
          address: JOUST_ARENA_ADDRESS,
          abi: joustArenaAbi,
          functionName: "poolCounter",
        });
        contractId = Number(counter) - 1;
      }

      // Step 5: Record tx hash and contractId back to DB
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

  function getButtonLabel(): string {
    if (step === "deploying") return "Deploying on-chain...";
    if (step === "recording") return "Recording transaction...";
    if (createPool.isPending) return "Creating...";
    return "Create Pool";
  }
  const buttonLabel = getButtonLabel();

  const addOption = () => {
    const nextType = options.length + 1;
    setOptions([...options, { label: "", joustType: nextType, orderIndex: options.length }]);
  };

  return (
    <Card className="rounded-xl py-0 shadow-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Will ETH hit $5k by July?"
              required
            />
          </div>

          <div>
            <label className="text-muted-foreground mb-1 block text-sm">
              Description (optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Options</label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <Input
                  key={i}
                  value={opt.label}
                  onChange={(e) => {
                    const next = [...options];
                    next[i] = { ...next[i], label: e.target.value };
                    setOptions(next);
                  }}
                  placeholder={`Option ${i + 1}`}
                  required
                />
              ))}
              {options.length < 6 && (
                <Button
                  type="button"
                  variant="link"
                  onClick={addOption}
                  className="h-auto p-0 text-xs"
                >
                  + Add option
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground mb-1 block text-sm">Collateral</label>
              <Select value={collateral} onValueChange={setCollateral}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COLLATERAL_TOKENS).map(([key, t]) => (
                    <SelectItem key={key} value={key}>
                      {t.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-muted-foreground mb-1 block text-sm">Min Stake</label>
              <Input
                type="number"
                step="any"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                required
              />
              {ethPrice && parseFloat(minAmount) > 0 && (
                <p className="text-muted-foreground mt-1 text-xs">
                  ≈ ${(parseFloat(minAmount) * ethPrice).toFixed(2)} USD
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground mb-1 block text-sm">Arbiter Fee (bps)</label>
              <Input
                type="number"
                value={arbiterFee}
                onChange={(e) => setArbiterFee(e.target.value)}
                min="0"
                max="200"
                required
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-1 block text-sm">End Date</label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {buttonLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function CreatePage() {
  return (
    <main className="px-4 pt-4 pb-20">
      <h1 className="mb-4 text-xl font-bold">Create Pool</h1>
      <CreatePoolForm />
      <TabNavigation />
    </main>
  );
}
