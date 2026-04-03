import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { MiniAppWalletAuthSuccessPayload } from "@worldcoin/minikit-js/commands";
import { verifySiweMessage } from "@worldcoin/minikit-js/siwe";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type RequestBody = {
  payload: MiniAppWalletAuthSuccessPayload;
  nonce: string;
};

export async function POST(req: NextRequest) {
  try {
    const { payload, nonce } = (await req.json()) as RequestBody;

    if (!payload || !nonce) {
      return NextResponse.json({ error: "Missing payload or nonce" }, { status: 400 });
    }

    // Verify nonce matches what we stored in the cookie
    const cookieStore = await cookies();
    const storedNonce = cookieStore.get("siwe")?.value;
    if (nonce !== storedNonce) {
      return NextResponse.json({ error: "Invalid nonce" }, { status: 400 });
    }

    const verification = await verifySiweMessage(payload, nonce);
    if (!verification.isValid) {
      return NextResponse.json({ error: "Invalid SIWE signature" }, { status: 401 });
    }

    const address = verification.siweMessageData.address.toLowerCase();

    // Upsert user
    const user = await prisma.user.upsert({
      where: { address },
      update: { updatedAt: new Date() },
      create: {
        address,
        username: address.slice(0, 10),
      },
    });

    // Set session
    const session = await getSession();
    session.userId = user.id;
    session.address = user.address;
    session.username = user.username;
    session.worldIdVerified = user.worldIdVerified;
    session.worldIdLevel = user.worldIdLevel;
    await session.save();

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        address: user.address,
        worldIdVerified: user.worldIdVerified,
        worldIdLevel: user.worldIdLevel,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
