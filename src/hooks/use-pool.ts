"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Pool {
  id: string;
  contractId: bigint;
  title: string;
  description?: string;
  state: string;
  collateral: string;
  minJoustAmount: bigint;
  totalAmountJousted: bigint;
  endTime: string;
  arbiterFee: number;
  arbiterAddress: string;
  arbiterAccepted: boolean;
  winningJoustType: number;
  options: { id: number; joustType: number; label: string; orderIndex: number }[];
  jousts: { id: number; joustType: number; amount: bigint; user?: { id: number; username: string; address: string } }[];
  creator: { id: number; username: string; address: string };
  arbiter?: { id: number; username: string; address: string };
  _count: { jousts: number };
}

export function usePools(state?: string) {
  return useQuery({
    queryKey: ["pools", state],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (state) params.set("state", state);
      const res = await fetch(`/api/pool?${params}`);
      if (!res.ok) throw new Error("Failed to fetch pools");
      return res.json() as Promise<{ pools: Pool[]; nextCursor: string | null }>;
    },
  });
}

export function usePool(id: string) {
  return useQuery({
    queryKey: ["pool", id],
    queryFn: async () => {
      const res = await fetch(`/api/pool/${id}`);
      if (!res.ok) throw new Error("Failed to fetch pool");
      return res.json() as Promise<{ pool: Pool }>;
    },
    enabled: !!id,
  });
}

export function useCreatePool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create pool");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pools"] });
    },
  });
}

export function useRecordTx(poolId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { txHash: string; action: string; contractId?: number; winningJoustType?: number }) => {
      const res = await fetch(`/api/pool/${poolId}/record-tx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to record transaction");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pool", poolId] });
      queryClient.invalidateQueries({ queryKey: ["pools"] });
    },
  });
}
