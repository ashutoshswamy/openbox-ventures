"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollHeadline } from "./ScrollHeadline";
import { Silk } from "./Silk";
import { differentiators } from "@/lib/data";

// same order as `differentiators`
const images = ["roof", "multidisciplinary", "international", "goals"];

/** One flat, opaque surface per card (cards stack, so they must not be see-through); the last is the page's solid colour block. */
const cards = [
  { bg: "#17101f", text: "text-paper", muted: "text-paper/75", flip: false },
  { bg: "#1f120d", text: "text-paper", muted: "text-paper/75", flip: true },
  { bg: "#10122a", text: "text-paper", muted: "text-paper/75", flip: false },
  { bg: "var(--color-accent)", text: "text-ink", muted: "text-ink/80", flip: true },
] as const;

/**
 * Sticky card stack: each card pins just below the previous one's top edge (CSS sticky), and as the next card
 * arrives the one beneath shrinks and dims (scrubbed). Motion job: shows the four reasons accumulating into one case.
 */
export function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>(".why-card", root.current);
        els.forEach((card, i) => {
          const next = els[i + 1];
          if (next) {
            const trigger = { trigger: next, start: "top bottom", end: "top 18%", scrub: true };
            gsap.to(card, { scale: 0.93, ease: "none", scrollTrigger: trigger });
            gsap.to(card.querySelector(".why-dim"), { opacity: 0.7, ease: "none", scrollTrigger: trigger });
          }
          // the cut-out floats on its own clock so a pinned card is never dead
          gsap.to(card.querySelector(".why-art"), {
            y: -12,
            duration: 3 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-t border-line px-6 pb-40 pt-24 md:px-10 md:pt-32">
      {/* silk lives on the section; the cards on top stay flat and opaque */}
      <Silk name="plum" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-3xl font-display text-display-lg leading-[0.98]">
          Why Open Box Ventures
        </ScrollHeadline>

        <div className="mt-14 flex flex-col gap-[10vh]">
          {differentiators.map((d, i) => {
            const c = cards[i];
            return (
              <article
                key={d.title}
                className={`why-card sticky grid min-h-[min(70svh,600px)] origin-top overflow-hidden border border-line lg:grid-cols-2 ${c.text}`}
                style={{ background: c.bg, top: `calc(5rem + ${i * 1.1}rem)` }}
              >
                <div
                  className={`relative z-10 flex flex-col justify-center gap-5 p-7 md:p-12 ${c.flip ? "lg:order-2" : ""}`}
                >
                  <h3 className="font-display text-[clamp(32px,4.6vw,68px)] leading-[1.02]">{d.title}</h3>
                  <p className={`max-w-md text-body-lg ${c.muted}`}>{d.body}</p>
                </div>
                <div className={`relative z-10 min-h-64 ${c.flip ? "lg:order-1" : ""}`}>
                  <div className="why-art absolute inset-4 md:inset-10">
                    <Image
                      src={`/whyobv/${images[i]}.png`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      data-fx="off"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div aria-hidden className="why-dim pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
