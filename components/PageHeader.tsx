"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";
import { Backdrop } from "./Backdrop";

/**
 * Sub-page hero in the home hero's language: glow, hairline grid, bold headline whose last line is serif italic.
 * Title with "\n": first line bold, rest italic. Without: the last two words go italic on their own line.
 */
export function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const parts = title.split("\n");
  const words = title.split(" ");
  const lead = parts.length > 1 ? parts[0] : words.slice(0, -2).join(" ");
  const tail = parts.length > 1 ? parts.slice(1).join(" ") : words.slice(-2).join(" ");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const split = SplitText.create(q(".ph-line"), { type: "lines,chars", mask: "lines" });
          gsap.set(q(".ph-in"), { opacity: 1 });
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.025 })
            .from(q(".ph-fade"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.5");
          return () => split.revert();
        },
        () => {
          gsap.set(q(".ph-in"), { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <header ref={root} className="relative overflow-hidden border-b border-line bg-ink px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
      <Backdrop at="0% 100%" />
      <div className="relative mx-auto max-w-7xl">
        <h1 className="ph-in max-w-5xl font-display text-[clamp(40px,7vw,104px)] font-semibold leading-[1.2]" style={{ opacity: 0 }}>
          {lead && <span className="ph-line block">{lead}</span>}
          <span className="ph-line block">
            <span className="font-serif font-normal italic">{tail}</span>
          </span>
        </h1>
        {intro && <p className="ph-fade mt-8 max-w-2xl text-body-lg text-paper/80">{intro}</p>}
        {children && <div className="ph-fade">{children}</div>}
      </div>
    </header>
  );
}
