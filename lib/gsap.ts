"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
}

/**
 * Wraps animation setup in gsap.matchMedia() so pinned/scrubbed/long
 * animations get a short-fade fallback under prefers-reduced-motion,
 * and everything reverts cleanly if the OS setting changes mid-session.
 */
export function withReducedMotion(full: () => void, reduced?: () => void) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", full);
  if (reduced) mm.add("(prefers-reduced-motion: reduce)", reduced);
  return mm;
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
