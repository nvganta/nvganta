"use client"
import { useState, useRef } from "react"
import ImageUploader from "./image-uploader"

export default function NewArticleForm() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleImageUploaded(url: string) {
    // Insert markdown image syntax at cursor position
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const imageMarkdown = `![Image](${url})`
    const newBody = body.substring(0, start) + imageMarkdown + body.substring(end)

    setBody(newBody)

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
    }, 0)
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        body,
        tags: tags? tags.split(",").map(t=>t.trim()).filter(Boolean): [],
        heroImage: heroImage || undefined,
        published,
        featured
      }),
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
        <label className="block text-sm">Cover Image URL (optional)</label>
        <div className="mt-1 flex gap-2">
          <input
            value={heroImage}
            onChange={(e)=>setHeroImage(e.target.value)}
            className="flex-1 rounded-md border bg-transparent p-2"
            placeholder="https://..."
          />
          <ImageUploader onImageUploaded={(url) => setHeroImage(url)} buttonText="Upload Cover" />
        </div>
        {heroImage && (
          <div className="mt-2">
            <img src={heroImage} alt="Cover preview" className="h-32 w-full rounded-md object-cover" />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm">Body (MDX)</label>
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border bg-transparent p-2 font-mono text-sm"
          required
          placeholder="Write your article content using Markdown/MDX syntax..."
        />
        <div className="mt-2">
          <ImageUploader onImageUploaded={handleImageUploaded} />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Tip: Click "Upload Image" to insert images at your cursor position
        </p>
      </div>
      <div>
        <label className="block text-sm">Tags</label>
        <input value={tags} onChange={(e)=>setTags(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent p-2" />
      </div>
      <div className="flex gap-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} /> Published
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} /> Featured
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Creating…" : "Create Article"}</button>
    </form>
  )
}

