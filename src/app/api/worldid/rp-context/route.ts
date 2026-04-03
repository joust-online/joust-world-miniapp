import { NextRequest, NextResponse } from "next/server";
import { signRequest } from "@worldcoin/idkit-core/signing";

export async function POST(req: NextRequest) {
  const { action } = await req.json();

  const { sig, nonce, createdAt, expiresAt } = signRequest({
    signingKeyHex: process.env.WORLD_SIGNING_KEY!,
    action,
  });

  return NextResponse.json({
    sig,
    nonce,
    created_at: createdAt,
    expires_at: expiresAt,
  });
}
