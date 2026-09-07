"use client";
import { useAuth } from "@/hooks/use-auth";

interface SignInButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  /** Label while signed out. */
  label?: string;
  className?: string;
}

/**
 * The one sign-in control used across the site. Signed out it opens the
 * Privy login (email or wallet). Signed in it shows who you are and signs out.
 */
export function SignInButton({
  variant = "secondary",
  size = "md",
  label = "Sign in with email or wallet",
  className = "",
}: SignInButtonProps) {
  const { isAuthenticated, ready, login, logout, displayName } = useAuth();
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";
  const sizing = size === "sm" ? "!py-2.5 !px-4 text-sm" : "";

  if (!ready) {
    return (
      <span className={`${base} ${sizing} opacity-60 ${className}`} aria-hidden>
        {label}
      </span>
    );
  }

  if (isAuthenticated) {
    return (
      <button onClick={logout} className={`${base} ${sizing} ${className}`} title="Sign out">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" aria-hidden />
        <span className="truncate max-w-[14ch]">{displayName ?? "Signed in"}</span>
        <span className="text-[var(--text-faint)]">Sign out</span>
      </button>
    );
  }

  return (
    <button onClick={login} className={`${base} ${sizing} ${className}`}>
      {label}
    </button>
  );
}
