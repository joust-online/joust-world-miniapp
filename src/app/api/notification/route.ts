import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await requireSession();

    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        pool: { select: { id: true, title: true } },
      },
    });

    const unreadCount = await prisma.notification.count({
      where: { userId: session.userId, read: false },
    });

    return NextResponse.json({ notifications, unreadCount });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireSession();
    const { ids } = await req.json();

    if (Array.isArray(ids)) {
      await prisma.notification.updateMany({
        where: { id: { in: ids }, userId: session.userId },
        data: { read: true },
      });
    } else {
      await prisma.notification.updateMany({
        where: { userId: session.userId, read: false },
        data: { read: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
