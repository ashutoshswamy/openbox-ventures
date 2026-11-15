import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ScrollReveal, StaggerGroup, StaggerChild } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { StatCounter } from "@/components/StatCounter";
import { company, differentiators, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: company.blurb,
};

export default function AboutPage() {
  const [lead, ...rest] = company.about;
  return (
    <>
      <PageHeader title="A diversified business solutions company." intro={company.blurb} />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <ScrollReveal>
            <p className="font-display text-[clamp(26px,3.2vw,44px)] leading-[1.08]">{lead}</p>
          </ScrollReveal>
          <div className="space-y-6">
            {rest.map((p, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 0.06}>
                <p className="text-body-lg text-paper/75">{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <StaggerGroup className="mt-20 grid max-w-xl grid-cols-2 gap-6 sm:gap-10">
          {stats.map((s) => (
            <StaggerChild key={s.label} className="border-t-2 border-accent pt-4">
              <div className="font-display text-[clamp(52px,7vw,96px)] leading-none text-paper">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-body-sm text-paper/60">{s.label}</p>
            </StaggerChild>
          ))}
        </StaggerGroup>
      </section>

      <section className="on-paper px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-[0.98]">How we operate</ScrollHeadline>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 0.05} className="border-t-2 border-ink pt-6">
                <h3 className="font-display text-display-md leading-[1.05]">{d.title}</h3>
                <p className="mt-3 max-w-md text-body-base text-ink/70">{d.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA headline="Work with one team, not twelve." />
    </>
  );
}
