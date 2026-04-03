"use client";

import { useState, useCallback } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { sendHaptic } from "@/lib/minikit";

type TxStatus = "idle" | "pending" | "confirming" | "success" | "error";

export function useTransaction() {
  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);

  const receipt = useWaitForTransactionReceipt({ hash: txHash });

  const execute = useCallback(
    async (txFn: () => Promise<{ transaction_id: string }>) => {
      setStatus("pending");
      setError(null);
      try {
        const result = await txFn();
        const hash = result.transaction_id as `0x${string}`;
        setTxHash(hash);
        setStatus("confirming");
        sendHaptic("heavy");
        return hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Transaction failed";
        setError(message);
        setStatus("error");
        sendHaptic("error");
        throw err;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(undefined);
    setError(null);
  }, []);

  return { execute, status, txHash, receipt, error, reset };
}
