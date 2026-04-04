"use client";

import { useQuery } from "@tanstack/react-query";

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
