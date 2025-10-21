import Link from "next/link"

const sections = [
  {
    href: "/thoughts/posts",
    title: "Thoughts",
    description: "Short posts and long-form articles on tech, design, and life",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
      </svg>
    ),
  },
  {
    href: "/geeks",
    title: "Geeks",
    description: "Active projects, side hustles, and experiments",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    href: "/hacks",
    title: "Hacks",
    description: "Hackathon projects, rapid prototypes, and wild ideas",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="gradient-text">Naveen</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Builder, thinker, and hackathon enthusiast. I create things, write about my journey,
            and experiment with ideas that excite me.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/thoughts/posts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Explore my thoughts
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/geeks"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            View projects
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What you'll find here</h2>
          <p className="text-muted-foreground">
            A collection of my work, thoughts, and experiments
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* My Mains Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">My Mains</h2>
          <p className="text-muted-foreground">
            Projects I'm actively building and shipping right now
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href="https://agentmaya.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold group-hover:gradient-text transition-all">
                  AgentMaya.io
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Building intelligent AI agents that automate workflows and boost productivity
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active Development
              </div>
            </div>
          </a>

          <a
            href="https://thethinkingage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold group-hover:gradient-text transition-all">
                  TheThinkingAge.com
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Exploring ideas, insights, and innovations shaping the future of technology
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active Development
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

