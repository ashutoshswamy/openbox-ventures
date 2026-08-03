"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

/**
 * One master load timeline scoped over Nav + Hero: the logo settles in,
 * then nav links and hero content stagger in off the same timeline — a
 * single continuous open rather than separate per-component effects. Uses
 * opacity (not autoAlpha) throughout so every element stays clickable
 * while it's still fading in.
 */
export function PageIntro({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      withReducedMotion(
        () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.smooth } });
          tl.from(q("[data-intro='wordmark']"), { opacity: 0, scale: 0.85, duration: DUR.base, ease: EASE.snap })
            .from(q("[data-intro='nav-link']"), { opacity: 0, y: -8, stagger: 0.06, duration: DUR.fast }, "-=0.15")
            .from(q("[data-intro='nav-cta']"), { opacity: 0, duration: DUR.fast }, "<")
            .from(q("[data-intro='hero-headline']"), { opacity: 0, y: 24, duration: DUR.slow }, "-=0.05")
            .from(q("[data-intro='hero-subtext']"), { opacity: 0, y: 16, duration: DUR.base }, "-=0.45")
            .from(q("[data-intro='hero-ctas'] > *"), { opacity: 0, y: 12, stagger: 0.08, duration: DUR.base }, "-=0.3");
          return () => {
            tl.kill();
          };
        },
        () => {
          gsap.from(q("[data-intro]"), { opacity: 0, duration: DUR.fast, stagger: 0.03 });
        },
      );
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
