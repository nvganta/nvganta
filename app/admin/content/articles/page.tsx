import { prisma } from "@/lib/prisma"
import Link from "next/link"
import NewArticleForm from "@/components/admin/new-article-form"

export default async function AdminArticlesPage() {
  const items = await prisma.article.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Articles</h1>
      <NewArticleForm />
      <div className="divide-y rounded-lg border">
        {items.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.tags.join(" • ")}</div>
            </div>
            <Link href={`/admin/content/articles/${a.id}`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No articles yet.</div>
        )}
      </div>
    </div>
  )
}

