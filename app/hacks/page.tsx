import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HacksPage() {
  const hacks = await prisma.hack.findMany({
    orderBy: { createdAt: "desc" },
  })

  // Calculate average duration
  const hacksWithDuration = hacks.filter(h => h.durationHours)
  const avgDuration = hacksWithDuration.length > 0
    ? Math.round(hacksWithDuration.reduce((sum, h) => sum + (h.durationHours || 0), 0) / hacksWithDuration.length)
    : 48

  const stats = {
    total: hacks.length,
    wins: hacks.filter(h => h.result?.toLowerCase().includes('winner')).length,
    runnerUps: hacks.filter(h => h.result?.toLowerCase().includes('runner')).length,
    avgDuration: `${avgDuration}h`,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="gradient-text">Hacks</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Hackathon projects, rapid prototypes, and 48-hour builds
        </p>
      </div>

      {/* Hack Cards Grid */}
      {hacks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hacks.map((hack) => (
            <Link
              key={hack.slug}
              href={`/hacks/${hack.slug}`}
              className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Card Header with Result Badge */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {hack.projectName}
                  </h3>
                  {hack.result && (
                    <span className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      hack.result === "Winner"
                        ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : hack.result === "Runner Up"
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {hack.result === "Winner" ? "🏆" : hack.result === "Runner Up" ? "🥈" : "✨"}
                    </span>
                  )}
                </div>

                {/* Event Info */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-medium">{hack.event}</span>
                  <span>•</span>
                  <span>{hack.year}</span>
                  <span>•</span>
                  <span>{hack.role}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {hack.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {hack.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      {tech}
                    </span>
                  ))}
                  {hack.tech.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      +{hack.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Links Preview */}
                {(hack.demoUrl || hack.repoUrl) && (
                  <div className="flex items-center gap-3 pt-2 border-t text-xs text-muted-foreground">
                    {hack.demoUrl && (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        <span>Live Demo</span>
                      </div>
                    )}
                    {hack.repoUrl && (
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
          <p className="text-muted-foreground">No hackathon projects yet. Check back soon!</p>
        </div>
      )}

      {/* Stats Section */}
      {hacks.length > 0 && (
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Hackathon Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Hackathons</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.wins}</div>
              <div className="text-sm text-muted-foreground">Wins</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.runnerUps}</div>
              <div className="text-sm text-muted-foreground">Runner Ups</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.avgDuration}</div>
              <div className="text-sm text-muted-foreground">Avg Duration</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6" style={{ textTransform: 'lowercase' }}>
            winning is not the point.
          </p>
        </div>
      )}
    </div>
  )
}
