import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { IndustriesBento } from "@/components/IndustriesBento";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "What each of Open Box Ventures' service lines delivers: logistics & supply chain, marketing & branding, event management, IT & digital, e-commerce development, content creation, photography & videography, and advertising.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col pt-28 md:pt-32">
        <IndustriesBento />
      </section>

      <CTA headline="Don't see your industry?" body="Tell us what you're building. The disciplines flex to fit the brief, not the other way around." />
    </>
  );
}
