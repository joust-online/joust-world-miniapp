"use client";

import { useQuery } from "@tanstack/react-query";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export function useEthPrice(): number | null {
  const { data } = useQuery({
    queryKey: ["eth-price"],
    queryFn: async () => {
      const res = await fetch(COINGECKO_URL);
      const data = await res.json();
      return (data.ethereum?.usd as number) ?? null;
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return data ?? null;
}
