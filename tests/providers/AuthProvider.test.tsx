import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthProvider, useUser } from "@/providers";

vi.mock("@/lib/firebase", () => ({ auth: {} }));

type AuthCallback = (user: object | null) => void;
let capturedCallback: AuthCallback | null = null;

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_auth: unknown, cb: AuthCallback) => {
    capturedCallback = cb;
    return () => {
      capturedCallback = null;
    };
  },
}));

function TestConsumer() {
  const { user, isLoading } = useUser();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="user">{user ? "logged-in" : "null"}</span>
    </div>
  );
}

beforeEach(() => {
  capturedCallback = null;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("AuthProvider / useUser", () => {
  it("returns null user and isLoading=false after auth resolves with no user", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await act(async () => capturedCallback?.(null));
    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("loading").textContent).toBe("false");
  });

  it("returns user object when auth resolves with a user", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await act(async () => capturedCallback?.({ uid: "abc123" }));
    expect(screen.getByTestId("user").textContent).toBe("logged-in");
    expect(screen.getByTestId("loading").textContent).toBe("false");
  });

  it("throws when useUser is called outside AuthProvider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useUser must be used within AuthProvider",
    );
    consoleError.mockRestore();
  });

  it("updates from null to user when auth state changes", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await act(async () => capturedCallback?.(null));
    expect(screen.getByTestId("user").textContent).toBe("null");
    await act(async () => capturedCallback?.({ uid: "abc123" }));
    expect(screen.getByTestId("user").textContent).toBe("logged-in");
  });

  it("updates from user to null when auth state changes", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await act(async () => capturedCallback?.({ uid: "abc123" }));
    expect(screen.getByTestId("user").textContent).toBe("logged-in");
    await act(async () => capturedCallback?.(null));
    expect(screen.getByTestId("user").textContent).toBe("null");
  });
});
