"use client"
import { useState } from "react"

export default function NewHackForm() {
  const [event, setEvent] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [projectName, setProjectName] = useState("")
  const [role, setRole] = useState("")
  const [description, setDescription] = useState("")
  const [tech, setTech] = useState("")
  const [result, setResult] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [demoUrl, setDemoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/hacks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, year: Number(year), projectName, role, description, tech: tech? tech.split(",").map(t=>t.trim()).filter(Boolean): [], result: result || undefined, repoUrl: repoUrl || undefined, demoUrl: demoUrl || undefined })
    })
    setLoading(false)
    if (!res.ok) setError(await res.text())
    else location.reload()
  }

  return (
    <form onSubmit={onCreate} className="space-y-3 rounded-lg border p-4">
      <div className="font-medium">New Hack</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Event</label>
          <input value={event} onChange={(e)=>setEvent(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
        </div>
        <div>
          <label className="block text-sm">Year</label>
          <input value={year} onChange={(e)=>setYear(e.target.value as any)} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Project Name</label>
          <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <input value={role} onChange={(e)=>setRole(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
        </div>
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
      </div>
      <div>
        <label className="block text-sm">Tech (comma separated)</label>
        <input value={tech} onChange={(e)=>setTech(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm">Result</label>
          <input value={result} onChange={(e)=>setResult(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
        <div>
          <label className="block text-sm">Repo URL</label>
          <input value={repoUrl} onChange={(e)=>setRepoUrl(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
        <div>
          <label className="block text-sm">Demo URL</label>
          <input value={demoUrl} onChange={(e)=>setDemoUrl(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Creating…" : "Create Hack"}</button>
    </form>
  )
}

