import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const CommentSchema = z.object({
  text: z.string().min(1).max(500),
  name: z.string().max(100).optional().nullable(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const data = CommentSchema.parse(body)

    const comment = await prisma.postComment.create({
      data: {
        postId: params.id,
        text: data.text,
        name: data.name || null,
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
}
