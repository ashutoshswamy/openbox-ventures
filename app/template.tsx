"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";

let firstLoad = true; // the first paint has the hero intro; the veil is only for client-side navigation

/**
 * Remounts on every navigation (unlike layout.tsx): jumps to the top before paint, then lifts an ink veil
 * with an ember edge to reveal the new page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const veil = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useGSAP(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    withReducedMotion(() => {
      gsap
        .timeline()
        .set(veil.current, { y: 0, yPercent: 0 }) // GSAP reads the inline translateY(-100%) as px
        .to(veil.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut", delay: 0.1 });
    });
  });

  return (
    <>
      {children}
      <div
        ref={veil}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] border-b-4 border-accent bg-ink"
        style={{ transform: "translateY(-100%)" }}
      />
    </>
  );
}
