import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { Offices } from "@/components/Offices";
import { company, differentiators } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: company.blurb,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="A diversified business solutions company." intro={company.blurb} />

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 lg:grid-cols-2">
          {company.about.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <p className="text-body-lg text-paper/75">{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-tight">
            Where we work
          </ScrollHeadline>
          <div className="mt-12">
            <Offices />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-tight">
            How we operate
          </ScrollHeadline>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 0.05} className="border-t border-line pt-6">
                <h3 className="font-display text-display-md leading-tight">{d.title}</h3>
                <p className="mt-2 text-body-sm text-paper/60">{d.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA headline="Work with one team, not twelve." />
    </>
  );
}
