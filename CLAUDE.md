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

Pages with interactivity (state, event handlers) must be Client Components — add `"use client"` at the top. Pages that are purely presentational can remain Server Components.

**Styling** uses two mechanisms together:
- Tailwind v4 with a custom `@theme` block in `app/globals.css` — theme tokens like `bg-primary`, `text-body`, `border-lighter` are available everywhere. Global utility classes (`.btn`, `.btn-primary`, `.page-content`, `.center-content`, `.form-title`) are also defined there.
- CSS Modules for component/page-scoped styles. Use `@reference "../../globals.css"` (not `@import`) at the top of each module to enable `@apply` with theme tokens without re-emitting styles.

**Path alias:** `@/` resolves to the repo root (configured in `tsconfig.json` and inherited by Vitest via `vite-tsconfig-paths`).

**Testing:** Vitest + Testing Library with `jsdom`. Tests live in `tests/` mirroring the source tree. The setup file (`vitest.setup.ts`) imports `@testing-library/jest-dom/vitest` for DOM matchers. Use `userEvent.setup()` (not `fireEvent`) for interaction tests.

**Components** use barrel exports (`components/Navbar/index.ts`) so imports stay as `@/components/Navbar`.

## Feature workflow

New features follow a spec → plan → implement cycle using custom slash commands:

- `/spec <idea>` — creates a `_specs/<slug>.md` file from a template and switches to a new `claude/feature/<slug>` branch. Requires a clean working tree.
- `/component <description>` — scaffolds a new component using TDD (tests first).
- Plans are saved to `_plans/<slug>.md` before implementation.

The spec template lives at `_specs/template.md`. Completed specs and plans are committed alongside the feature code.

## Hooks

A PostToolUse hook in `.claude/settings.local.json` auto-formats `.ts`/`.tsx` files with Prettier after every Write or Edit. No need to run Prettier manually.

## Checking Documentation

- **important:** When implementing any lib/framework-specific features, ALWAYS check the approrpiate lib/framework documentaion using the Context7 MCP server before writing any code.
