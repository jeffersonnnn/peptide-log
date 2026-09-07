"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SignInButton } from "@/components/auth/sign-in-button";

const tabs = [
  { href: "/", label: "Home", match: "exact" as const },
  { href: "/calculator", label: "Calculator", match: "prefix" as const },
  { href: "/learn", label: "Learn", match: "prefix" as const },
  { href: "/peptides", label: "Peptides", match: "prefix" as const },
  { href: "/tracker", label: "Cycle log", match: "prefix" as const },
];

function isTabActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
    </svg>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 text-white">
      <Logo />
      <span className="font-medium tracking-tight text-[15px]">PeptideLog</span>
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-[background-color,border-color,padding] duration-300 ${
          scrolled
            ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        {scrolled && <ScrollProgress />}
        <div className="flex items-center justify-between px-5 sm:px-8 md:px-10">
          <Brand />

          <div className="hidden md:flex liquid-glass rounded-full p-1">
            {tabs.map((tab) => {
              const active = isTabActive(pathname, tab.href, tab.match);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    active ? "text-[#0A0A0B] bg-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <SignInButton size="sm" label="Sign in" />
            <Link href="/calculator" className="btn-primary !py-2.5 !px-4 text-sm">
              Open calculator
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center text-white z-50 relative"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`absolute transition-all duration-300 ${menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </span>
            <span className={`absolute transition-all duration-300 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl transition-opacity duration-300 ease-out ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-end px-6 pb-12 gap-2 transition-transform duration-300 ease-out ${
            menuOpen ? "translate-y-0" : "translate-y-6"
          }`}
        >
          {tabs.map((tab, i) => {
            const active = isTabActive(pathname, tab.href, tab.match);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-baseline gap-4 py-3 border-b border-[var(--border)] text-3xl tracking-display ${
                  active ? "text-white" : "text-white/60"
                }`}
              >
                <span className="text-xs font-mono text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {tab.label}
              </Link>
            );
          })}
          <p className="mt-6 text-sm text-[var(--text-dim)]">
            Sign in with an email address or a wallet to keep a cycle log and see community data.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <SignInButton label="Sign in" />
            <Link href="/calculator" onClick={() => setMenuOpen(false)} className="btn-primary">
              Open calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
