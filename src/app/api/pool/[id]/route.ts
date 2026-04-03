import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pool = await prisma.pool.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, username: true, address: true, pfp: true, worldIdLevel: true } },
      arbiter: { select: { id: true, username: true, address: true, pfp: true, worldIdLevel: true } },
      options: { orderBy: { orderIndex: "asc" } },
      jousts: {
        include: {
          user: { select: { id: true, username: true, address: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { jousts: true } },
    },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  return NextResponse.json({ pool });
}
