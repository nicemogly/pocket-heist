# Spec for Auth State Management

branch: claude/feature/auth-state-management

## Summary

Add a global auth state listener that tracks the currently signed-in Firebase user and exposes it via a `useUser` hook. Any page or component can call `useUser()` to get the current user object (or `null` if logged out) without prop drilling or duplicate listeners.

## Functional Requirements

- A single Firebase `onAuthStateChanged` listener runs for the lifetime of the app
- The listener stores the current user in a React context so all components share the same state
- A `useUser()` hook returns the current user object (`User | null`)
- The hook is available in any Client Component without additional setup
- Auth state updates in real time — logging in or out updates every consumer immediately
- The provider handles the initial loading state before Firebase resolves the first auth check

## Possible Edge Cases

- Hook called outside of the provider — should throw a clear error
- Component mounts before Firebase resolves initial auth state — should expose a loading flag
- User object may change (e.g. email verification, token refresh) — listener should always reflect latest value

## Acceptance Criteria

- `useUser()` returns `null` when no user is logged in
- `useUser()` returns the Firebase `User` object when a user is logged in
- Logging in on `/login` causes `useUser()` consumers to update without a page reload
- Logging out causes `useUser()` to return `null` in all consumers
- The Navbar (or any component) can call `useUser()` to conditionally render user-specific UI
- No duplicate `onAuthStateChanged` listeners are registered

## Open Questions

- Should `useUser()` also expose an `isLoading` boolean for the initial auth check? yes
- Should the context live in a dedicated `providers/` directory or in `lib/`? providers/
- Are there any pages that should redirect automatically based on auth state (e.g. `/heists` redirecting to `/login` if  logged out)? /heists

## Testing Guidelines

Create a test file in `./tests` for the new feature. Cover the following cases without going too heavy:

- `useUser()` returns `null` when no user is in context
- `useUser()` returns the user object when one is provided via the context
- Calling `useUser()` outside the provider throws an error
- Auth state change from null → user updates the hook value
- Auth state change from user → null updates the hook value
