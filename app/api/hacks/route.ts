import { prisma } from "@/lib/prisma"
import { HackCreateSchema } from "@/lib/validators"
import { requireAdmin } from "@/lib/authz"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || 1)
  const pageSize = Math.min(Number(url.searchParams.get("pageSize") || 20), 100)
  const year = url.searchParams.get("year")
  const where = year ? { year: Number(year) } : {}
  const [items, total] = await Promise.all([
    prisma.hack.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.hack.count({ where }),
  ])
  return Response.json({ items, total, page, pageSize })
}

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  const json = await req.json()
  const parsed = HackCreateSchema.safeParse(json)
  if (!parsed.success) return new Response(parsed.error.message, { status: 400 })
  const data = parsed.data
  const slug = data.slug || `h-${Date.now()}`
  const created = await prisma.hack.create({ data: { ...data, slug } })
  return Response.json(created, { status: 201 })
}
