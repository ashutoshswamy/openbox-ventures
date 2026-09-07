"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/lib/data";
import { useCardGridReveal } from "@/lib/useCardGridReveal";

export function ServicesSection() {
  const gridRef = useCardGridReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">What We Do</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-2xl font-display text-display-lg leading-tight">
          Eight service lines, one accountable team.
        </ScrollHeadline>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-xl text-body-lg text-paper/70">
            From logistics and technology to marketing, events, and content — pick the service or
            bring us the whole brief.
          </p>
        </ScrollReveal>

        <div ref={gridRef} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <Link
            href="/services"
            className="mt-10 inline-flex items-center gap-2 font-mono text-utility-base uppercase tracking-[0.15em] text-paper/70 transition-colors hover:text-paper"
          >
            View all services →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
