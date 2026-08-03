"use client";

import { useMarquee } from "@/lib/useMarquee";
import { ScrollReveal } from "./ScrollReveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const { trackRef, pause, resume } = useMarquee();

  return (
    <section className="border-t border-line py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">What Clients Say</p>
        </ScrollReveal>
      </div>

      <div className="mt-12 overflow-hidden" onMouseEnter={pause} onMouseLeave={resume}>
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:px-10">
          {[...testimonials, ...testimonials].map((t, i) => (
            <blockquote
              key={`${t.name}-${i}`}
              className="w-[320px] shrink-0 rounded-2xl border border-line bg-paper/5 p-6 md:w-[400px]"
            >
              <p className="font-display text-display-md leading-snug">“{t.quote}”</p>
              <footer className="mt-4 text-body-sm text-paper/55">
                {t.name} — {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
