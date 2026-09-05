"use client";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";

/**
 * Wraps page content. The landing page ("/") is a full-bleed 100vh hero, so it
 * gets no top padding and no footer. Every other page scrolls over the video
 * and needs top padding to clear the floating nav pill.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <main className="relative z-0">{children}</main>;
  }

  return (
    <main className="relative z-0 min-h-screen pt-24 md:pt-28 pb-16">
      {children}
      <Footer />
    </main>
  );
}
