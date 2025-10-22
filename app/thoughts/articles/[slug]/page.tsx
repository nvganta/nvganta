import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

type Props = { params: { slug: string } }

function estimateReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = params
  if (!slug) return notFound()

  const article = await prisma.article.findUnique({
    where: { slug },
  })

  if (!article || !article.published) return notFound()

  const readTime = estimateReadTime(article.body)
  const date = article.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/thoughts/articles"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to articles
      </Link>

      {/* Article Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-sm font-semibold">NG</span>
            </div>
            <div>
              <div className="font-medium">Naveen Ganta</div>
              <div className="text-muted-foreground text-xs">{date}</div>
            </div>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{readTime}</span>
          </div>
          {article.tags.length > 0 && (
            <>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: article.body
              // Convert markdown to basic HTML
              .replace(/^### (.*$)/gim, '<h3>$1</h3>')
              .replace(/^## (.*$)/gim, '<h2>$1</h2>')
              .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/gim, '<em>$1</em>')
              .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
              .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
              .replace(/\n\n/gim, '</p><p>')
              .replace(/^(?!<[h|p|u|o|i])/gim, '<p>')
              .replace(/(?<![>])$/gim, '</p>')
              .replace(/<p><\/p>/gim, '')
              .replace(/<p>(<h[1-6]>)/gim, '$1')
              .replace(/(<\/h[1-6]>)<\/p>/gim, '$1')
              .replace(/<p>(<img)/gim, '$1')
              .replace(/(\/?>)<\/p>/gim, '$1'),
          }}
        />
      </article>

      {/* Article Footer */}
      <footer className="pt-8 border-t border-border space-y-6">
        {/* Share */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Share this article</div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
            </button>
          </div>
        </div>

        {/* Back to Articles */}
        <div className="text-center">
          <Link
            href="/thoughts/articles"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all articles
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}

