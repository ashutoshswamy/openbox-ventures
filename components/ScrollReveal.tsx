"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

// Elements start hidden inline (no flash before hydration); layout.tsx's <noscript> rule un-hides them without JS.

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      withReducedMotion(
        () => {
          gsap.fromTo(
            el,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: DUR.slow,
              delay,
              ease: EASE.smooth,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        },
        () => {
          gsap.set(el, { opacity: 1 });
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-stagger]", el);
      withReducedMotion(
        () => {
          gsap.fromTo(
            items,
            { opacity: 0, y: 50, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DUR.slow,
              ease: EASE.smooth,
              stagger,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        },
        () => {
          gsap.set(items, { opacity: 1 });
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerChild({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-stagger className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
