"use client"
import { useState } from "react"

export default function NewArticleForm() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, summary, body, tags: tags? tags.split(",").map(t=>t.trim()).filter(Boolean): [], published }),
    })
    setLoading(false)
    if (!res.ok) setError(await res.text())
    else location.reload()
  }

  return (
    <form onSubmit={onCreate} className="space-y-3 rounded-lg border p-4">
      <div className="font-medium">New Article</div>
      <div>
        <label className="block text-sm">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
      </div>
      <div>
        <label className="block text-sm">Summary</label>
        <input value={summary} onChange={(e)=>setSummary(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div>
        <label className="block text-sm">Body (MDX)</label>
        <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows={6} className="mt-1 w-full rounded-md border bg-transparent p-2" required />
      </div>
      <div>
        <label className="block text-sm">Tags</label>
        <input value={tags} onChange={(e)=>setTags(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} /> Published
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Creating…" : "Create Article"}</button>
    </form>
  )
}

