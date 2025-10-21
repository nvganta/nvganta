import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Naveen Ganta",
  description: "Thoughts, Geeks, Hacks — and a helpful digital twin.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

