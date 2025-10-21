import { prisma } from "@/lib/prisma"
import EditHackForm from "@/components/admin/edit-hack-form"

type Props = { params: { id: string } }

export default async function EditHackPage({ params }: Props) {
  const hack = await prisma.hack.findUnique({ where: { id: params.id } })
  if (!hack) return <div className="text-sm text-muted-foreground">Not found</div>
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Hack</h1>
      <EditHackForm hack={hack as any} />
    </div>
  )
}

