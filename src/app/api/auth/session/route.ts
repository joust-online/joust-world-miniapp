import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      address: session.address,
      username: session.username,
      worldIdVerified: session.worldIdVerified,
      worldIdLevel: session.worldIdLevel,
    },
  });
}
