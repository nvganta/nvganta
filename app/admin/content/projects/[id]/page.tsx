import { prisma } from "@/lib/prisma"
import EditProjectForm from "@/components/admin/edit-project-form"

type Props = { params: { id: string } }

export default async function EditProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { id: params.id } })
  if (!project) return <div className="text-sm text-muted-foreground">Not found</div>
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Project</h1>
      <EditProjectForm project={project as any} />
    </div>
  )
}

