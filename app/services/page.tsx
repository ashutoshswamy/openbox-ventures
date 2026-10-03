import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { ServicesBento } from "@/components/ServicesBento";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service line under one roof: logistics & supply chain, marketing & branding, event management, IT & digital, e-commerce development, content creation, photography & videography, and advertising.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col pt-28 md:pt-32">
        {/* ponytail: bento has no visible headline; sr-only h1 gives crawlers + screen readers one */}
        <h1 className="sr-only">Services by Open Box Ventures LLP</h1>
        <ServicesBento />
      </section>

      <CTA />
    </>
  );
}
