import { prisma } from "@/lib/prisma"

export default async function HacksPage() {
  const hacks = await prisma.hack.findMany({
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    total: hacks.length,
    wins: hacks.filter(h => h.result?.toLowerCase().includes('winner')).length,
    runnerUps: hacks.filter(h => h.result?.toLowerCase().includes('runner')).length,
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

      {/* Timeline */}
      {hacks.length > 0 ? (
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block" style={{ marginLeft: '7px' }} />

          {hacks.map((hack, index) => (
          <div key={hack.slug} className="relative pl-0 md:pl-12">
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 hidden md:flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full border-4 border-background ${
                hack.result === "Winner"
                  ? "bg-yellow-500"
                  : hack.result === "Runner Up"
                  ? "bg-blue-500"
                  : "bg-primary"
              }`} />
            </div>

            {/* Hack Card */}
            <div className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {hack.projectName}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{hack.event}</span>
                    <span>•</span>
                    <span>{hack.year}</span>
                    <span>•</span>
                    <span>{hack.role}</span>
                  </div>
                </div>
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
                  {hack.award && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400">
                      💰 {hack.award}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {hack.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {hack.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
              <div className="text-3xl font-bold gradient-text mb-1">48h</div>
              <div className="text-sm text-muted-foreground">Avg Duration</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

