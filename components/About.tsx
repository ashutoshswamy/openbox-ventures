import { ScrollReveal, StaggerChild, StaggerGroup } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { StatCounter } from "./StatCounter";
import { stats } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <ScrollReveal>
        <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Who We Are</p>
      </ScrollReveal>

      <ScrollHeadline className="mt-6 max-w-3xl font-display text-display-lg leading-tight">
        A media, content, and strategy company, built on one idea: precision doesn&apos;t change
        with the discipline.
      </ScrollHeadline>

      <ScrollReveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-body-lg text-paper/70">
          Open Box Ventures LLP runs experiential media production, brand content, and public
          strategy on the same operating principles: rigorous planning, accountable execution,
          and a single point of contact from first brief to final delivery.
        </p>
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
    </section>
  );
}
