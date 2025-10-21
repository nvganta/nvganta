export default function HacksPage() {
  const hacks = Array.from({ length: 6 }).map((_, i) => ({
    slug: `hack-${i + 1}`,
    event: `Hack Event ${2020 + i}`,
    role: i % 2 === 0 ? "Builder" : "Hacker",
    result: i % 3 === 0 ? "Winner" : "Participant",
  }))
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {hacks.map((h) => (
        <div key={h.slug} className="rounded-lg border p-4">
          <div className="font-medium">{h.event}</div>
          <div className="text-sm text-muted-foreground">{h.role} • {h.result}</div>
        </div>
      ))}
    </div>
  )
}

