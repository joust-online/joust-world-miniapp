export type VerificationLevel = "orb" | "device";

export function requireWorldId(
  worldIdVerified: boolean,
  worldIdLevel: string | null,
  requiredLevel: VerificationLevel
): { allowed: boolean; reason?: string } {
  if (!worldIdVerified) {
    return { allowed: false, reason: "World ID verification required" };
  }
  if (requiredLevel === "orb" && worldIdLevel !== "orb") {
    return { allowed: false, reason: "Orb-level World ID verification required" };
  }
  return { allowed: true };
}

export const JOUST_LIMITS = {
  device: { maxAmount: BigInt(1_000_000) }, // 1 USDC (6 decimals)
  orb: { maxAmount: null }, // unlimited
} as const;
