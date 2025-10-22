import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.update({
      where: { id: params.id },
      data: { likes: { increment: 1 } },
    })

    return NextResponse.json({ likes: post.likes })
  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
  }
}
