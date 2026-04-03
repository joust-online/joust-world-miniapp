import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Nonce must be alphanumeric, at least 8 characters per MiniKit docs
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const cookieStore = await cookies();
  cookieStore.set("siwe", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300, // 5 minutes
  });
  return NextResponse.json({ nonce });
}
