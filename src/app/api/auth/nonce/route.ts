import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const nonce = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("siwe-nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300, // 5 minutes
  });
  return NextResponse.json({ nonce });
}
