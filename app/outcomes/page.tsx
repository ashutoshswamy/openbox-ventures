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
  description: "Client feedback, testimonials, platform reviews, and what the work added up to.",
};

export default function OutcomesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outcomes"
        title="The work, and what it added up to."
        intro="Client feedback, testimonials, reviews from digital platforms, and the milestones we've hit."
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

      <div className="border-t border-line">
        <Testimonials />
      </div>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">Reviews on digital platforms</ScrollHeadline>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.platform} delay={i * 0.05} className="rounded-2xl border border-line bg-paper/5 p-6">
                <p className="font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/55">{r.platform}</p>
                <p className="mt-3 font-display text-display-lg">{r.rating}</p>
                <p className="mt-2 text-body-sm text-paper/55">{r.note}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
