import { prisma } from "@/lib/prisma"
import { ProjectUpdateSchema } from "@/lib/validators"
import { requireAdmin } from "@/lib/authz"

type Ctx = { params: { id: string } }

export async function GET(_req: Request, ctx: Ctx) {
  const item = await prisma.project.findUnique({ where: { id: ctx.params.id } })
  if (!item) return new Response("Not Found", { status: 404 })
  return Response.json(item)
}

export async function PATCH(req: Request, ctx: Ctx) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  const json = await req.json()
  const parsed = ProjectUpdateSchema.safeParse(json)
  if (!parsed.success) return new Response(parsed.error.message, { status: 400 })
  const updated = await prisma.project.update({ where: { id: ctx.params.id }, data: parsed.data })
  return Response.json(updated)
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const admin = await requireAdmin()
  if (!admin.ok) return new Response(admin.message, { status: admin.status })
  await prisma.project.delete({ where: { id: ctx.params.id } })
  return new Response(null, { status: 204 })
}

