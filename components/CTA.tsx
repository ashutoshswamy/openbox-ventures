"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";

const btn = "inline-flex h-14 items-center px-9 font-display text-body-base font-semibold transition-colors";

/**
 * Closing call to action in the hero's language: glow, hairline grid, bold + serif-italic headline (last two words).  Sharp-cornered buttons.
 */
export function CTA({
  headline = "One team for the whole brief.",
  body = "Tell us what you're trying to do. We'll tell you how we'd do it.",
}: {
  headline?: string;
  body?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const words = headline.split(" ");
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const split = SplitText.create(q(".cta-line"), { type: "lines,chars", mask: "lines" });
          gsap.set(q(".cta-in"), { opacity: 1 });
          gsap
            .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 65%", once: true } })
            .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.025 })
            .from(q(".cta-fade"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.5");

          return () => {
            split.revert();
          };
        },
        () => {
          gsap.set(q(".cta-in"), { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden border-t border-line bg-ink px-6 py-28 md:px-10 md:py-44">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(34,211,238,0.4),rgba(91,47,176,0.2)_45%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="cta-in font-display text-[clamp(40px,7vw,104px)] font-semibold leading-[1.2]" style={{ opacity: 0 }}>
          {lead && <span className="cta-line block">{lead}</span>}
          <span className="cta-line block">
            <span className="font-serif font-normal italic">{tail}</span>
          </span>
        </h2>
        <p className="cta-fade mt-8 max-w-lg text-balance text-body-lg text-paper/80">{body}</p>
        <div className="cta-fade mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className={`${btn} bg-accent text-ink hover:bg-accent-2`}>
            Start a project
          </Link>
          <Link href="/services" className={`${btn} bg-paper/10 text-paper backdrop-blur hover:bg-paper hover:text-ink`}>
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
