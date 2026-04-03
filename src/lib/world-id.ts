import { verifyCloudProof, IVerifyResponse, ISuccessResult } from "@worldcoin/minikit-js";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;

export type VerificationLevel = "orb" | "device";

export interface WorldIdProof {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: VerificationLevel;
}

export async function verifyWorldIdProof(
  proof: ISuccessResult,
  action: string,
  signal?: string
): Promise<IVerifyResponse> {
  const response = await verifyCloudProof(proof, APP_ID, action, signal);
  return response;
}

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
