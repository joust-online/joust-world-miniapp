import { IDKit, orbLegacy } from "@worldcoin/idkit-core";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;
const RP_ID = process.env.NEXT_PUBLIC_RP_ID!;

/**
 * Runs the full World ID verification flow:
 * 1. Fetch RP context signature from our backend
 * 2. Create IDKit request and poll until user completes verification
 * 3. Send proof to our backend for server-side verification
 *
 * Returns true on success, throws on failure.
 */
export async function runWorldIdVerification(action: string): Promise<boolean> {
  const rpSig = await fetch("/api/worldid/rp-context", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  }).then((r) => r.json());

  const request = await IDKit.request({
    app_id: APP_ID as `app_${string}`,
    action,
    rp_context: {
      rp_id: RP_ID,
      nonce: rpSig.nonce,
      created_at: rpSig.created_at,
      expires_at: rpSig.expires_at,
      signature: rpSig.sig,
    },
    allow_legacy_proofs: true,
    environment: "production",
  }).preset(orbLegacy());

  const completion = await request.pollUntilCompletion({ timeout: 120000 });
  if (!completion.success) {
    throw new Error("Verification timed out or was cancelled");
  }

  const res = await fetch("/api/worldid/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idkitResponse: completion.result,
      action,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Verification failed");
  }

  return true;
}
