/**
 * Convert human-readable amount to wei (contract format)
 * Example: 5.5 USDC -> 5500000 (5.5 * 10^6)
 */
export function parseTokenAmount(amount: string | number, decimals: number): bigint {
  const amountStr = typeof amount === "number" ? amount.toString() : amount;
  const [whole, fraction = ""] = amountStr.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  const fullAmountStr = (whole ?? "0") + paddedFraction;
  return BigInt(fullAmountStr);
}

/**
 * Convert wei to human-readable amount
 * Example: 5500000 -> "5.5" (for USDC with 6 decimals)
 */
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  fixedDecimals?: number,
): string {
  const amountStr = amount.toString();

  let whole: string;
  let fraction: string;

  if (amountStr.length <= decimals) {
    whole = "0";
    fraction = amountStr.padStart(decimals, "0");
  } else {
    whole = amountStr.slice(0, -decimals);
    fraction = amountStr.slice(-decimals);
  }

  // Remove trailing zeros from fraction
  const trimmedFraction = fraction.replace(/0+$/, "");
  const raw = trimmedFraction ? `${whole}.${trimmedFraction}` : whole;

  if (fixedDecimals !== undefined) {
    const parts = raw.split(".");
    const wholePart = parts[0] ?? "0";
    let decimalPart = parts[1] ?? "";

    if (decimalPart.length > fixedDecimals) {
      decimalPart = decimalPart.slice(0, fixedDecimals);
    } else {
      decimalPart = decimalPart.padEnd(fixedDecimals, "0");
    }

    return fixedDecimals > 0 ? `${wholePart}.${decimalPart}` : wholePart;
  }
  return raw || "0";
}
