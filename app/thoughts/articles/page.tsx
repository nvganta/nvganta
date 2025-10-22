import Link from "next/link"
import { prisma } from "@/lib/prisma"

function estimateReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default async function ArticlesListPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      tags: true,
      body: true,
      heroImage: true,
      createdAt: true,
      featured: true,
    },
  })

  const articlesWithMeta = articles.map((article) => ({
    ...article,
    readTime: estimateReadTime(article.body),
    date: article.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  // Get featured article or fallback to most recent
  const featured = articlesWithMeta.find(a => a.featured) || articlesWithMeta[0]
  const rest = featured ? articlesWithMeta.filter(a => a.id !== featured.id) : articlesWithMeta.slice(1)

  if (articlesWithMeta.length === 0) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Long-form content on web development, design systems, and technology
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles yet. Check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="gradient-text">Articles</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Long-form content on web development, design systems, and technology
        </p>
      </div>

      {/* Featured Article */}
      <Link
        href={`/thoughts/articles/${featured.slug}`}
        className="group block rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            Featured
          </span>
          <span className="text-sm text-muted-foreground">{featured.date}</span>
        </div>
        <h2 className="text-3xl font-bold mb-3 group-hover:gradient-text transition-all">
          {featured.title}
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed max-w-3xl">
          {featured.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {featured.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0 Z" />
            </svg>
            <span>{featured.readTime}</span>
          </div>
        </div>
      </Link>

      {/* Articles Grid */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
          <Link
            key={article.slug}
            href={`/thoughts/articles/${article.slug}`}
            className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            {/* Article cover image or placeholder */}
            {article.heroImage ? (
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-primary/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
              </div>
            )}

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
        </div>
      )}
    </div>
  )
}

