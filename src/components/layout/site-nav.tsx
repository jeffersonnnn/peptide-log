"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const tabs = [
  { href: "/", label: "Home", match: "exact" as const },
  { href: "/calculator", label: "Calculator", match: "prefix" as const },
  { href: "/learn", label: "Learn", match: "prefix" as const },
  { href: "/peptides", label: "Peptides", match: "prefix" as const },
  { href: "/tracker", label: "Cycle Log", match: "prefix" as const },
];

function isTabActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 256 256" fill="white" aria-hidden className="md:w-8 md:h-8">
      <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19a6 6 0 0111 0" />
    </svg>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Logo />
      <span className="font-semibold tracking-tight text-white text-[15px] md:text-base">
        Peptide<span className="text-white/60">Log</span>
      </span>
    </Link>
  );
}

/** Account control — Privy login / logout. */
function AccountButton({ onNavigate }: { onNavigate?: () => void }) {
  const { isAuthenticated, ready, login, logout, displayName } = useAuth();

  const handle = () => {
    if (isAuthenticated) logout();
    else login();
    onNavigate?.();
  };

  return (
    <button
      onClick={handle}
      title={isAuthenticated ? `${displayName ?? "Account"} — sign out` : "Sign in"}
      className="liquid-glass h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
      aria-label={isAuthenticated ? "Sign out" : "Sign in"}
    >
      {ready && isAuthenticated ? (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] absolute top-2 right-2" />
      ) : null}
      <UserIcon />
    </button>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-12 lg:px-16">
        <Brand />

        {/* Center pill — desktop */}
        <div className="hidden md:flex liquid-glass rounded-full px-2 py-2">
          {tabs.map((tab) => {
            const active = isTabActive(pathname, tab.href, tab.match);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active ? "text-white bg-white/10" : "text-white/70 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Account — desktop */}
        <div className="hidden md:block">
          <AccountButton />
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center text-white z-50 relative"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`absolute transition-all duration-300 ${
              menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </span>
          <span
            className={`absolute transition-all duration-300 ${
              menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </span>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ease-out ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col items-center justify-center gap-8 transition-transform duration-500 ease-out ${
            menuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          {tabs.map((tab) => {
            const active = isTabActive(pathname, tab.href, tab.match);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-medium ${active ? "text-white" : "text-white/70"}`}
              >
                {tab.label}
              </Link>
            );
          })}
          <div className="mt-4 flex flex-col items-center gap-2">
            <AccountButton onNavigate={() => setMenuOpen(false)} />
            <span className="text-sm font-light text-white/60">Account</span>
          </div>
        </div>
      </div>
    </>
  );
}
