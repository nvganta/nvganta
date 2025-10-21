import { prisma } from "@/lib/prisma"

function formatTimeAgo(date: Date) {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

type Post = {
  id: string
  text: string
  createdAt: Date
  link?: string | null
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>{formatTimeAgo(post.createdAt)}</span>
      </div>
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
        {post.text}
      </p>
      {post.link && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            View link
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      )}
    </article>
  )
}

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="gradient-text">Thoughts</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Quick thoughts, updates, and musings on tech, design, and life
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

