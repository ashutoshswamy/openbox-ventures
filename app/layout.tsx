import type { Metadata } from "next";
import { Syne, Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { HideOnHome } from "@/components/HideOnHome";
import { BottomNav } from "@/components/BottomNav";
import { PageTransition } from "@/components/PageTransition";
import { PageFx } from "@/components/PageFx";
import { MotionProvider } from "@/components/MotionProvider";
import { company, offices, services, socials } from "@/lib/data";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Open Box Ventures LLP - Diversified Business Solutions",
    template: "%s - Open Box Ventures LLP",
  },
  description:
    "Open Box Ventures LLP is a diversified business solutions company - logistics, marketing, events, technology, e-commerce, content, photography, and advertising under one roof, across India, the US, Canada, and the UAE.",
  metadataBase: new URL(company.url),
  // "./" resolves against each route's pathname, so every page gets its own canonical/og:url
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    url: "./",
    images: [
      {
        url: "/og-image.png",
        width: 1730,
        height: 909,
        alt: "Open Box Ventures LLP - diversified business solutions: logistics, marketing, events, tech, e-commerce, content, photo, and ads.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@openboxventures",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${company.url}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  logo: `${company.url}/logo.png`,
  description: company.blurb,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: company.email,
    telephone: company.phone,
    availableLanguage: "English",
  },
  sameAs: socials.map((s) => s.url),
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    addressLocality: o.city,
    addressRegion: o.region,
    addressCountry: o.country,
  })),
  knowsAbout: services.map((s) => s.name),
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${company.url}/#website`,
  url: company.url,
  name: company.name,
  inLanguage: "en",
  publisher: { "@id": `${company.url}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${geist.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, siteJsonLd]).replace(/</g, "\\u003c") }}
        />
        {/* headlines start hidden for their reveal; never leave them hidden without scripting */}
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important}`}</style>
        </noscript>
        <MotionProvider>
          <main className="flex-1">{children}</main>
          <HideOnHome>
            <Footer />
          </HideOnHome>
          <BottomNav />
          <PageFx />
          <PageTransition />
        </MotionProvider>
      </body>
    </html>
  );
}
