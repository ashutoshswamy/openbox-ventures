import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { lifeGallery } from "@/lib/data";

export function LifeTeaser() {
  return (
    <section className="border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Life at OBV</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-2xl font-display text-display-lg leading-tight">
          Small teams, direct ownership, and a calendar that isn&apos;t only deadlines.
        </ScrollHeadline>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {lifeGallery.slice(0, 4).map((item) => (
            <div
              key={item.caption}
              className="relative aspect-square overflow-hidden rounded-panel border border-line"
              style={{ background: `linear-gradient(140deg, ${item.accent}44, var(--color-ink))` }}
            >
              <span className="absolute inset-x-0 bottom-0 p-3 text-body-sm text-paper/70">{item.caption}</span>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <Link
            href="/life"
            className="mt-10 inline-flex items-center gap-2 font-mono text-utility-base uppercase tracking-[0.15em] text-paper/70 transition-colors hover:text-paper"
          >
            See life at Open Box Ventures →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
