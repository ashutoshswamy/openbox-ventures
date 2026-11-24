"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);
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

type Pt = { x: number; y: number };
/** motionPath config for an orbit-style leg: the midpoint bows away from the centre (straight down when the leg crosses it). */
export function arc(a: Pt, b: Pt) {
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const d = Math.hypot(m.x, m.y);
  const n = d < 1 ? { x: 0, y: 1 } : { x: m.x / d, y: m.y / d };
  return { path: [a, { x: m.x + n.x * len * 0.5, y: m.y + n.y * len * 0.5 }, b], curviness: 1.4, fromCurrent: false };
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
