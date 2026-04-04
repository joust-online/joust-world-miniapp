"use client";

import { useState, useEffect } from "react";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export function useEthPrice(): number | null {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch(COINGECKO_URL)
      .then((r) => r.json())
      .then((d) => setEthPrice(d.ethereum?.usd ?? null))
      .catch(() => {});
  }, []);

  return ethPrice;
}
