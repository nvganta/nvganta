"use client"
import { useState } from "react"

export default function NewPostForm() {
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, tags: tags ? tags.split(",").map((t)=>t.trim()).filter(Boolean) : [] }),
    })
    setLoading(false)
    if (!res.ok) {
      const msg = await res.text()
      setError(msg)
    } else {
      setText("")
      setTags("")
      location.reload()
    }
  }

  return (
    <form onSubmit={onCreate} className="space-y-3 rounded-lg border p-4">
      <div className="font-medium">New Post</div>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={3}
        className="w-full rounded-md border bg-transparent p-2" placeholder="What's on your mind?" required />
      <div>
        <label className="block text-sm">Tags (comma separated)</label>
        <input value={tags} onChange={(e)=>setTags(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Creating…" : "Create Post"}</button>
    </form>
  )
}

