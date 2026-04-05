import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ authenticated: false });
  }

  // Refresh session from DB to pick up verification changes
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  // Sync session if DB state has changed
  if (
    session.worldIdVerified !== user.worldIdVerified ||
    session.worldIdLevel !== user.worldIdLevel ||
    session.username !== user.username
  ) {
    session.worldIdVerified = user.worldIdVerified;
    session.worldIdLevel = user.worldIdLevel;
    session.username = user.username;
    await session.save();
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

export async function DELETE() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ authenticated: false });
}
