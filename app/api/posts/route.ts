import { prisma } from "@/lib/prisma"
import { PostCreateSchema, slugify } from "@/lib/validators"
import { requireAdmin } from "@/lib/authz"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || 1)
  const pageSize = Math.min(Number(url.searchParams.get("pageSize") || 20), 100)
  const tag = url.searchParams.get("tag") || undefined
  const where = tag ? { tags: { has: tag } } : {}
  const [items, total] = await Promise.all([
    prisma.post.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.post.count({ where }),
  ])
  return Response.json({ items, total, page, pageSize })
}

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  const json = await req.json()
  const parsed = PostCreateSchema.safeParse(json)
  if (!parsed.success) return new Response(parsed.error.message, { status: 400 })
  const data = parsed.data
  const slug = data.slug || `p-${Date.now()}`
  const created = await prisma.post.create({ data: { ...data, slug } })
  return Response.json(created, { status: 201 })
}
