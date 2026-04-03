import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession, requireSession } from "@/lib/session";

const updateProfileSchema = z.object({
  username: z.string().min(1).max(50).optional(),
  pfp: z.string().url().max(255).optional(),
});

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      honorScore: true,
      _count: {
        select: {
          jousts: true,
          createdPools: true,
          arbitratedPools: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Calculate win stats
  const wins = await prisma.joust.count({
    where: { userId: session.userId, isWinner: true },
  });

  return NextResponse.json({
    user: {
      ...user,
      winCount: wins,
      lossCount: user._count.jousts - wins,
    },
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireSession();
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: parsed.data,
    });

    if (parsed.data.username) {
      session.username = parsed.data.username;
      await session.save();
    }

    return NextResponse.json({ user: updated });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
