import { NextRequest, NextResponse } from "next/server";
import { signRequest } from "@worldcoin/idkit-core/signing";
import { requireSession } from "@/lib/session";

const ALLOWED_ACTIONS = ["verify-identity", "create-pool", "honor-vote"];

export async function POST(req: NextRequest) {
  try {
    await requireSession();
    const { action } = await req.json();

    if (!action || !ALLOWED_ACTIONS.includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

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
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
