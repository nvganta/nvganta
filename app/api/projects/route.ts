import { prisma } from "@/lib/prisma"
import { ProjectCreateSchema } from "@/lib/validators"
import { requireAdmin } from "@/lib/authz"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || 1)
  const pageSize = Math.min(Number(url.searchParams.get("pageSize") || 20), 100)
  const status = url.searchParams.get("status") || undefined
  const where = status ? { status } : {}
  const [items, total] = await Promise.all([
    prisma.project.findMany({ where, orderBy: { updatedAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.project.count({ where }),
  ])
  return Response.json({ items, total, page, pageSize })
}

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  const json = await req.json()
  const parsed = ProjectCreateSchema.safeParse(json)
  if (!parsed.success) return new Response(parsed.error.message, { status: 400 })
  const data = parsed.data
  const slug = data.slug || `g-${Date.now()}`
  const created = await prisma.project.create({ data: { ...data, slug } })
  return Response.json(created, { status: 201 })
}
