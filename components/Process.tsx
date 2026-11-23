"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollHeadline } from "./ScrollHeadline";
import { Silk } from "./Silk";
import { processSteps } from "@/lib/data";

// same order as `processSteps`
const images = ["discover", "plan", "execute", "deliver", "support"];

// one silk preset per step, rotating through the family so no two neighbours match
const silks = ["plum", "ember", "indigo", "dusk", "deep"] as const;

/**
 * Horizontal pan: on desktop the section pins and the five steps travel sideways as you scroll, so the
 * process reads as a journey with a start and an end. Below lg (or with reduced motion) it is a plain vertical list.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".proc-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const pan = gsap.to(track, {
          x: () => -distance(),
          ease: "none", // required for a 1:1 scroll-to-position map
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.to(".proc-line", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        // each cut-out slides against its panel while the panel crosses the viewport
        gsap.utils.toArray<HTMLElement>(".proc-art").forEach((art) => {
          gsap.fromTo(
            art,
            { xPercent: -14 },
            {
              xPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: art.closest(".proc-panel"),
                containerAnimation: pan,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="border-t border-line lg:h-svh lg:overflow-hidden">
      <div className="flex flex-col justify-center gap-10 px-6 py-24 md:px-10 lg:h-full lg:gap-12 lg:py-0 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-[0.98]">How we work</ScrollHeadline>
          <div aria-hidden className="mt-8 hidden h-0.5 bg-paper/10 lg:block">
            <div className="proc-line h-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>

        <ol className="proc-track flex flex-col gap-5 lg:w-max lg:flex-row lg:gap-6 lg:pl-[max(2.5rem,calc((100vw-80rem)/2))] lg:pr-24">
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="proc-panel relative grid overflow-hidden border border-line lg:min-h-[50svh] lg:w-[min(64vw,860px)] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <Silk name={silks[i]} />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink/35" />
              <div className="relative z-10 flex flex-col justify-end gap-4 p-7 md:p-10">
                <h3 className="font-display text-[clamp(44px,6.4vw,104px)] leading-[0.95] text-paper">{s.title}</h3>
                <p className="max-w-xs text-body-lg text-paper/75">{s.body}</p>
              </div>
              <div className="relative z-10 min-h-56 overflow-hidden lg:min-h-0">
                <div className="proc-art absolute inset-3 md:inset-6">
                  <Image
                    src={`/howwework/${images[i]}.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    data-fx="off"
                    className="object-contain"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
