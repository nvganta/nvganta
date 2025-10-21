import { prisma } from "@/lib/prisma"
import EditArticleForm from "@/components/admin/edit-article-form"

type Props = { params: { id: string } }

export default async function EditArticlePage({ params }: Props) {
  const article = await prisma.article.findUnique({ where: { id: params.id } })
  if (!article) return <div className="text-sm text-muted-foreground">Not found</div>
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Article</h1>
      <EditArticleForm article={article as any} />
    </div>
  )
}

