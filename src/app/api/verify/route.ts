import { NextRequest, NextResponse } from "next/server";
import { ISuccessResult } from "@worldcoin/minikit-js";
import { verifyWorldIdProof } from "@/lib/world-id";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const { proof, action, signal } = (await req.json()) as {
      proof: ISuccessResult;
      action: string;
      signal?: string;
    };

    if (!proof || !action) {
      return NextResponse.json({ error: "Missing proof or action" }, { status: 400 });
    }

    // Verify the proof with World ID
    const result = await verifyWorldIdProof(proof, action, signal);
    if (!result.success) {
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    // Check nullifier hasn't been used for this action
    const existing = await prisma.worldIdVerification.findUnique({
      where: { nullifierHash: proof.nullifier_hash },
    });
    if (existing) {
      return NextResponse.json({ error: "Already verified for this action" }, { status: 409 });
    }

    // Store verification
    await prisma.worldIdVerification.create({
      data: {
        userId: session.userId,
        action,
        nullifierHash: proof.nullifier_hash,
        verificationLevel: proof.verification_level,
      },
    });

    // Update user verification status (upgrade, never downgrade)
    const updateData: { worldIdVerified: boolean; worldIdLevel?: string } = {
      worldIdVerified: true,
    };
    if (action === "verify-identity") {
      // Only upgrade level, never downgrade from orb to device
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (user && user.worldIdLevel !== "orb") {
        updateData.worldIdLevel = proof.verification_level;
      }
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

    return NextResponse.json({ success: true, verificationLevel: proof.verification_level });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
