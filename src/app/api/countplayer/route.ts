import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const counter = await prisma.playCounter.upsert({
    where: { id: 1 },
    update: { finished: { increment: 1 } },
    create: { id: 1, finished: 1 },
  });
  return NextResponse.json(counter);
}

export async function GET() {
  const counter = await prisma.playCounter.findUnique({ where: { id: 1 } });
  return NextResponse.json(counter);
}
