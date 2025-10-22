"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ThoughtsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Thoughts</h1>
        <div className="flex gap-3 text-sm">
          <Link
            href="/thoughts/posts"
            className={`rounded px-3 py-1 transition-colors ${
              pathname === "/thoughts/posts"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Posts
          </Link>
          <Link
            href="/thoughts/articles"
            className={`rounded px-3 py-1 transition-colors ${
              pathname.startsWith("/thoughts/articles")
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Articles
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

