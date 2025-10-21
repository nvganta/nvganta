# Build Phases (Frontend‑First)

> Strategy: ship UI first with mocked data, then wire up auth, APIs, DB, analytics, and chat. Each phase ends with a verifiable deliverable.

## Phase 1 — Scaffold & Design System
- Create Next.js (App Router, TS) project with Tailwind, shadcn/ui, next-themes.
- Global layout: header (Thoughts, Geeks, Hacks), footer, container, typography.
- Minimal design tokens (spacing, radii, colors) with dark/light theme.
- Deliverable: responsive shell with navigation and theme toggle.

## Phase 2 — Thoughts UI (Posts & Articles)
- Posts tab: tweet-like cards, tags, timestamps, media placeholders; infinite scroll with mocked data.
- Articles tab: card/grid list with title, summary, tags, reading time placeholder; article detail page with MDX renderer stub and ToC.
- Deliverable: `/thoughts` with working tabs and navigable article pages using mock content.

## Phase 3 — Geeks & Hacks UI
- Geeks: project cards with status badges, tech chips, repo/demo links (mocked).
- Hacks: grid/timeline of hackathon entries with event, year, role, outcomes (mocked).
- Deliverable: `/geeks` and `/hacks` pages with fully responsive layouts fed by mocks.

## Phase 4 — Navigation, Accessibility, Polish
- Active link states, breadcrumbs where needed, and route-level metadata.
- Keyboard navigation, focus outlines, color contrast checks, reduced motion.
- Deliverable: Lighthouse/Axe pass for core pages; clean transitions and loading states.

## Phase 5 — Data Layer: Prisma + MongoDB
- Configure Prisma for MongoDB Atlas; define models: User, Post, Article, Project, Hack, EmbedChunk, AnalyticsEvent, ChatSession.
- Seed script: create admin user with bcrypt-hashed password.
- Deliverable: connected DB, migrations applied, seed runs locally and on deploy.

## Phase 6 — Auth (Auth.js Credentials)
- Credentials provider (email + password) with secure session cookies, CSRF-safe patterns.
- Role-based guard (`admin`) and middleware to protect `/admin` and write APIs.
- Deliverable: login page, working sessions, protected admin area skeleton.

## Phase 7 — CRUD APIs
- Zod-validated route handlers for Posts, Articles, Projects, Hacks (GET/POST/PATCH/DELETE).
- Pagination, tag filters; server-side errors standardized; input sanitization.
- Deliverable: Postman/Thunder tests or simple scripts confirming endpoints function and enforce auth.

## Phase 8 — Admin Panel
- Dashboard: stats tiles (views, top routes, recent content), recent chat usage.
- Content: lists with filters; create/edit forms; MDX editor + preview for Articles; tag picker.
- Deliverable: you can create, update, publish/unpublish, and delete content from the UI.

## Phase 9 — Media (Cloudinary)
- Signed upload endpoint; image/file picker in admin; transformations for responsive images.
- Replace placeholders on public pages with real Cloudinary assets via `next/image`.
- Deliverable: upload from admin and see optimized media in the UI.

## Phase 10 — In‑House Analytics
- Client SDK to send `view/click/chat` events; server ingestion to `AnalyticsEvent`.
- Admin graphs: time-series by route, referrers, top content, chat statistics.
- Deliverable: dashboard shows real traffic (dev/test) with filters and time ranges.

## Phase 11 — Chatbot (Digital Twin)
- Embedding pipeline for content; MongoDB Vector Search index on `EmbedChunk.embedding`.
- Provider adapter with OpenAI default; `/api/chat` streaming; UI bubble + panel with suggestions.
- Deliverable: page-aware chat responding with RAG context; adjustable model/settings in admin.

## Phase 12 — SEO & Feeds
- Sitemap, robots, canonical URLs; dynamic OG images; RSS for posts/articles.
- Deliverable: SEO checks pass; share cards render correctly.

## Phase 13 — Performance, Testing, QA
- Cache headers, ISR for lists/detail; image optimization; bundle size review.
- Tests: unit for utilities/APIs; smoke E2E for critical flows (login, CRUD, chat).
- Deliverable: green CI (typecheck/lint/build/tests) and good Web Vitals.

## Phase 14 — Deploy & Launch
- Vercel project, env vars (DB, AUTH, OPENAI, CLOUDINARY, APP_URL), domain and DNS.
- Backups for Atlas; minimal runbook; monitoring/logging sanity.
- Deliverable: production deployment at your domain.

## Phase 15 — Post‑Launch Iteration
- Optional: passkeys/2FA, content scheduling, search autosuggest, voice chat, Plausible integration.
- Deliverable: prioritized backlog and cadence for enhancements.

