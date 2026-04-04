"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AiArbiter {
  id: number;
  name: string;
  description: string | null;
  category: string;
  strategy: string;
  walletAddress: string;
  isActive: boolean;
  createdAt: string;
  creator: { id: number; username: string; worldIdLevel: string | null };
  _count: { pools: number };
}

export function useAiArbiters() {
  return useQuery({
    queryKey: ["ai-arbiters"],
    queryFn: async () => {
      const res = await fetch("/api/ai-arbiter");
      if (!res.ok) throw new Error("Failed to fetch AI arbiters");
      return res.json() as Promise<{
        arbiters: AiArbiter[];
        agentWallet: { address: string; agentBookVerified: boolean; humanId: string | null };
      }>;
    },
  });
}

export function useAiArbiter(id: number) {
  return useQuery({
    queryKey: ["ai-arbiter", id],
    queryFn: async () => {
      const res = await fetch(`/api/ai-arbiter/${id}`);
      if (!res.ok) throw new Error("Failed to fetch AI arbiter");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateAiArbiter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      category: string;
      strategy: string;
    }) => {
      const res = await fetch("/api/ai-arbiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create AI arbiter");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-arbiters"] });
    },
  });
}

export function useRequestSettlement(aiArbiterId: number, poolId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/ai-arbiter/${aiArbiterId}/settle/${poolId}`, {
        method: "POST",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Settlement failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pool", poolId] });
      queryClient.invalidateQueries({ queryKey: ["pools"] });
      queryClient.invalidateQueries({ queryKey: ["ai-arbiter", aiArbiterId] });
    },
  });
}

export function useAutoAccept() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/ai-arbiter/auto-accept", { method: "POST" });
      if (!res.ok) throw new Error("Auto-accept failed");
      return res.json();
    },
  });
}
