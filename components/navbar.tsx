"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

const links = [
  { href: "/thoughts/posts", label: "Thoughts" },
  { href: "/geeks", label: "Geeks" },
  { href: "/hacks", label: "Hacks" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="gradient-text">Naveen Sai Ganta</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            // Highlight "Thoughts" for both /thoughts/posts and /thoughts/articles
            const isActive = link.href === "/thoughts/posts"
              ? pathname.startsWith("/thoughts")
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all backdrop-blur-md ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side: Theme toggle + Mobile menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-9 w-9 rounded-lg border border-border bg-card hover:bg-accent transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border glass">
          <nav className="mx-auto max-w-6xl px-4 py-4 space-y-1">
            {links.map((link) => {
              // Highlight "Thoughts" for both /thoughts/posts and /thoughts/articles
              const isActive = link.href === "/thoughts/posts"
                ? pathname.startsWith("/thoughts")
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all backdrop-blur-md ${
                    isActive
                      ? "bg-primary/20 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

