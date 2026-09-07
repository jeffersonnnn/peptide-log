"use client";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";

/**
 * Wraps page content. The landing page ("/") starts at the top so its inset
 * hero canvas can sit under the transparent nav. Every other page gets top
 * padding to clear the fixed nav.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <main className={`relative z-0 min-h-screen ${isLanding ? "" : "pt-24 md:pt-28 pb-16"}`}>
      {children}
      <Footer />
    </main>
  );
}
