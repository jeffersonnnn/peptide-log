import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/site-nav";
import { Providers } from "@/components/providers";
import { OfflineIndicator } from "@/components/layout/offline-indicator";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PeptideLog - Reconstitution Calculator & Cycle Tracker",
  description:
    "Free peptide reconstitution calculator with visual syringe guide. Track your cycle, log side effects, and see how your experience compares to the community.",
  metadataBase: new URL("https://peptidelog.lifestyle"),
  openGraph: {
    title: "PeptideLog",
    description:
      "Free peptide reconstitution calculator with visual syringe guide.",
    url: "https://peptidelog.lifestyle",
    siteName: "PeptideLog",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptideLog",
    description:
      "Free peptide reconstitution calculator with visual syringe guide.",
    images: ["/api/og"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geist.variable} ${mono.variable} font-sans min-h-screen`}>
        <Providers>
          <OfflineIndicator />
          <SiteNav />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
