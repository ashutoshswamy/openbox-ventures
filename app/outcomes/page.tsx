import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { StaggerChild, StaggerGroup } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { StatCounter } from "@/components/StatCounter";
import { achievements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Outcomes",
  description: "Achievements from Open Box Ventures engagements.",
};

export default function OutcomesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outcomes"
        title="The work, and what it added up to."
        intro="What we've built since 2023."
      />

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <ScrollHeadline className="font-display text-display-lg leading-tight">Achievements</ScrollHeadline>
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2">
          {achievements.map((a) => (
            <StaggerChild key={a.label}>
              <div className="font-display text-display-lg text-paper">
                <StatCounter value={a.value} suffix={a.suffix} />
              </div>
              <p className="mt-2 text-body-sm text-paper/60">{a.label}</p>
            </StaggerChild>
          ))}
        </StaggerGroup>
      </section>


      <CTA headline="Add your project to this list." />
    </>
  );
}
