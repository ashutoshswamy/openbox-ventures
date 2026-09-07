import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring us the brief. Tell us what you're trying to do and we'll come back with how we'd do it.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        intro="One team for logistics, marketing, events, technology, and content. Tell us where you want help."
      />
      <ContactSection />
    </>
  );
}
