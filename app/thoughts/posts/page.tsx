import { prisma } from "@/lib/prisma"
import { PostCard } from "@/components/post-card"

function formatTimeAgo(date: Date) {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
      },
    },
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

      {/* Posts - Grid Layout (2 columns) */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                timeAgo: formatTimeAgo(post.createdAt),
              }}
            />
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
