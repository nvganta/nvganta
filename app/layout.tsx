import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Naveen Ganta",
  description: "Thoughts, Geeks, Hacks — and a helpful digital twin.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
            <ChatBot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

