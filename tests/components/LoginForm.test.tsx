import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/firebase", () => ({ auth: {}, default: {} }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

const mockSignIn = vi.fn();
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: (...args: unknown[]) => mockSignIn(...args),
}));

import LoginPage from "@/app/(public)/login/page";

describe("LoginPage", () => {
  beforeEach(() => {
    mockSignIn.mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the email input", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders the password input", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("toggles the password input type when Show/Hide is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggle = screen.getByRole("button", { name: /show/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggle);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls signInWithEmailAndPassword with email and password on submit", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockSignIn).toHaveBeenCalledWith({}, "user@example.com", "secret");
  });

  it("has a switch link to /signup", () => {
    render(<LoginPage />);
    const link = screen.getByRole("link", { name: /sign up/i });
    expect(link).toHaveAttribute("href", "/signup");
  });
});
