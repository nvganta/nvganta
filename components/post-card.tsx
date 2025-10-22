"use client"
import { useState } from "react"

type Post = {
  id: string
  text: string
  linkUrl?: string | null
  likes: number
  timeAgo: string
  comments: Array<{
    id: string
    name: string | null
    text: string
    createdAt: Date
  }>
}

export function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [hasLiked, setHasLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [commentText, setCommentText] = useState("")
  const [commentName, setCommentName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLike() {
    if (hasLiked) return

    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
      })
      if (res.ok) {
        setLikes(likes + 1)
        setHasLiked(true)
      }
    } catch (error) {
      console.error("Failed to like post:", error)
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/posts/${post.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: commentText,
          name: isAnonymous ? null : commentName || null,
        }),
      })

      if (res.ok) {
        const newComment = await res.json()
        setComments([newComment, ...comments])
        setCommentText("")
        setCommentName("")
        // Auto-collapse comment section after a brief delay so user sees their comment
        setTimeout(() => {
          setShowComments(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to post comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleShare() {
    const shareUrl = `${window.location.origin}/thoughts/posts`
    const shareText = post.text.substring(0, 100) + "..."

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post",
          text: shareText,
          url: shareUrl,
        })
        .catch((err) => console.log("Error sharing:", err))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <article className="rounded-xl border border-border bg-card p-6 transition-all duration-300">
      {/* Post Content */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{post.timeAgo}</span>
        </div>
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {post.text}
        </p>
        {post.linkUrl && (
          <div className="mt-4 pt-4 border-t border-border">
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 transition-colors ${
              hasLiked
                ? "text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={hasLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            <span>{comments.length}</span>
          </button>
        </div>

        {/* Share button on the right with modern iOS-style icon */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          title="Share post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          {/* Comment Form */}
          <form onSubmit={handleComment} className="space-y-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full rounded-md border bg-transparent p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded"
                  />
                  Post anonymously
                </label>
                {!isAnonymous && (
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="flex-1 rounded-md border bg-transparent px-3 py-1.5 text-sm"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Comment"}
              </button>
            </div>
          </form>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-3 mt-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg bg-muted/50 p-3 text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {comment.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}
