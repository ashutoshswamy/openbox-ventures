import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { company, offices, services, socials } from "@/lib/data";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
  twitter: { card: "summary_large_image", site: "@openboxventures" },
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
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  logo: `${company.url}/logo.png`,
  description: company.blurb,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phone,
  sameAs: socials.map((s) => s.url),
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    addressLocality: o.city,
    addressRegion: o.region,
    addressCountry: o.country,
  })),
  knowsAbout: services.map((s) => s.name),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
