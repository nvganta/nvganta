export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Hi, I’m Naveen.</h1>
      <p className="text-muted-foreground max-w-2xl">
        Welcome to my personal site. Explore my latest thoughts, projects I’m hacking on,
        and a timeline of hackathon builds. There’s also a digital twin to help you around.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="/thoughts/posts" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Thoughts</div>
          <div className="text-sm text-muted-foreground">Posts and long-form articles</div>
        </a>
        <a href="/geeks" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Geeks</div>
          <div className="text-sm text-muted-foreground">Active projects and links</div>
        </a>
        <a href="/hacks" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Hacks</div>
          <div className="text-sm text-muted-foreground">Hackathon projects and outcomes</div>
        </a>
      </div>
    </div>
  )
}

