"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/lib/data";

// same order as `processSteps`
const images = ["discover", "plan", "execute", "deliver", "support"];
const STEP = 26; // degrees between steps on the wheel
const n = processSteps.length;

/**
 * "How we work": a dial. The five steps sit on a big ring whose centre is off the left edge; scrolling turns the ring
 * so the next step rolls up to the pointer while its detail swaps in on the right. Labels counter-rotate to stay upright.
 * Below md the ring is hidden and only the detail scenes crossfade. Reduced motion: first step only.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const details = q(".pw-detail");
          const labels = q(".pw-label");
          const wheel = q(".pw-wheel")[0];
          gsap.set(details, { opacity: 0 });
          gsap.set(details[0], { opacity: 1 });
          gsap.set(labels, { transformOrigin: "6px 50%", rotation: (j) => -j * STEP, opacity: (j) => (j ? 0.3 : 1) });
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: { trigger: root.current, start: "top top", end: `+=${n * 90}%`, scrub: 0.6, pin: true },
          });
          for (let i = 1; i < n; i++) {
            const t = i - 1;
            tl.to(wheel, { rotation: -i * STEP, duration: 0.9 }, t + 0.1)
              .to(labels, { rotation: (j) => (i - j) * STEP, opacity: (j) => (j === i ? 1 : 0.3), duration: 0.9 }, t + 0.1)
              .to(details[i - 1], { opacity: 0, y: -40, duration: 0.35 }, t + 0.1)
              .fromTo(details[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, t + 0.55);
          }
          tl.to({}, { duration: 0.4 });
          tl.to(q(".pw-line"), { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
        },
        () => {
          gsap.set(q(".pw-detail"), { opacity: 0 });
          gsap.set(q(".pw-detail")[0], { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-svh overflow-hidden border-t border-line bg-ink [--R:clamp(240px,40vh,420px)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_0%_50%,rgba(34,211,238,0.45),rgba(91,47,176,0.25)_45%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />
      <h2 className="absolute inset-x-0 top-24 z-20 text-center font-display text-body-sm font-semibold uppercase tracking-[0.18em] text-paper/60 md:top-32">
        How we work
      </h2>

      {/* dial: origin sits on the left edge, mid-height */}
      <div aria-hidden className="absolute left-0 top-1/2 z-10 hidden md:block">
        <div className="absolute left-0 top-0 h-[calc(var(--R)*2)] w-[calc(var(--R)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/15" />
        <div className="absolute left-0 top-0 h-[calc(var(--R)*2+120px)] w-[calc(var(--R)*2+120px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/5" />
        <div className="pw-wheel absolute left-0 top-0 h-0 w-0">
          {processSteps.map((s, j) => (
            <div key={s.title} className="absolute left-0 top-0 h-0 w-0" style={{ transform: `rotate(${j * STEP}deg) translateX(var(--R))` }}>
              <div className="pw-label absolute -left-1.5 top-0 flex -translate-y-1/2 items-center gap-4 whitespace-nowrap">
                <span className="h-3 w-3 shrink-0 rounded-full bg-accent shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                <span className="font-display text-[clamp(22px,2.6vw,40px)] font-semibold leading-none">
                  <span className="mr-3 text-body-sm tracking-[0.18em] text-accent">0{j + 1}</span>
                  {s.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* pointer at 0deg */}
        <span className="absolute top-0 h-px w-10 -translate-y-1/2 bg-accent" style={{ left: "calc(var(--R) - 48px)" }} />
      </div>

      {processSteps.map((s, i) => (
        <div
          key={s.title}
          style={i ? { opacity: 0 } : undefined}
          className="pw-detail absolute inset-0 z-10 flex flex-col items-center px-6 pt-[16vh] text-center md:items-start md:justify-center md:pl-[54%] md:pr-10 md:pt-0 md:text-left"
        >
          <div className="relative bg-[radial-gradient(closest-side,rgba(34,211,238,0.4),transparent)] h-[24vh] w-[min(70vw,360px)] md:h-[30vh] md:w-[min(30vw,420px)]">
            <Image
              src={`/howwework/${images[i]}.png`}
              alt=""
              fill
              sizes="(min-width: 768px) 30vw, 70vw"
              data-fx="off"
              className="object-contain object-center md:object-left"
            />
          </div>
          <p className="mt-6 font-display text-body-sm tracking-[0.18em] text-accent">
            0{i + 1} / 0{n}
          </p>
          <h3 className="mt-3 font-display text-[clamp(32px,4.4vw,68px)] font-semibold leading-[1.05]">{s.title}</h3>
          <p className="mt-5 max-w-md text-body-lg text-paper/80">{s.body}</p>
        </div>
      ))}

      <div aria-hidden className="absolute inset-x-6 bottom-8 z-20 h-px bg-paper/10 md:inset-x-10">
        <div className="pw-line h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}
