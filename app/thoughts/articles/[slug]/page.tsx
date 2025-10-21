import { notFound } from "next/navigation"

type Props = { params: { slug: string } }

export default function ArticlePage({ params }: Props) {
  const { slug } = params
  if (!slug) return notFound()
  return (
    <article className="prose dark:prose-invert">
      <h1 className="mb-2">{slug.replace(/-/g, " ")}</h1>
      <p className="text-muted-foreground">This is a placeholder for the article content.</p>
      <hr />
      <p>
        In the real app, this will render MDX from the database, including code blocks,
        images from Cloudinary, and a generated ToC.
      </p>
    </article>
  )
}

