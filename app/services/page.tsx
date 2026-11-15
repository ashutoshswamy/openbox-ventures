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
      <ServicesBento />

      <CTA />
    </>
  );
}
