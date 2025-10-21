import Link from "next/link"

const links = [
  { href: "/thoughts/posts", label: "Thoughts" },
  { href: "/geeks", label: "Geeks" },
  { href: "/hacks", label: "Hacks" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">nvganta</Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-blue-600 dark:hover:text-blue-400">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

