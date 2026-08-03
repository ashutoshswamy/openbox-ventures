"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "./Button";
import { useHeroTimeline } from "@/lib/useHeroTimeline";
import { useMagnetic } from "@/lib/useMagnetic";
import { useLaserFan } from "@/lib/useLaserFan";

const RAYS = [
  { x2: -15, o: 0.03 },
  { x2: 2, o: 0.06 },
  { x2: 19, o: 0.09 },
  { x2: 36, o: 0.12 },
  { x2: 50, o: 0.16 },
  { x2: 64, o: 0.12 },
  { x2: 81, o: 0.09 },
  { x2: 98, o: 0.06 },
  { x2: 115, o: 0.03 },
];

export function Hero() {
  const reduced = useReducedMotion();
  const { maskRef, wordRef, firstWord } = useHeroTimeline();
  const magneticPrimary = useMagnetic<HTMLAnchorElement>();
  const magneticSecondary = useMagnetic<HTMLAnchorElement>();
  const fanRef = useLaserFan<SVGGElement>();

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 md:px-10">
      {/* laser-rig motif — literal to the business (Media Management: Laser Show / Light & Sound), in-palette */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g ref={fanRef}>
          {RAYS.map((r, i) => (
            <line
              key={i}
              x1="50"
              y1="-2"
              x2={r.x2}
              y2="102"
              stroke="var(--color-paper)"
              strokeWidth="1"
              opacity={r.o}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-paper) 0%, transparent 70%)", opacity: 0.14 }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <h1
          data-intro="hero-headline"
          className="font-display text-display-xl leading-[0.92] tracking-tight"
        >
          <span className="block">We move</span>
          <span className="block">
            your{" "}
            <span
              ref={maskRef}
              className="relative inline-flex items-baseline overflow-hidden align-baseline"
              style={{ height: "1em" }}
            >
              <span
                ref={wordRef}
                className="inline-block whitespace-nowrap text-paper underline decoration-1 underline-offset-8"
              >
                {firstWord}
              </span>
            </span>
          </span>
        </h1>

        <p data-intro="hero-subtext" className="mt-8 max-w-xl text-body-lg text-paper/75">
          Experiential media, content, and public-facing strategy — planned and produced
          end to end, with the same discipline, every time.
        </p>

        <div data-intro="hero-ctas" className="mt-10 flex flex-wrap gap-4">
          <ButtonLink ref={magneticPrimary} href="#services">
            Explore Services
          </ButtonLink>
          <ButtonLink ref={magneticSecondary} href="#contact" variant="outline">
            Start a Project
          </ButtonLink>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6 text-paper/50" strokeWidth={1.4} />
      </motion.a>
    </section>
  );
}
