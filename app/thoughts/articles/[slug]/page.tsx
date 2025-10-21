import { notFound } from "next/navigation"
import Link from "next/link"

type Props = { params: { slug: string } }

export default function ArticlePage({ params }: Props) {
  const { slug } = params
  if (!slug) return notFound()

  // Mock data for demo purposes
  const article = {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    summary: "A comprehensive guide to modern web development practices and patterns",
    author: "Naveen Ganta",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    tags: ["nextjs", "react", "webdev"],
  }

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
              <div className="font-medium">{article.author}</div>
              <div className="text-muted-foreground text-xs">{article.date}</div>
            </div>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{article.readTime}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          This is a placeholder article. In production, this would render MDX content from the database
          with full support for code blocks, images from Cloudinary, custom components, and more.
        </p>

        <h2>Introduction</h2>
        <p>
          Modern web development has evolved significantly over the past few years. With the introduction
          of frameworks like Next.js and tools like TypeScript, building robust, performant web applications
          has become more accessible than ever.
        </p>

        <h2>Key Concepts</h2>
        <p>
          Let's explore some fundamental concepts that every modern web developer should understand:
        </p>

        <ul>
          <li>Server-side rendering and static site generation</li>
          <li>Component-based architecture with React</li>
          <li>Type safety with TypeScript</li>
          <li>API routes and backend integration</li>
          <li>Performance optimization techniques</li>
        </ul>

        <h3>Code Example</h3>
        <p>
          Here's a simple example of a Next.js component (in production, this would be syntax-highlighted):
        </p>

        <pre><code>{`export default function Example() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <p>This is a Next.js component</p>
    </div>
  )
}`}</code></pre>

        <h2>Best Practices</h2>
        <p>
          Following industry best practices ensures your codebase remains maintainable and scalable.
          Some key principles include separation of concerns, DRY (Don't Repeat Yourself), and writing
          testable code.
        </p>

        <blockquote>
          <p>
            "The best code is code that is easy to understand, maintain, and extend."
          </p>
        </blockquote>

        <h2>Conclusion</h2>
        <p>
          Building modern web applications requires a solid understanding of both fundamental concepts
          and cutting-edge tools. By leveraging frameworks like Next.js and following best practices,
          you can create applications that are fast, scalable, and delightful to use.
        </p>

        <p className="text-muted-foreground italic">
          Note: This is placeholder content. Real articles will be fetched from the database and
          rendered using MDX with full formatting, code highlighting, and embedded media.
        </p>
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

        {/* Related Articles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">More articles</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <Link
                key={i}
                href={`/thoughts/articles/related-article-${i}`}
                className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md"
              >
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Related Article {i}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Another interesting article about web development and modern practices.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

