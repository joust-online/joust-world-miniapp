"use client";

import { useState, useCallback } from "react";
import { sendHaptic } from "@/lib/minikit";

type TxStatus = "idle" | "pending" | "confirming" | "success" | "error";

export function useTransaction() {
  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (txFn: () => Promise<any>) => {
      setStatus("pending");
      setError(null);
      try {
        const result = await txFn();
        const userOpHash = result.userOpHash;
        setStatus("confirming");
        sendHaptic("heavy");

        if (!userOpHash) {
          // Fallback if result shape is unexpected
          setStatus("success");
          return result;
        }

        // Poll World API for user operation to be mined
        for (let i = 0; i < 30; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          try {
            const statusRes = await fetch(
              `https://developer.world.org/api/v2/minikit/userop/${userOpHash}`
            );
            if (statusRes.ok) {
              const opStatus = await statusRes.json();
              if (opStatus.status === "success" && opStatus.transaction_hash) {
                setTxHash(opStatus.transaction_hash);
                setStatus("success");
                sendHaptic("success");
                return opStatus.transaction_hash;
              }
            }
          } catch {
            // Keep polling
          }
        }

        // Timeout — report error
        throw new Error("Transaction not confirmed after 60s");
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

  return { execute, status, txHash, error, reset };
}
