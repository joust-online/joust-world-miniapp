"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useJousts(poolId?: string) {
  return useQuery({
    queryKey: ["jousts", poolId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (poolId) params.set("poolId", poolId);
      const res = await fetch(`/api/joust?${params}`);
      if (!res.ok) throw new Error("Failed to fetch jousts");
      return res.json();
    },
  });
}

export function useMyJousts(userId?: number) {
  return useQuery({
    queryKey: ["jousts", "my", userId],
    queryFn: async () => {
      const res = await fetch(`/api/joust?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch jousts");
      return res.json();
    },
    enabled: !!userId,
  });
}

export function useCreateJoust() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { poolId: string; joustType: number; amount: string; txHash: string }) => {
      const res = await fetch("/api/joust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create joust");
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jousts", variables.poolId] });
      queryClient.invalidateQueries({ queryKey: ["pool", variables.poolId] });
      queryClient.invalidateQueries({ queryKey: ["pools"] });
    },
  });
}
