# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:3000)
npm run build     # production build
npm run lint      # ESLint
npm test          # run all tests (Vitest)
npx vitest run tests/components/Navbar.test.tsx  # run a single test file
```

## Architecture

**Next.js 16 App Router** with two route groups that enforce separate layouts:

- `app/(public)/` — unauthenticated routes (`/`, `/login`, `/signup`, `/preview`). Layout wraps children in `<main className="public">` with no Navbar.
- `app/(dashboard)/` — authenticated routes (`/heists`, `/heists/create`, `/heists/[id]`). Layout renders `<Navbar />` above `<main>`.

The root `app/layout.tsx` only provides the HTML shell and global CSS; per-group layouts handle all structural differences.

**Styling** uses two mechanisms together:
- Tailwind v4 utility classes applied via `@apply` in `app/globals.css` (shared layout classes like `.page-content`, `.center-content`)
- CSS Modules for component-scoped styles (e.g. `Navbar.module.css`)

**Path alias:** `@/` resolves to the repo root (configured in `tsconfig.json` and inherited by Vitest via `vite-tsconfig-paths`).

**Testing:** Vitest + Testing Library with `jsdom`. Tests live in `tests/` mirroring the source tree. The setup file (`vitest.setup.ts`) imports `@testing-library/jest-dom/vitest` for DOM matchers.

**Components** use barrel exports (`components/Navbar/index.ts`) so imports stay as `@/components/Navbar`.
