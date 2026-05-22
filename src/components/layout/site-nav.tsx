"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const tabs = [
  {
    href: "/",
    label: "Calculator",
    mobileLabel: "Calc",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M12 2l-3 6h6l-3-6zM8 14h8M6 18h12" />
      </svg>
    ),
  },
  {
    href: "/tracker",
    label: "Cycle Log",
    mobileLabel: "Log",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    href: "/compare",
    label: "Am I Normal?",
    mobileLabel: "Compare",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: "/guide",
    label: "Guide",
    mobileLabel: "Guide",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="9" y1="7" x2="16" y2="7" />
        <line x1="9" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
];

function AuthButton() {
  const { isAuthenticated, ready, login, logout, displayName } = useAuth();

  if (!ready) return null;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-[var(--text-dim)] max-w-[120px] truncate">
          {displayName}
        </span>
        <button
          onClick={logout}
          className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors"
          style={{ backgroundColor: "var(--accent-faint)", border: "1px solid var(--border)" }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-white transition-all hover:opacity-90 active:scale-95"
      style={{ background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))" }}
    >
      Connect
    </button>
  );
}

function MobileAuthButton() {
  const { isAuthenticated, ready, login, logout } = useAuth();

  if (!ready) return null;

  if (isAuthenticated) {
    return (
      <button
        onClick={logout}
        className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[var(--accent)] transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span className="text-[10px] font-medium">Out</span>
      </button>
    );
  }

  return (
    <button
      onClick={login}
      className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[var(--accent)] transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span className="text-[10px] font-medium">Login</span>
    </button>
  );
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl border-b" style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight">
                <span className="text-[var(--accent)]">Peptide</span>
                <span className="text-[var(--text)]">Log</span>
              </span>
            </Link>
            <div className="flex items-center gap-1">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      isActive
                        ? "text-[var(--accent)] bg-[var(--accent)]/10"
                        : "text-[var(--text-dim)] hover:text-[var(--text-secondary)] hover:bg-[var(--accent-faint)]"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
              <div className="ml-3 pl-3 border-l flex items-center gap-1" style={{ borderColor: "var(--border)" }}>
                <ThemeToggle />
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl border-t safe-bottom" style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-0 w-8 h-0.5 bg-[var(--accent)] rounded-full" />
                  )}
                  {tab.icon}
                  <span className="text-[10px] font-medium">{tab.mobileLabel}</span>
                </Link>
              );
            })}
            <MobileAuthButton />
          </div>
        </div>
      </nav>
    </>
  );
}
