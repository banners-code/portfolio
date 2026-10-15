import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { buildAssistantEntries } from "@/lib/assistant";
import { configuredSiteUrl, metadataBaseUrl, siteConfig } from "@/lib/site-config";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const title = `${siteConfig.brand.name} — ${siteConfig.seo.title}`;
const hasCanonicalUrl = configuredSiteUrl() !== null;

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: { default: title, template: `%s — ${siteConfig.brand.name}` },
  description: siteConfig.brand.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.brand.name,
  authors: siteConfig.owner.name ? [{ name: siteConfig.owner.name }] : undefined,
  // Canonical links are only published once a real domain is configured (NEXT_PUBLIC_SITE_URL).
  alternates: hasCanonicalUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title,
    description: siteConfig.brand.description,
    locale: siteConfig.seo.locale,
    url: hasCanonicalUrl ? "/" : undefined,
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.brand.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#08090d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // The intro script may set data-intro on <html> before React hydrates.
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <div className="site-backdrop" aria-hidden="true" />
        <Navbar />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <AssistantWidget
          entries={buildAssistantEntries()}
          avatar={siteConfig.owner.photo?.src ?? null}
          title={siteConfig.brand.name}
        />
        <RevealObserver />
      </body>
    </html>
  );
}
