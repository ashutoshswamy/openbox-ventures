import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { Gallery } from "@/components/Gallery";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { lifePoints, employeeVoices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Life at Open Box Ventures",
  description:
    "Office culture, real-time events, activities, and the work environment at Open Box Ventures — plus what the team says about working here.",
};

export default function LifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Life at OBV"
        title="Real work, real ownership, across every office."
        intro="Events, office culture, activities, and the day-to-day — a look at what it's actually like here."
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
          <ScrollHeadline className="font-display text-display-lg leading-tight">In the office</ScrollHeadline>
          <p className="mt-4 max-w-xl text-body-base text-paper/60">
            {/* ponytail: placeholder tiles until real photos/clips are supplied */}
            Photos and clips from across our offices — standups, shoot days, festivals, and launches.
          </p>
          <div className="mt-10">
            <Gallery />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">From the team</ScrollHeadline>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {employeeVoices.map((v) => (
              <blockquote key={v.quote} className="rounded-2xl border border-line bg-paper/5 p-6">
                <p className="font-display text-display-md leading-snug">“{v.quote}”</p>
                <footer className="mt-4 text-body-sm text-paper/55">
                  {v.name} — {v.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CTA headline="Want to work here?" body="We hire across logistics, creative, technology, and operations. Send us a note." />
    </>
  );
}
