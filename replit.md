# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **`artifacts/nitivaani`** — "Nitivaani" landing page (React + Vite, Tailwind, Framer Motion, wouter). EN/HI bilingual, navy + saffron + emerald palette. Brand assets in `artifacts/nitivaani/public/`. Header consumes `useAuth()` to show Login or signed-in profile + Sign Out.
- **`artifacts/api-server`** — Express 5 API. Mounted under `/api`. Wired with `cors({ credentials: true, origin: true })`, `cookieParser`, and `authMiddleware` before the router. Routes: `health`, `auth`.
- **`artifacts/mockup-sandbox`** — Canvas mockup preview (not used by Nitivaani).

## Authentication

- **Provider**: Replit Auth (OIDC) via `openid-client`. Provider name is internal — UI never says "Replit".
- **Backend**: `artifacts/api-server/src/lib/auth.ts`, `middlewares/authMiddleware.ts`, `routes/auth.ts` (copied from the `replit-auth` skill template).
- **Frontend hook**: `@workspace/replit-auth-web` exports `useAuth()` → `{ user, isAuthenticated, isLoading, login(), logout() }`. Used in `artifacts/nitivaani/src/pages/home.tsx` header (desktop + mobile menu).
- **DB tables**: `sessions` and `users` in `lib/db/src/schema/auth.ts`. Pushed via `pnpm --filter @workspace/db run push`.
- **OpenAPI**: auth endpoints declared in `lib/api-spec/openapi.yaml` for type generation only — do NOT use the generated client for auth calls; use `useAuth()` instead.
