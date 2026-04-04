import { type Address } from "viem";
import { worldchain } from "viem/chains";

export const CHAIN = worldchain;
export const CHAIN_ID = worldchain.id; // 480

// Set after deployment
export const JOUST_ARENA_ADDRESS = (process.env.NEXT_PUBLIC_JOUST_ARENA_ADDRESS ?? "0x") as Address;

// World Chain token addresses
export const USDC_ADDRESS = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1" as Address;
export const WETH_ADDRESS = "0x4200000000000000000000000000000000000006" as Address;
export const ETH_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;

export const COLLATERAL_TOKENS: Record<string, { symbol: string; decimals: number; address: Address }> = {
  WETH: { symbol: "WETH", decimals: 18, address: WETH_ADDRESS },
  ETH: { symbol: "ETH", decimals: 18, address: ETH_ADDRESS },
  USDC: { symbol: "USDC", decimals: 6, address: USDC_ADDRESS },
};
