"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";
import { Backdrop } from "./Backdrop";
import { StatCounter } from "./StatCounter";
import { company, differentiators, stats } from "@/lib/data";

/**
 * About body: the lead statement lights up word by word as you scroll (scrubbed), stats and the four
 * operating principles rise in on the shared glow/grid backdrop.
 */
export function AboutBody() {
  const root = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = company.about;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const split = SplitText.create(q(".ab-lead"), { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.18 },
            { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: q(".ab-lead")[0], start: "top 80%", end: "bottom 45%", scrub: true } },
          );
          gsap.set(q(".ab-rise"), { opacity: 0, y: 40 });
          gsap.utils.toArray<HTMLElement>(q(".ab-group")).forEach((g) => {
            gsap.to(g.querySelectorAll(".ab-rise"), {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: g, start: "top 85%", once: true },
            });
          });
          return () => split.revert();
        },
        () => {},
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="relative overflow-hidden bg-ink px-6 py-24 md:px-10 md:py-36">
        <div className="relative mx-auto max-w-7xl">
          <p className="ab-lead max-w-5xl font-display text-[clamp(28px,4vw,58px)] font-semibold leading-[1.12]">{lead}</p>

          <div className="ab-group mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div className="space-y-6">
              {rest.map((p, i) => (
                <p key={i} className="ab-rise text-body-lg text-paper/75" style={{ opacity: 0 }}>
                  {p}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-px bg-line">
              {stats.map((s) => (
                <div key={s.label} className="ab-rise bg-ink p-6 md:p-8" style={{ opacity: 0 }}>
                  <div className="font-display text-[clamp(52px,6vw,96px)] font-semibold leading-none">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-body-sm text-paper/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-ink px-6 py-24 md:px-10 md:py-36">
        <Backdrop at="50% 100%" />
        <div className="ab-group relative mx-auto max-w-7xl">
          <h2 className="ab-rise font-display text-[clamp(36px,5vw,76px)] font-semibold leading-[1.05]" style={{ opacity: 0 }}>
            How we <span className="font-serif font-normal italic">operate.</span>
          </h2>
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <div key={d.title} className="ab-rise bg-ink/90 p-7 backdrop-blur md:p-8" style={{ opacity: 0 }}>
                <p className="font-display text-body-sm tracking-[0.18em] text-accent">0{i + 1}</p>
                <h3 className="mt-10 font-display text-display-md font-semibold leading-[1.05]">{d.title}</h3>
                <p className="mt-4 text-body-base text-paper/70">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
