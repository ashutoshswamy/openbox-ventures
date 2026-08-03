"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { ScrollHeadline } from "./ScrollHeadline";
import { differentiators } from "@/lib/data";
import { Focus, Workflow, Network, UserCheck } from "lucide-react";

const icons = [
  <Focus key="focus" className="h-5 w-5" strokeWidth={1.4} />,
  <Workflow key="workflow" className="h-5 w-5" strokeWidth={1.4} />,
  <Network key="network" className="h-5 w-5" strokeWidth={1.4} />,
  <UserCheck key="account" className="h-5 w-5" strokeWidth={1.4} />,
];

// index -> hairline divider classes (base = mobile top divider, sm/lg override for 2x2 / 4-col)
const dividerClass = [
  "",
  "border-t border-line pt-8 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-8",
  "border-t border-line pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8",
  "border-t border-line pt-8 sm:border-l sm:pl-8 lg:border-t-0 lg:pt-0",
];

export function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const columns = gsap.utils.toArray<HTMLElement>(gridRef.current.children);

      withReducedMotion(
        () => {
          const iconShapes = columns.flatMap((col) => Array.from(col.querySelectorAll("[data-anim='icon'] svg *")));
          const headings = columns.map((col) => col.querySelector("[data-anim='heading']"));
          const descs = columns.map((col) => col.querySelector("[data-anim='desc']"));

          gsap.set(iconShapes, { drawSVG: "0%" });
          gsap.set(headings, { opacity: 0, y: 10 });
          gsap.set(descs, { opacity: 0, y: 8 });

          const batch = ScrollTrigger.batch(columns, {
            start: "top 88%",
            once: true,
            onEnter: (batchTargets) => {
              batchTargets.forEach((col) => {
                const i = columns.indexOf(col as HTMLElement);
                const shapes = col.querySelectorAll("[data-anim='icon'] svg *");
                const heading = col.querySelector("[data-anim='heading']");
                const desc = col.querySelector("[data-anim='desc']");

                gsap
                  .timeline({ delay: i * 0.1 })
                  .to(shapes, { drawSVG: "100%", duration: DUR.fast, ease: EASE.smooth, stagger: 0.02 })
                  .to(heading, { opacity: 1, y: 0, duration: DUR.fast, ease: EASE.smooth }, "-=0.15")
                  .to(desc, { opacity: 1, y: 0, duration: DUR.fast, ease: EASE.smooth }, "-=0.2");
              });
            },
          });

          return () => batch.forEach((st) => st.kill());
        },
        () => {
          gsap.from(columns, {
            opacity: 0,
            duration: DUR.fast,
            scrollTrigger: { trigger: gridRef.current, start: "top 88%", once: true },
          });
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollHeadline className="max-w-2xl font-display text-display-lg leading-tight">
          Why Open Box Ventures
        </ScrollHeadline>

        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => (
            <div key={d.title} className={`flex flex-col border-line ${dividerClass[i]}`}>
              <div
                data-anim="icon"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-paper"
              >
                {icons[i]}
              </div>
              <h3 data-anim="heading" className="mt-5 min-h-[68px] font-display text-display-md leading-tight">
                {d.title}
              </h3>
              <p data-anim="desc" className="mt-2 text-body-sm text-paper/60">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
