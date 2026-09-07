import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Open Box Ventures — tell us the brief and we'll come back with how we'd run it.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Start a project." />
      <ContactSection />
    </>
  );
}
