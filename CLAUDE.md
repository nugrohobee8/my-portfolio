# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version mismatch with training data

This project runs **Next.js 16**, which has real breaking changes vs. Next.js 14/15 that a model's training data usually reflects. Before writing App Router code, check the docs under `node_modules/next/dist/docs/` (especially `01-app/02-guides/upgrading/version-16.md`) — do not assume older conventions. Notable ones already in play in this repo:

- **`middleware.ts` is renamed `proxy.ts`**, and the exported function is named `proxy` (not `middleware`). See [src/proxy.ts](src/proxy.ts). The `edge` runtime is not supported here — proxy always runs on `nodejs`.
- `cookies()`, `headers()`, `params`, and `searchParams` are **async-only** — no synchronous fallback.
- `revalidateTag()` now requires a second `cacheLife` profile argument; `updateTag()` is the read-your-writes alternative for Server Actions.
- Turbopack is the default bundler for both `next dev` and `next build` (no `--turbopack` flag needed).

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build (Turbopack)
npm run start    # run production build
npm run lint     # ESLint (flat config)
```

Prisma (schema at [prisma/schema.prisma](prisma/schema.prisma)):

```bash
npx prisma generate       # regenerate the Prisma Client after schema changes
npx prisma migrate dev    # create/apply a migration in development
npx prisma studio         # browse the database
```

There is no test runner configured in this repo.

## Architecture

**Two route groups, one auth boundary.** `src/app/(public)` holds the portfolio/blog frontend; `src/app/(admin)/admin/*` holds the CMS. Route protection is centralized in [src/proxy.ts](src/proxy.ts): it refreshes the Supabase session and redirects unauthenticated requests away from `/admin/*` (except `/admin/login`). `(admin)/layout.tsx` also fetches the user, but only to display the email in the Topbar — it is *not* a second protection layer.

**Data flow for admin CRUD (articles/projects/skills/experiences) all follow the same pattern** — look at [src/lib/actions/article.ts](src/lib/actions/article.ts) as the reference implementation before adding a new one:
1. Server Action file under `src/lib/actions/*.ts`, marked `'use server'`.
2. Every mutation starts with a `requireAdmin()` call that reads the Supabase session and `redirect('/admin/login')` if absent.
3. Raw `FormData` is hand-mapped to a plain object, then validated with a Zod schema from the matching file in `src/lib/validations/*.ts`.
4. On success: `prisma` write, `revalidatePath()`, then `redirect()`. On failure: return `{ success: false, error: string }` (see the `ActionResult` type) instead of throwing — form components render `error` directly.
5. Slugs are generated from the title via `slugify` when not explicitly provided, and checked for uniqueness against Prisma before writing.

**Two separate Supabase clients** exist for a reason: [src/lib/supabase/server.ts](src/lib/supabase/server.ts) (cookie-based, for Server Components/Actions) vs [src/lib/supabase/client.ts](src/lib/supabase/client.ts) (browser client, e.g. used by [image-upload.tsx](src/components/image-upload.tsx) to upload directly to Supabase Storage from the client and hand back a public URL — uploads don't go through a Server Action).

**Prisma client is a singleton** ([src/lib/prisma.ts](src/lib/prisma.ts)) cached on `globalThis` in development to survive hot reload without exhausting DB connections.

**Admin dashboard** stats are aggregated server-side in [src/lib/dashboard/getStats.ts](src/lib/dashboard/getStats.ts) (`Promise.all` of Prisma counts/queries) and rendered by components in `src/components/admin/` (`AdminShell` owns the responsive sidebar open/close state; `Sidebar`/`Topbar`/`StatCard`/`RecentArticlesTable` are presentational).

**Content is Indonesian**: validation error messages, UI copy, and code comments are written in Indonesian — match that when adding user-facing strings or comments in these areas.

**Styling**: Tailwind v4 via `@tailwindcss/postcss` (no traditional `tailwind.config.js` content-based build step beyond the `content` globs already set). Fonts (Fraunces/Inter/JetBrains Mono) are loaded via `next/font/google` in the root layout and exposed as CSS variables (`--font-serif`, `--font-sans`, `--font-mono`).
