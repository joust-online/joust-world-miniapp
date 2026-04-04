import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// JSON serialize helper — converts BigInt to string
export function jsonSerialize(data: unknown): string {
  return JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v));
}

export function jsonResponse(data: unknown, status = 200) {
  return new Response(jsonSerialize(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function formatAmount(amount: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, "0").slice(0, 4);
  return `${integerPart}.${fractionalStr}`.replace(/\.?0+$/, "");
}
