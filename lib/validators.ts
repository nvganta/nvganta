import { z } from "zod"

export const uuid = z.string().min(1)

export const PostCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  text: z.string().min(1),
  tags: z.array(z.string()).optional().default([]),
  media: z.array(z.string()).optional().default([]),
  linkUrl: z.string().url().optional(),
  published: z.boolean().optional().default(true),
})

export const PostUpdateSchema = PostCreateSchema.partial()

export const ArticleCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  summary: z.string().optional(),
  body: z.string().min(1), // MDX serialized string for now
  tags: z.array(z.string()).optional().default([]),
  heroImage: z.string().url().optional(),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().datetime().optional(),
})

export const ArticleUpdateSchema = ArticleCreateSchema.partial()

export const ProjectCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
  status: z.enum(["active", "paused", "completed"]),
  description: z.string().min(1),
  tech: z.array(z.string()).optional().default([]),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
})

export const ProjectUpdateSchema = ProjectCreateSchema.partial()

export const HackCreateSchema = z.object({
  slug: z.string().min(1).optional(),
  event: z.string().min(1),
  year: z.number().int().min(2000),
  projectName: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()).optional().default([]),
  result: z.string().optional(),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  images: z.array(z.string()).optional().default([]),
})

export const HackUpdateSchema = HackCreateSchema.partial()

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

