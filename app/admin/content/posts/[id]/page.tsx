import { prisma } from "@/lib/prisma"
import EditPostForm from "@/components/admin/edit-post-form"

type Props = { params: { id: string } }

export default async function EditPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return <div className="text-sm text-muted-foreground">Not found</div>
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  )
}

