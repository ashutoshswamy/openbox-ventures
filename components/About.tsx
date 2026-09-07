import Link from "next/link";
import { ScrollReveal, StaggerChild, StaggerGroup } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { StatCounter } from "./StatCounter";
import { stats, company } from "@/lib/data";

export function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <ScrollReveal>
        <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Who We Are</p>
      </ScrollReveal>

      <ScrollHeadline className="mt-6 max-w-3xl font-display text-display-lg leading-tight">
        Businesses shouldn&apos;t need a dozen providers to bring one idea to life.
      </ScrollHeadline>

      <ScrollReveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-body-lg text-paper/70">{company.about[0]}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="mt-4 max-w-2xl text-body-lg text-paper/70">{company.about[1]}</p>
      </ScrollReveal>

      <StaggerGroup className="mt-16 grid grid-cols-3 gap-8 border-t border-line pt-10">
        {stats.map((s) => (
          <StaggerChild key={s.label}>
            <div className="font-display text-display-lg text-paper">
              <StatCounter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-body-sm text-paper/60">{s.label}</p>
          </StaggerChild>
        ))}
      </StaggerGroup>

      <ScrollReveal delay={0.1}>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center gap-2 font-mono text-utility-base uppercase tracking-[0.15em] text-paper/70 transition-colors hover:text-paper"
        >
          More about Open Box Ventures →
        </Link>
      </ScrollReveal>
    </section>
  );
}
