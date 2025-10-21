import { prisma } from "@/lib/prisma"
import Link from "next/link"
import NewPostForm from "@/components/admin/new-post-form"

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
      </div>
      <NewPostForm />
      <div className="divide-y rounded-lg border">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">{p.text.slice(0, 80)}</div>
              <div className="text-xs text-muted-foreground">{p.tags.join(" • ")}</div>
            </div>
            <Link href={`/admin/content/posts/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No posts yet.</div>
        )}
      </div>
    </div>
  )
}

