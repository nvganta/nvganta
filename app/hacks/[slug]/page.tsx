import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

type Props = { params: { slug: string } }

export default async function HackDetailPage({ params }: Props) {
  const { slug } = params
  if (!slug) return notFound()

  const hack = await prisma.hack.findUnique({
    where: { slug },
  })

  if (!hack) return notFound()

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/hacks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to hacks
      </Link>

      {/* Hack Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              hack.result === "Winner"
                ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                : hack.result === "Runner Up"
                ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                : "bg-secondary text-secondary-foreground"
            }`}>
              {hack.result === "Winner" && "🏆 "}
              {hack.result === "Runner Up" && "🥈 "}
              {hack.result}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {hack.projectName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="font-medium">{hack.event}</span>
              <span>•</span>
              <span>{hack.year}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span>Role: {hack.role}</span>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {hack.tech.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(hack.repoUrl || hack.demoUrl) && (
          <div className="flex flex-wrap gap-4">
            {hack.repoUrl && (
              <a
                href={hack.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            )}
            {hack.demoUrl && (
              <a
                href={hack.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hack Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2>About the Project</h2>
        <p className="text-lg leading-relaxed">
          {hack.description}
        </p>

        {hack.images && hack.images.length > 0 && (
          <div className="space-y-4 not-prose">
            <h2 className="text-2xl font-bold">Screenshots</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {hack.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`${hack.projectName} screenshot ${i + 1}`}
                  className="rounded-lg border border-border"
                />
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="pt-8 border-t border-border">
        <div className="text-center">
          <Link
            href="/hacks"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all hacks
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}
