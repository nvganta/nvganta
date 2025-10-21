export default function GeeksPage() {
  const projects = Array.from({ length: 6 }).map((_, i) => ({
    slug: `project-${i + 1}`,
    name: `Project ${i + 1}`,
    status: i % 2 === 0 ? "active" : "paused",
    tech: ["Next.js", "MongoDB"],
  }))
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <div key={p.slug} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">{p.name}</div>
            <span className="text-xs uppercase text-muted-foreground">{p.status}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{p.tech.join(" • ")}</div>
        </div>
      ))}
    </div>
  )
}

