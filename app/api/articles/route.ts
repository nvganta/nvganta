import { prisma } from "@/lib/prisma"
import { ArticleCreateSchema } from "@/lib/validators"
import { requireAdmin } from "@/lib/authz"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || 1)
  const pageSize = Math.min(Number(url.searchParams.get("pageSize") || 20), 100)
  const tag = url.searchParams.get("tag") || undefined
  const where = tag ? { tags: { has: tag } } : {}
  const [items, total] = await Promise.all([
    prisma.article.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.article.count({ where }),
  ])
  return Response.json({ items, total, page, pageSize })
}

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  const json = await req.json()
  const parsed = ArticleCreateSchema.safeParse(json)
  if (!parsed.success) return new Response(parsed.error.message, { status: 400 })
  const data = parsed.data
  const slug = data.slug || `a-${Date.now()}`
  const created = await prisma.article.create({
    data: {
      ...data,
      slug,
      publishedAt: data.published ? new Date() : null,
    },
  })
  return Response.json(created, { status: 201 })
}
