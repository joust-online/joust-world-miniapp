import { type Address } from "viem";
import { worldchain } from "viem/chains";

export const CHAIN_ID = worldchain.id; // 480

// Set after deployment
export const JOUST_ARENA_ADDRESS = (process.env.NEXT_PUBLIC_JOUST_ARENA_ADDRESS ?? "0x") as Address;

// World Chain token addresses
export const ETH_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;

export const COLLATERAL_TOKENS: Record<
  string,
  { symbol: string; decimals: number; address: Address }
> = {
  ETH: { symbol: "ETH", decimals: 18, address: ETH_ADDRESS },
};

/** Look up collateral token info by on-chain address. */
export function getCollateralInfo(address: string): {
  symbol: string;
  decimals: number;
  address: Address;
} {
  const normalized = address.toLowerCase();
  return (
    Object.values(COLLATERAL_TOKENS).find((t) => t.address.toLowerCase() === normalized) ?? {
      symbol: "???",
      decimals: 18,
      address: normalized as Address,
    }
  );
}
