import { prisma } from "@/lib/prisma"
import Link from "next/link"
import NewProjectForm from "@/components/admin/new-project-form"

export default async function AdminProjectsPage() {
  const items = await prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 50 })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Geeks (Projects)</h1>
      <NewProjectForm />
      <div className="divide-y rounded-lg border">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.status} • {p.tech.join(" • ")}</div>
            </div>
            <Link href={`/admin/content/projects/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No projects yet.</div>
        )}
      </div>
    </div>
  )
}

