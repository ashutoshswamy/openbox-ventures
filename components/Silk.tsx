"use client";

import { useEffect, useRef, useState } from "react";
import { SilkGradient } from "./SilkGradient";

type Stop = { color: string; ratio: number };
type Preset = {
  colors: Stop[];
  direction: number;
  scale?: number;
  stretch?: number;
  turbulence?: number;
  softness?: number;
  grain?: number;
  seed?: number;
  speed?: number;
  maxFps?: number;
  maxDpr?: number;
};

// every preset is built from the same arctic ink / teal / glacier family, but each has its own dominant hue and flow
const cheap = { maxFps: 24, maxDpr: 1 } as const; // secondary surfaces: lighter on the GPU

export const SILK = {
  /** hero: ink > plum > burnt orange > ember, flowing diagonally */
  hero: {
    colors: [
      { color: "#0a0814", ratio: 1.3 },
      { color: "#2a1458", ratio: 0.9 },
      { color: "#5b21b6", ratio: 0.9 },
      { color: "#22d3ee", ratio: 0.26 },
      { color: "#e4e6ff", ratio: 0.07 },
    ],
    direction: 20, scale: 1.1, turbulence: 1.1, softness: 0.7, grain: 0.14, speed: 0.7,
  },
  /** plum: violet-led, long slow streaks */
  plum: {
    colors: [
      { color: "#0a0814", ratio: 1.4 },
      { color: "#2a1458", ratio: 1 },
      { color: "#5b21b6", ratio: 0.6 },
      { color: "#22d3ee", ratio: 0.1 },
    ],
    direction: -30, scale: 1.3, stretch: 2.2, turbulence: 0.9, softness: 0.8, grain: 0.12, speed: 0.4, ...cheap,
  },
  /** ember: rust-led, rounder, more turbulent */
  ember: {
    colors: [
      { color: "#0a0814", ratio: 1.2 },
      { color: "#2a2540", ratio: 1 },
      { color: "#5b21b6", ratio: 0.7 },
      { color: "#22d3ee", ratio: 0.22 },
    ],
    direction: 160, scale: 0.9, stretch: 1.2, turbulence: 1.7, softness: 0.6, grain: 0.14, speed: 0.45, ...cheap,
  },
  /** indigo: cool night, flows vertically */
  indigo: {
    colors: [
      { color: "#0a0814", ratio: 1.3 },
      { color: "#2a1458", ratio: 1 },
      { color: "#5b21b6", ratio: 0.5 },
      { color: "#5b21b6", ratio: 0.12 },
    ],
    direction: 90, scale: 1.2, stretch: 2, turbulence: 1.2, softness: 0.75, grain: 0.12, speed: 0.4, ...cheap,
  },
  /** sun: the bright one, warm all through (pair with dark text) */
  sun: {
    colors: [
      { color: "#5b21b6", ratio: 0.9 },
      { color: "#22d3ee", ratio: 1 },
      { color: "#a78bfa", ratio: 0.8 },
      { color: "#e4e6ff", ratio: 0.5 },
    ],
    direction: 200, scale: 1, stretch: 1.4, turbulence: 1.3, softness: 0.9, grain: 0.18, speed: 0.4, ...cheap,
  },
  /** dusk: plum fading to ember at one edge, for large closing bands */
  dusk: {
    colors: [
      { color: "#0a0814", ratio: 1 },
      { color: "#2a2540", ratio: 1 },
      { color: "#5b21b6", ratio: 0.45 },
      { color: "#22d3ee", ratio: 0.1 },
    ],
    direction: 70, scale: 1.4, stretch: 1.8, turbulence: 1.4, softness: 0.8, grain: 0.14, speed: 0.5, maxFps: 30, maxDpr: 1.25,
  },
  /** deep: nearly black with a cold plum-indigo pulse, quiet enough for page headers */
  deep: {
    colors: [
      { color: "#0a0814", ratio: 1.8 },
      { color: "#2a1458", ratio: 0.9 },
      { color: "#2a2540", ratio: 0.7 },
      { color: "#5b21b6", ratio: 0.14 },
    ],
    direction: 110, scale: 1.5, stretch: 2.4, turbulence: 1, softness: 0.85, grain: 0.1, speed: 0.35, ...cheap,
  },
} satisfies Record<string, Preset>;

export type SilkName = keyof typeof SILK;

/**
 * Absolute-fill silk surface. The WebGL canvas only exists while the surface is near the viewport
 * (browsers cap live GL contexts), and a flat fill of the first colour sits underneath.
 */
export function Silk({ name, className = "" }: { name: SilkName; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const preset: Preset = SILK[name];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "60% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = preset.colors[0].color;
  return (
    <div ref={ref} aria-hidden className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: base }}>
      {near && <SilkGradient {...preset} />}
    </div>
  );
}
