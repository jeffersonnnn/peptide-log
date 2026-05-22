import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { OfflineIndicator } from "@/components/layout/offline-indicator";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PeptideLog - Reconstitution Calculator & Cycle Tracker",
  description:
    "Free peptide reconstitution calculator with visual syringe guide. Track your cycle, log side effects, and see how your experience compares to the community.",
  metadataBase: new URL("https://peptidelog.app"),
  openGraph: {
    title: "PeptideLog",
    description:
      "Free peptide reconstitution calculator with visual syringe guide.",
    url: "https://peptidelog.app",
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
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("peptidelog_theme");if(t==="dark"){document.documentElement.classList.add("dark")}else if(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased min-h-screen bg-molecule-grid`}
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <Providers>
          <OfflineIndicator />
          <main className="pb-20 md:pb-0 md:pt-12">
            {children}
            <Footer />
          </main>
          <SiteNav />
        </Providers>
      </body>
    </html>
  );
}
