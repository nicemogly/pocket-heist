# Spec for auth-forms

branch: claude/feature/auth-forms
figma_component (if used) : N/A

## Summary

Add authentication forms to the existing `/login` and `/signup` pages. Each page renders a form with email and password inputs, a toggle to show/hide the password, and a submit button. On submission, form data is logged to the console only (no backend integration yet). A navigation link on each page allows the user to switch to the other form without using the browser back button.

## Functional Requirements

- `/login` page renders a login form with:
  - Email input field (type="email")
  - Password input field (type="password") with a show/hide toggle icon
  - Submit button labelled "Login"
  - Link to `/signup` ("Don't have an account? Sign up")
- `/signup` page renders a signup form with:
  - Email input field (type="email")
  - Password input field (type="password") with a show/hide toggle icon
  - Submit button labelled "Sign Up"
  - Link to `/login` ("Already have an account? Log in")
- Clicking the show/hide icon toggles the password field between `type="password"` and `type="text"`
- On form submission, `console.log` the submitted email and password values; prevent default browser form submission
- No backend calls, validation errors, or loading states are required at this stage

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- User submits form with empty fields — log whatever values are present (no validation required now)
- User toggles password visibility multiple times before submitting
- User navigates between login and signup via the switch link — each page should reset to its own initial state

## Acceptance Criteria

- `/login` and `/signup` each display a form with email field, password field, show/hide icon, and submit button
- Toggling the show/hide icon changes the password field visibility
- Submitting either form logs `{ email, password }` to the browser console
- Each page has a working link that navigates to the other auth page
- Forms fit within the existing `.center-content` / `.page-content` layout without breaking the public layout

## Open Questions

- Should the show/hide icon use a specific icon library (e.g. lucide-react, which is already in the project)? No.
- Should both pages share a single reusable `AuthForm` component, or stay as separate implementations? No.
- Will a "confirm password" field be needed for signup in a future iteration?Yes.

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Login form renders email field, password field, and submit button
- Signup form renders email field, password field, and submit button
- Clicking the show/hide toggle changes the password input type from "password" to "text" and back
- Submitting the login form calls `console.log` with the entered email and password
- Submitting the signup form calls `console.log` with the entered email and password
- The switch link on the login page points to `/signup`
- The switch link on the signup page points to `/login`
