import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatAmount(amount: bigint, decimals: number): string {
  if (amount === BigInt(0)) return "0";
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, "0");
  // Show enough digits to represent the value (at least 4, but more if needed)
  const firstNonZero = fractionalStr.search(/[1-9]/);
  const significantDigits = firstNonZero === -1 ? 0 : Math.max(4, firstNonZero + 2);
  const trimmed = fractionalStr.slice(0, significantDigits);
  return `${integerPart}.${trimmed}`.replace(/\.?0*$/, "").replace(/\.$/, "") || "0";
}
