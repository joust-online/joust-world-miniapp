import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import prisma from "@/lib/prisma";

const RP_ID = process.env.WORLD_RP_ID!;

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const { idkitResponse, action } = await req.json();

    if (!idkitResponse || !action) {
      return NextResponse.json({ error: "Missing idkitResponse or action" }, { status: 400 });
    }

    // Forward to World Developer Portal for verification
    const verifyRes = await fetch(`https://developer.world.org/api/v4/verify/${RP_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idkitResponse),
    });

    if (!verifyRes.ok) {
      const errBody = await verifyRes.text();
      console.error("World ID verify failed:", errBody);
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    // Extract nullifier from the response
    const responses = idkitResponse.responses;
    const nullifier = responses?.[0]?.nullifier;
    const identifier = responses?.[0]?.identifier; // "orb" or "device"

    if (!nullifier) {
      return NextResponse.json({ error: "No nullifier in proof" }, { status: 400 });
    }

    // Check nullifier hasn't been used for this action
    const existing = await prisma.worldIdVerification.findUnique({
      where: { nullifierHash: nullifier },
    });
    if (existing) {
      return NextResponse.json({ error: "Already verified for this action" }, { status: 409 });
    }

    // Determine verification level
    const verificationLevel = identifier === "orb" ? "orb" : "device";

    // Store verification
    await prisma.worldIdVerification.create({
      data: {
        userId: session.userId,
        action,
        nullifierHash: nullifier,
        verificationLevel,
      },
    });

    // Update user verification status (upgrade, never downgrade)
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    const updateData: { worldIdVerified: boolean; worldIdLevel?: string } = {
      worldIdVerified: true,
    };
    if (user && user.worldIdLevel !== "orb") {
      updateData.worldIdLevel = verificationLevel;
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
    });

    // Update session
    session.worldIdVerified = true;
    if (updateData.worldIdLevel) {
      session.worldIdLevel = updateData.worldIdLevel;
    }
    await session.save();

    return NextResponse.json({ success: true, verificationLevel });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
