import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function GeeksPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="gradient-text">Geeks</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Active projects, side hustles, and experiments I'm working on
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/geeks/${project.slug}`}
            className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            {/* Project preview image placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-primary/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  project.status === "active"
                    ? "bg-green-500/20 text-green-600 dark:text-green-400"
                    : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                }`}>
                  {project.status === "active" ? "● Active" : "● Paused"}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Links Preview */}
              {(project.demoUrl || project.repoUrl) && (
                <div className="flex items-center gap-3 pt-2 border-t text-xs text-muted-foreground">
                  {project.demoUrl && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span>Live Demo</span>
                    </div>
                  )}
                  {project.repoUrl && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                      </svg>
                      <span>Source Code</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

