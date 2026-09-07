import Link from "next/link";
import { ScrollReveal, StaggerChild, StaggerGroup } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { StatCounter } from "./StatCounter";
import { achievements } from "@/lib/data";

export function OutcomesTeaser() {
  return (
    <section className="border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Outcomes</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-2xl font-display text-display-lg leading-tight">
          The work, and what it added up to.
        </ScrollHeadline>

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

        <ScrollReveal delay={0.1}>
          <Link
            href="/outcomes"
            className="mt-12 inline-flex items-center gap-2 font-mono text-utility-base uppercase tracking-[0.15em] text-paper/70 transition-colors hover:text-paper"
          >
            See client feedback and results →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
