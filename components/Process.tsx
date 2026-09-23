"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollHeadline } from "./ScrollHeadline";
import { ScrollReveal } from "./ScrollReveal";
import { processSteps } from "@/lib/data";

// same order as `processSteps`
const images = ["discover", "plan", "execute", "deliver", "support"];
const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  return (
    <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Process</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-2xl font-display text-display-lg leading-[1.05]">
          How We Work
        </ScrollHeadline>

        <ScrollReveal delay={0.1} className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {processSteps.map((s, i) => (
              <li key={s.title} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={`flex w-full items-center gap-4 rounded-panel border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:px-6 lg:py-5 ${
                    i === active
                      ? "border-paper/40 bg-paper/[0.05] text-paper lg:border-paper"
                      : "border-line text-paper/40 hover:text-paper/70 lg:border-line"
                  }`}
                >
                  <span className="font-mono text-utility-xs tracking-[0.15em]">{pad(i + 1)}</span>
                  <span className="font-display text-[clamp(22px,2.6vw,34px)] leading-none">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex flex-col overflow-hidden rounded-panel border border-line bg-paper/[0.03]">
            <div className="flex flex-1 items-center justify-center px-6 pt-8 md:px-10 md:pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={`/howwework/${images[active]}.png`}
                    alt=""
                    width={520}
                    height={520}
                    className="h-64 w-64 object-contain md:h-80 md:w-80"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-line p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-5 md:gap-8"
                >
                  <span className="font-display text-[clamp(48px,6vw,84px)] leading-[0.85] text-paper/20">
                    {pad(active + 1)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-display-md leading-none">{step.title}</h3>
                    <p className="mt-3 max-w-md text-body-base text-paper/65">{step.body}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex flex-1 gap-1.5" aria-hidden>
                  {processSteps.map((s, i) => (
                    <span
                      key={s.title}
                      className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i <= active ? "bg-paper" : "bg-paper/15"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous step"
                    disabled={active === 0}
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-paper/50 disabled:opacity-30 disabled:hover:border-line"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next step"
                    disabled={active === processSteps.length - 1}
                    onClick={() => setActive((a) => Math.min(processSteps.length - 1, a + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-paper/50 disabled:opacity-30 disabled:hover:border-line"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
