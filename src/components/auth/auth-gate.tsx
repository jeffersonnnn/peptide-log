"use client";
import { useAuth } from "@/hooks/use-auth";

interface AuthGateProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  /** compact = slim inline prompt for thin areas; default = centered card. */
  compact?: boolean;
  /** overlay=true (default) blurs children behind the prompt; false replaces them with the prompt. */
  overlay?: boolean;
  className?: string;
}

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

/**
 * Soft auth gate. Shows the children as a blurred, non-interactive preview
 * with a "sign in to unlock" prompt on top. Once the Privy session is ready
 * and authenticated, the real children render normally.
 */
export function AuthGate({ children, title = "Sign in to unlock this", description, compact, overlay = true, className }: AuthGateProps) {
  const { isAuthenticated, ready, login } = useAuth();

  if (isAuthenticated) {
    return <div className={className}>{children}</div>;
  }

  const prompt = compact ? (
    <div className="panel-glass flex items-center gap-3 px-4 py-2.5">
      <span className="shrink-0 text-[var(--accent)]">
        <LockIcon size={15} />
      </span>
      <p className="min-w-0 flex-1 text-xs text-[var(--text-secondary)] leading-snug">
        <span className="font-semibold text-[var(--text)]">{title}</span>
        {description ? <span className="text-[var(--text-dim)]"> — {description}</span> : null}
      </p>
      <button
        onClick={login}
        className="btn-primary !py-2 !px-3.5 text-xs shrink-0"
              >Sign in</button>
    </div>
  ) : (
    <div className="panel-glass px-6 py-5 text-center max-w-xs mx-auto">
      <div className="mx-auto mb-3 w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
        <LockIcon size={18} />
      </div>
      <p className="text-sm font-semibold text-[var(--text)]">{title}</p>
      {description && (
        <p className="text-[var(--text-dim)] text-xs mt-1.5 leading-relaxed">{description}</p>
      )}
      <button
        onClick={login}
        className="btn-primary mt-4 !py-2.5 !px-4 text-sm"
              >
        Sign in with email or wallet
      </button>
    </div>
  );

  // Replace mode: show only the prompt (no blurred preview). Used for thin
  // actions like a share button. Hidden until Privy is ready to avoid a flash.
  if (!overlay) {
    return <div className={className}>{ready ? prompt : null}</div>;
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="pointer-events-none select-none blur-[6px] opacity-50" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* While Privy is still initializing, hide the prompt so authed users
            don't flash the gate; the blurred preview stays as a placeholder. */}
        <div className={ready ? "" : "opacity-0"}>{prompt}</div>
      </div>
    </div>
  );
}
