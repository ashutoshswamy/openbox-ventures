"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { company } from "@/lib/data";

// ponytail: /showreel.mp4 + /showreel-poster.jpg are placeholders — drop the real
// files into /public and the hero picks them up. The gradient stage stands in
// until then, so the page never renders a broken video box.
export function VideoHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 0%, rgba(237,234,225,0.10), transparent 60%), radial-gradient(100% 60% at 90% 100%, rgba(237,234,225,0.06), transparent 55%), var(--color-ink)",
        }}
      />
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="/showreel-poster.jpg"
      >
        <source src="/showreel.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <motion.div
        className="relative mx-auto w-full max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "show"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60"
        >
          {company.tagline}
        </motion.p>
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="mt-6 max-w-5xl font-display text-display-xl leading-[0.92]"
        >
          Everything your business needs. One team.
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mt-8 max-w-xl text-body-lg text-paper/75"
        >
          Logistics, marketing, events, technology, and content — eight service lines, one
          accountable team, across four countries.
        </motion.p>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/services"
            className="inline-flex h-14 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-14 items-center justify-center rounded-panel border border-paper/30 px-7 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="relative mx-auto mt-14 w-full max-w-6xl"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6 text-paper/40" strokeWidth={1.4} />
      </motion.div>
    </section>
  );
}
