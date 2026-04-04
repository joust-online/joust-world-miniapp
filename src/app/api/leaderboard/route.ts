import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const topArbiters = await prisma.honorScore.findMany({
    orderBy: { score: "desc" },
    take: 20,
    include: {
      arbiter: {
        select: { id: true, username: true, address: true, pfp: true, worldIdLevel: true },
      },
    },
  });

  const topJousters = await prisma.user.findMany({
    orderBy: { totalPoints: "desc" },
    take: 20,
    select: {
      id: true,
      username: true,
      address: true,
      pfp: true,
      worldIdLevel: true,
      totalPoints: true,
      _count: { select: { jousts: true } },
    },
  });

  return NextResponse.json({ topArbiters, topJousters });
}
