"use client"
import { useState } from "react"

type Project = {
  id: string
  name: string
  status: string
  description: string
  tech: string[]
  repoUrl?: string | null
  demoUrl?: string | null
}

export default function EditProjectForm({ project }: { project: Project }) {
  const [name, setName] = useState(project.name)
  const [status, setStatus] = useState(project.status)
  const [description, setDescription] = useState(project.description)
  const [tech, setTech] = useState(project.tech.join(", "))
  const [repoUrl, setRepoUrl] = useState(project.repoUrl || "")
  const [demoUrl, setDemoUrl] = useState(project.demoUrl || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, status, description, tech: tech? tech.split(",").map(t=>t.trim()).filter(Boolean): [], repoUrl: repoUrl || undefined, demoUrl: demoUrl || undefined })
    })
    setSaving(false)
    if (!res.ok) setError(await res.text())
    else location.assign("/admin/content/projects")
  }

  async function onDelete() {
    if (!confirm("Delete this project?")) return
    const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
    if (!res.ok) alert("Delete failed")
    else location.assign("/admin/content/projects")
  }

  return (
    <form onSubmit={onSave} className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div>
        <label className="block text-sm">Status</label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2">
          <option value="active">active</option>
          <option value="paused">paused</option>
          <option value="completed">completed</option>
        </select>
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

