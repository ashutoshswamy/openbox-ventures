import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Open Box Ventures — Diversified Business Solutions",
    template: "%s — Open Box Ventures",
  },
  description:
    "Open Box Ventures is a diversified business solutions company — logistics, marketing, events, technology, e-commerce, content, photography, and advertising under one roof, across India, the US, Canada, and the UAE.",
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
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
