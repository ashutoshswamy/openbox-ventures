"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

/** Reveals a card grid's direct children with ScrollTrigger.batch() — one trigger for the whole grid, not one per card. */
export function useCardGridReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(ref.current.children);

      withReducedMotion(
        () => {
          gsap.set(cards, { opacity: 0, y: 28 });
          const batch = ScrollTrigger.batch(cards, {
            start: "top 88%",
            once: true,
            onEnter: (batchTargets) =>
              gsap.to(batchTargets, {
                opacity: 1,
                y: 0,
                duration: DUR.base,
                ease: EASE.smooth,
                stagger: 0.08,
                overwrite: true,
              }),
          });
          return () => batch.forEach((st) => st.kill());
        },
        () => {
          gsap.set(cards, { opacity: 1, y: 0 });
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
