"use client"
import { useState } from "react"

type Hack = {
  id: string
  event: string
  year: number
  projectName: string
  role: string
  description: string
  tech: string[]
  result?: string | null
  durationHours?: number | null
  repoUrl?: string | null
  demoUrl?: string | null
}

export default function EditHackForm({ hack }: { hack: Hack }) {
  const [event, setEvent] = useState(hack.event)
  const [year, setYear] = useState<number | "">(hack.year)
  const [projectName, setProjectName] = useState(hack.projectName)
  const [role, setRole] = useState(hack.role)
  const [description, setDescription] = useState(hack.description)
  const [tech, setTech] = useState(hack.tech.join(", "))
  const [result, setResult] = useState(hack.result || "")
  const [durationHours, setDurationHours] = useState<number | "">(hack.durationHours || "")
  const [repoUrl, setRepoUrl] = useState(hack.repoUrl || "")
  const [demoUrl, setDemoUrl] = useState(hack.demoUrl || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const res = await fetch(`/api/hacks/${hack.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, year: Number(year), projectName, role, description, tech: tech? tech.split(",").map(t=>t.trim()).filter(Boolean): [], result: result || undefined, durationHours: durationHours ? Number(durationHours) : undefined, repoUrl: repoUrl || undefined, demoUrl: demoUrl || undefined })
    })
    setSaving(false)
    if (!res.ok) setError(await res.text())
    else location.assign("/admin/content/hacks")
  }

  async function onDelete() {
    if (!confirm("Delete this hack?")) return
    const res = await fetch(`/api/hacks/${hack.id}`, { method: "DELETE" })
    if (!res.ok) alert("Delete failed")
    else location.assign("/admin/content/hacks")
  }

  return (
    <form onSubmit={onSave} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Event</label>
          <input value={event} onChange={(e)=>setEvent(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
        <div>
          <label className="block text-sm">Year</label>
          <input value={year} onChange={(e)=>setYear(e.target.value as any)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Project Name</label>
          <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <input value={role} onChange={(e)=>setRole(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div>
        <label className="block text-sm">Tech</label>
        <input value={tech} onChange={(e)=>setTech(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">Result</label>
          <input value={result} onChange={(e)=>setResult(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" placeholder="e.g., Winner, Runner Up" />
        </div>
        <div>
          <label className="block text-sm">Duration (hours)</label>
          <input type="number" value={durationHours} onChange={(e)=>setDurationHours(e.target.value as any)} className="mt-1 w-full rounded-md border bg-transparent p-2" placeholder="e.g., 24, 48, 72" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
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
      <div className="flex gap-3">
        <button disabled={saving} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onDelete} className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700">Delete</button>
      </div>
    </form>
  )
}

