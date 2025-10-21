# Naveen Ganta — Personal Website

## Overview
- Personal site with three sections: Thoughts (Posts + Articles), Geeks (active projects), Hacks (hackathon projects).
- Single-owner CMS: you log in to create, edit, and publish posts/articles/projects.
- Minimal, fast UI with light/dark modes, SEO-friendly pages, and dynamic OG images.
- Built-in analytics dashboard in the admin to track views, referrers, top content, and chat usage.
- Chatbot digital twin that guides visitors contextually and answers questions.

## How It’s Built
- App architecture: Next.js App Router with a clean split between server components (data fetching) and client components (interactions). Public pages use SSG/ISR for speed; admin and chat use SSR/Edge.
- Data + types: MongoDB Atlas with Prisma for a typed, ergonomic data client. Zod validates all API inputs.
- Auth: Auth.js Credentials (email + password) for a single admin user. Passwords hashed with bcrypt; strict role checks on all write endpoints. Optional upgrade paths: passkeys (WebAuthn), TOTP 2FA, or GitHub OAuth as a backup.
- Content model:
  - Posts (short-form), Articles (long-form MDX), Projects (Geeks), Hacks (events), plus EmbedChunk for RAG and AnalyticsEvent for in-house analytics.
- APIs: Route Handlers in `app/api/*` for CRUD (admin-only), uploads, chat, and analytics ingestion. Middleware enforces auth and security headers.
- Media: Cloudinary for image/file storage; upload presets and signed uploads for admin panel.
- Chatbot: Provider-agnostic adapter (OpenAI by default). Page-aware context + RAG using MongoDB Vector Search over embedded content chunks. Streaming responses for a snappy chat UI.
- Analytics: In-house pipeline. Client pings `POST /api/analytics` for views/interactions; stored in MongoDB and graphed in the admin dashboard.
- UI/UX: Tailwind + shadcn/ui for accessible, minimal components; `next-themes` for dark/light; code highlighting for articles; infinite scroll for posts; tags and search.
- Deployment: Vercel for hosting, previews, edge runtime; MongoDB Atlas for database; Cloudinary for assets. Environment-driven configuration for secrets and model/provider selection.

## What We Use
- Framework
  - Next.js (App Router, SSR/SSG/ISR, Route Handlers)
  - TypeScript for type safety end-to-end
- Styling & UI
  - Tailwind CSS for utility-first styling
  - shadcn/ui + Radix primitives for accessible components
  - next-themes for dark/light mode
- Data & Validation
  - Prisma as the typed client for MongoDB Atlas
  - Zod for API input validation
- Auth & Security
  - Auth.js Credentials provider (email + password)
  - bcrypt for password hashing
  - Middleware for role checks, CSRF-safe patterns, secure cookies
- Media & Assets
  - Cloudinary for image/file storage and transformations
  - next/image for optimized delivery
- Chat & AI
  - OpenAI as the default chat/embeddings provider (swappable adapter)
  - MongoDB Vector Search for RAG over site content
- Analytics
  - Custom `AnalyticsEvent` collection for views, referrers, clicks, chat events
  - Simple charts in admin (time series, top content, routes, referrers)
- Tooling & Deploy
  - Vercel for hosting + previews
  - ESLint/Prettier, pnpm, and CI for typecheck/lint/build
  - Env config via `.env` with keys for DB, auth, OpenAI, Cloudinary

