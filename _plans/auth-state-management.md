# Plan: Auth State Management

## Context

Firebase Auth is already wired up — `lib/firebase.ts` exports `auth`, and login/signup pages call `signInWithEmailAndPassword` / `createUserWithEmailAndPassword`. What's missing is a global listener that tracks the signed-in user and exposes it to any component via a `useUser()` hook.

Spec answers:
- `useUser()` exposes `{ user, isLoading }`
- Context lives in `providers/`
- `/heists` (dashboard layout) redirects to `/login` when logged out

---

## Files to Create

### `providers/AuthProvider.tsx`
- Client component (`"use client"`)
- Creates `AuthContext` with shape `{ user: User | null; isLoading: boolean }`
- Runs a single `onAuthStateChanged(auth, ...)` listener in `useEffect`; unsubscribes on unmount
- Initial state: `{ user: null, isLoading: true }`; `isLoading` flips to `false` after first auth resolution
- Exports `AuthProvider` (the wrapper component) and `useUser()` hook
- `useUser()` throws `Error("useUser must be used within AuthProvider")` if context is undefined

### `providers/index.ts`
- Barrel: `export { AuthProvider, useUser } from "./AuthProvider"`

### `tests/providers/AuthProvider.test.tsx`
Tests (all via `userEvent.setup()` / Testing Library, mock `onAuthStateChanged`):
1. `useUser()` returns `{ user: null, isLoading: false }` when auth resolves with no user
2. `useUser()` returns the user object when auth resolves with a user
3. `useUser()` throws when called outside `<AuthProvider>`
4. Auth state change null → user updates the hook value
5. Auth state change user → null updates the hook value

---

## Files to Modify

### `app/layout.tsx`
- Add `"use client"` — No, keep it a Server Component; wrap `{children}` with `<AuthProvider>` (AuthProvider is itself a Client Component, so it can be imported into a Server Component as a wrapper)
- Import `AuthProvider` from `@/providers`
- Wrap `{children}` inside `<AuthProvider>`

### `app/(dashboard)/layout.tsx`
- Convert to Client Component (`"use client"`)
- Call `useUser()` to get `{ user, isLoading }`
- While `isLoading`: render `null` (or a loading skeleton) to prevent flash
- If `!isLoading && !user`: call `router.replace("/login")` and render `null`
- Otherwise render the normal layout (`<Navbar />` + `<main>`)

---

## Key Implementation Notes

- `onAuthStateChanged` is the only listener — it lives in `AuthProvider`, never duplicated
- `isLoading: true` on first render prevents the dashboard from flashing before Firebase resolves
- Root layout stays a Server Component — `AuthProvider` as a child is fine because Next.js renders Client Components at the leaf
- No changes needed to login/signup pages; they already call Firebase Auth and redirect on success

---

## Verification

```bash
npm test                                              # all tests pass
npx vitest run tests/providers/AuthProvider.test.tsx  # focused run
npm run dev                                           # manual test
```

Manual checks:
- Visit `/heists` while logged out → redirects to `/login`
- Log in → lands on `/heists`, Navbar can read `useUser()` 
- Log out → `useUser()` returns `null` in all consumers immediately
