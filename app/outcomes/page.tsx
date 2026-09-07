import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { Testimonials } from "@/components/Testimonials";
import { ScrollReveal, StaggerChild, StaggerGroup } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { StatCounter } from "@/components/StatCounter";
import { achievements, reviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Outcomes",
  description: "Client feedback, reviews, and achievements from Open Box Ventures engagements.",
};

export default function OutcomesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outcomes"
        title="The work, and what it added up to."
        intro="Client feedback, reviews on digital platforms, and what we've built since 2023."
      />

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <ScrollHeadline className="font-display text-display-lg leading-tight">Achievements</ScrollHeadline>
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
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

      <Testimonials />

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">Reviews on digital platforms</ScrollHeadline>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {reviews.map((r) => (
              <ScrollReveal key={r.platform} className="rounded-2xl border border-line bg-paper/5 p-6">
                <p className="font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50">{r.platform}</p>
                <p className="mt-3 font-display text-display-lg">{r.rating}</p>
                <p className="mt-2 text-body-sm text-paper/55">{r.note}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA headline="Add your project to this list." />
    </>
  );
}
