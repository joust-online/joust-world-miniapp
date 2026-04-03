import { NextRequest, NextResponse } from "next/server";
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from "@worldcoin/minikit-js";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { payload, nonce } = (await req.json()) as {
      payload: MiniAppWalletAuthSuccessPayload;
      nonce: string;
    };

    if (!payload || !nonce) {
      return NextResponse.json({ error: "Missing payload or nonce" }, { status: 400 });
    }

    const validMessage = await verifySiweMessage(payload, nonce);
    if (!validMessage.isValid) {
      return NextResponse.json({ error: "Invalid SIWE signature" }, { status: 401 });
    }

    const address = payload.address.toLowerCase();

    // Upsert user
    const user = await prisma.user.upsert({
      where: { address },
      update: { updatedAt: new Date() },
      create: {
        address,
        username: payload.address.slice(0, 10),
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
