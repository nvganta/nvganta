import { prisma } from "@/lib/prisma"
import Link from "next/link"
import NewHackForm from "@/components/admin/new-hack-form"

export default async function AdminHacksPage() {
  const items = await prisma.hack.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Hacks</h1>
      <NewHackForm />
      <div className="divide-y rounded-lg border">
        {items.map((h) => (
          <div key={h.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{h.event} — {h.year}</div>
              <div className="text-xs text-muted-foreground">{h.projectName} • {h.role}</div>
            </div>
            <Link href={`/admin/content/hacks/${h.id}`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No hacks yet.</div>
        )}
      </div>
    </div>
  )
}

