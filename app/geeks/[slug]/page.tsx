import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

type Props = { params: { slug: string } }

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params
  if (!slug) return notFound()

  const project = await prisma.project.findUnique({
    where: { slug },
  })

  if (!project) return notFound()

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/geeks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to projects
      </Link>

      {/* Project Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              project.status === "active"
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : project.status === "paused"
                ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                : "bg-secondary text-secondary-foreground"
            }`}>
              {project.status === "active" && "● "}
              {project.status === "paused" && "⏸ "}
              {project.status === "completed" && "✓ "}
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {project.name}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
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
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Visit Site
              </a>
            )}
          </div>
        )}
      </header>

      {/* Project Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2>About the Project</h2>
        <p className="text-lg leading-relaxed">
          {project.description}
        </p>
      </article>

      {/* Footer */}
      <footer className="pt-8 border-t border-border">
        <div className="text-center">
          <Link
            href="/geeks"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all projects
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}
