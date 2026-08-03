"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { ServiceCard } from "./ServiceCard";
import { servicePillars } from "@/lib/data";
import { Clapperboard, Sparkles, Target } from "lucide-react";
import { useCardGridReveal } from "@/lib/useCardGridReveal";

const icons = [
  <Clapperboard key="stage" className="h-full w-full" strokeWidth={1.4} />,
  <Sparkles key="spark" className="h-full w-full" strokeWidth={1.4} />,
  <Target key="strategy" className="h-full w-full" strokeWidth={1.4} />,
];

export function ServicesSection() {
  const gridRef = useCardGridReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-paper) 0%, transparent 70%)", opacity: 0.06 }}
      />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">What We Do</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-2xl font-display text-display-lg leading-tight">
          Media, Content & Strategy
        </ScrollHeadline>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-xl text-body-lg text-paper/70">
            Three disciplines, one accountable team — from large-format shows to brand
            campaigns to public-facing strategy.
          </p>
        </ScrollReveal>

        <div ref={gridRef} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((s, i) => (
            <ServiceCard key={s.title} icon={icons[i]} title={s.title} summary={s.summary} details={s.details} />
          ))}
        </div>
      </div>
    </section>
  );
}
