export type VerificationLevel = "orb" | "device";

export function requireWorldId(
  worldIdVerified: boolean,
  worldIdLevel: string | null,
  requiredLevel: VerificationLevel,
): { allowed: boolean; reason?: string } {
  if (!worldIdVerified) {
    return { allowed: false, reason: "World ID verification required" };
  }
  if (requiredLevel === "orb" && worldIdLevel !== "orb") {
    return { allowed: false, reason: "Orb-level World ID verification required" };
  }
  return { allowed: true };
}

// Device-level limits: ~$1 equivalent per joust
export const JOUST_LIMITS_BY_COLLATERAL: Record<string, bigint> = {
  "0x0000000000000000000000000000000000000000": BigInt("500000000000000"), // 0.0005 ETH (~$1)
  "0x79a02482a880bce3f13e09da970dc34db4cd24d1": BigInt("1000000"), // 1 USDC
};

export function getDeviceJoustLimit(collateralAddress: string): bigint | null {
  return JOUST_LIMITS_BY_COLLATERAL[collateralAddress.toLowerCase()] ?? null;
}
