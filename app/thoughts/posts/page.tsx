function MockPost({ i }: { i: number }) {
  return (
    <article className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">Just now · #update</div>
      <p className="mt-2">This is a mock post #{i}. Short, tweet-like content goes here.</p>
    </article>
  )
}

export default function PostsPage() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <MockPost key={i} i={i + 1} />
      ))}
    </div>
  )
}

