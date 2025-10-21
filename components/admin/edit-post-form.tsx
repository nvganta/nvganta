"use client"
import { useState } from "react"

type Post = {
  id: string
  text: string
  tags: string[]
  published: boolean
}

export default function EditPostForm({ post }: { post: Post }) {
  const [text, setText] = useState(post.text)
  const [tags, setTags] = useState(post.tags.join(", "))
  const [published, setPublished] = useState(post.published)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, tags: tags ? tags.split(",").map((t)=>t.trim()).filter(Boolean) : [], published })
    })
    setSaving(false)
    if (!res.ok) setError(await res.text())
    else location.assign("/admin/content/posts")
  }

  async function onDelete() {
    if (!confirm("Delete this post?")) return
    const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" })
    if (!res.ok) alert("Delete failed")
    else location.assign("/admin/content/posts")
  }

  return (
    <form onSubmit={onSave} className="space-y-3">
      <div>
        <label className="block text-sm">Text</label>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div>
        <label className="block text-sm">Tags</label>
        <input value={tags} onChange={(e)=>setTags(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} /> Published
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button disabled={saving} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onDelete} className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700">Delete</button>
      </div>
    </form>
  )
}

