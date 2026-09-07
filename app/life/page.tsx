import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { Gallery } from "@/components/Gallery";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { lifePoints, employeeVoices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Life at OBV",
  description:
    "Office culture, activities, and work environment at Open Box Ventures — real events, small teams, and direct ownership across our offices.",
};

export default function LifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Life at OBV"
        title="Real work. Real ownership. Real celebrations."
        intro="Office culture, activities, and the work environment across our offices — the parts of the job that don't show up in a scope of work."
      />

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
          {lifePoints.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.05} className="border-t border-line pt-6">
              <h3 className="font-display text-display-md leading-tight">{p.title}</h3>
              <p className="mt-2 text-body-sm text-paper/60">{p.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">In the room</ScrollHeadline>
          <ScrollReveal delay={0.05}>
            <p className="mt-6 max-w-xl text-body-lg text-paper/70">
              {/* ponytail: placeholder tiles — swap for real photos and employee clips. */}
              Photos, clips, and moments from across the team.
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">From the team</ScrollHeadline>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {employeeVoices.map((v) => (
              <blockquote key={v.role} className="rounded-2xl border border-line bg-paper/5 p-6">
                <p className="font-display text-display-md leading-snug">“{v.quote}”</p>
                <footer className="mt-4 text-body-sm text-paper/55">
                  {v.name} — {v.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CTA headline="Want in?" body="We hire across logistics, creative, tech, and operations. Tell us where you fit." />
    </>
  );
}
