import Link from "next/link"

export default function ArticlesListPage() {
  const articles = Array.from({ length: 6 }).map((_, i) => ({
    slug: `example-${i + 1}`,
    title: `Example Article ${i + 1}`,
    summary: "A short summary of the article goes here.",
    tags: ["nextjs", "design"],
  }))

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {articles.map((a) => (
        <Link key={a.slug} href={`/thoughts/articles/${a.slug}`} className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">{a.title}</div>
          <div className="text-sm text-muted-foreground">{a.summary}</div>
          <div className="mt-2 text-xs text-muted-foreground">{a.tags.join(" • ")}</div>
        </Link>
      ))}
    </div>
  )
}

