import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth-options"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/login")
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {session.user?.name || session.user?.email}.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="/admin/content/posts" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Posts</div>
          <div className="text-sm text-muted-foreground">Create and edit short posts</div>
        </a>
        <a href="/admin/content/articles" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Articles</div>
          <div className="text-sm text-muted-foreground">Write and publish long-form</div>
        </a>
        <a href="/admin/content/projects" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Geeks</div>
          <div className="text-sm text-muted-foreground">Manage active projects</div>
        </a>
        <a href="/admin/content/hacks" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Hacks</div>
          <div className="text-sm text-muted-foreground">Add hackathon entries</div>
        </a>
      </div>
    </div>
  )
}
