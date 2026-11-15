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

export function Process() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  return (
    <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-[0.98]">How we work</ScrollHeadline>

        <ScrollReveal delay={0.1} className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ol className="flex gap-x-6 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {processSteps.map((s, i) => (
              <li key={s.title} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={`block w-full text-left font-display text-[clamp(36px,5.2vw,80px)] leading-[1.02] transition-colors duration-200 ${
                    i === active ? "text-accent" : "text-paper/30 hover:text-paper/70"
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ol>

          <div className="flex flex-col border border-line">
            <div className="relative aspect-[3/2] w-full bg-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/howwework/${images[active]}.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain p-4"
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
                  aria-live="polite"
                >
                  <p className="max-w-md text-body-lg text-paper/80">{step.body}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex flex-1 gap-1.5" aria-hidden>
                  {processSteps.map((s, i) => (
                    <span
                      key={s.title}
                      className={`h-1 flex-1 transition-colors duration-300 ${i <= active ? "bg-accent" : "bg-paper/15"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous step"
                    disabled={active === 0}
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    className="flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-paper"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next step"
                    disabled={active === processSteps.length - 1}
                    onClick={() => setActive((a) => Math.min(processSteps.length - 1, a + 1))}
                    className="flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-paper"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
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
