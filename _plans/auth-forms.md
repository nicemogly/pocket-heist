# Plan: Authentication Forms for Login and Signup

## Context
The `/login` and `/signup` pages are currently empty placeholders. This plan adds working auth forms to both pages — email + password fields, a show/hide password toggle, a submit button, and a link to switch between the two forms. Submission logs to console only; no backend integration. Separate implementations per page (no shared component).

---

## Files to Modify

### `app/(public)/login/page.tsx`
- Add `"use client"` directive
- State: `email`, `password` (strings), `showPassword` (boolean)
- Form with `onSubmit` → `e.preventDefault()` + `console.log({ email, password })`
- Email `<input type="email">` with `<label htmlFor>`
- Password `<input>` whose `type` toggles based on `showPassword`
- `<button type="button">` next to password input showing "Show" / "Hide"
- `<button type="submit">` with global classes `btn btn-primary`, label "Log In"
- `<Link href="/signup">` switch link at the bottom
- Fix component name from `SignupPage` → `LoginPage`
- Import CSS Module from `./login.module.css`

### `app/(public)/signup/page.tsx`
- Same structure as login page
- Submit button label: "Sign Up"
- Switch link: `<Link href="/login">` with "Already have an account? Log in"
- Import CSS Module from `./signup.module.css`

---

## Files to Create

### `app/(public)/login/login.module.css`
Uses `@reference "../../globals.css"` for theme tokens.
- `.form` — `flex flex-col gap-4`, constrained width, centered
- `.field` — `flex flex-col gap-1` (label stacked above input)
- `.passwordWrapper` — `flex flex-row items-center gap-2` (input + toggle side by side)
- `.input` — full-width, themed border/background/focus ring using `primary` color
- `.toggleBtn` — minimal, `text-primary`, no background (visually distinct from submit)

### `app/(public)/signup/signup.module.css`
Identical structure and class names to `login.module.css`. Kept separate per spec.

### `tests/components/LoginForm.test.tsx`
- `vi.spyOn(console, "log").mockImplementation(...)` + `vi.restoreAllMocks()` in before/after each
- All interactions via `userEvent.setup()`
- Tests:
  1. Email input is rendered (`getByLabelText(/email/i)`)
  2. Password input is rendered (`getByLabelText(/password/i)`)
  3. Submit button is rendered (`getByRole("button", { name: /log in/i })`)
  4. Toggle changes password type: "password" → "text" → "password"
  5. Submit logs `{ email, password }` to console
  6. Switch link `href` is `/signup`

### `tests/components/SignupForm.test.tsx`
Mirror of LoginForm tests with signup-specific labels and `/login` link assertion.

---

## Key implementation details

- Password toggle button must be `type="button"` to avoid triggering form submission
- `showPassword ? "text" : "password"` on the input `type` prop
- Inputs need `id` + matching `label htmlFor` for `getByLabelText` queries in tests
- `@reference` (not `@import`) in CSS Modules — same pattern as `Avatar.module.css`
- Imports use the `@/` alias: `@/app/(public)/login/page`

---

## Verification

```bash
npm test                          # all Vitest tests should pass
npx vitest run tests/components/LoginForm.test.tsx
npx vitest run tests/components/SignupForm.test.tsx
npm run dev                       # visit /login and /signup in browser
```

Manual checks:
- Type into fields, click Show/Hide, verify password visibility toggles
- Submit form, check browser console for `{ email, password }` log
- Click switch link, verify navigation to the other form
