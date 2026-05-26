import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/firebase", () => ({ auth: {}, default: {} }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

const mockCreateUser = vi.fn();
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: (...args: unknown[]) =>
    mockCreateUser(...args),
}));

import SignupPage from "@/app/(public)/signup/page";

describe("SignupPage", () => {
  beforeEach(() => {
    mockCreateUser.mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the email input", () => {
    render(<SignupPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders the password input", () => {
    render(<SignupPage />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<SignupPage />);
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it("toggles the password input type when Show/Hide is clicked", async () => {
    const user = userEvent.setup();
    render(<SignupPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggle = screen.getByRole("button", { name: /show/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggle);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls createUserWithEmailAndPassword with email and password on submit", async () => {
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText(/email/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/password/i), "hunter2");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockCreateUser).toHaveBeenCalledWith(
      {},
      "newuser@example.com",
      "hunter2",
    );
  });

  it("has a switch link to /login", () => {
    render(<SignupPage />);
    const link = screen.getByRole("link", { name: /log in/i });
    expect(link).toHaveAttribute("href", "/login");
  });
});
