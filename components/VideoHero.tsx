"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";
import { Silk } from "./Silk";

/**
 * Hero: GSAP intro timeline (headline chars rise through a mask, pill draws open, copy fades up),
 * a WebGL silk gradient behind it all (SilkGradient), then a scrubbed "curtain": the hero pins and recedes while the
 * next section slides over it (see `main > * + *` in globals.css).
 * ponytail: the old intro-video overlay was dropped with the hub image it shrank into; /hero-video-final.mp4 is unused.
 */
export function VideoHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const split = SplitText.create(q(".hero-line")[0], { type: "chars", mask: "chars" });
          gsap.set(q(".hero-in"), { opacity: 1 });

          // intro: one timeline, positioned with labels/offsets
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.035 })
            .from(q(".hero-pill"), { scaleX: 0.6, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=0.55")
            .from(q(".hero-copy"), { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");

          // curtain: pin the hero, recede its content as the next section covers it
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
            })
            .to(q(".hero-content"), { scale: 0.86, y: -60, opacity: 0, ease: "none" }, 0)
            .to(q(".hero-silk"), { scale: 1.18, ease: "none" }, 0);

          // pointer parallax: the pill leans with the cursor
          if (!window.matchMedia("(hover: none)").matches) {
            const set = (sel: string, k: number) => ({
              x: gsap.quickTo(q(sel), "x", { duration: 1.2, ease: "power3.out" }),
              y: gsap.quickTo(q(sel), "yPercent", { duration: 1.2, ease: "power3.out" }),
              k,
            });
            const layers = [set(".hero-pill", -3)];
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              layers.forEach((l) => {
                l.x(nx * l.k * 10);
                l.y(ny * l.k);
              });
            };
            window.addEventListener("pointermove", onMove, { passive: true });
            return () => {
              window.removeEventListener("pointermove", onMove);
              split.revert();
            };
          }
          return () => split.revert();
        },
        () => {
          gsap.set(q(".hero-in"), { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-28 pt-6 md:px-10 md:pb-32"
    >
      <div aria-hidden className="hero-silk absolute inset-0 origin-center">
        <Silk name="hero" />
      </div>
      {/* flat ink scrim over the silk keeps the headline above AA contrast on the bright folds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ink/30"
      />
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <h1
          className="hero-in font-display text-[clamp(40px,8.5vw,128px)] font-normal leading-[1.1]"
          style={{ opacity: 0 }}
        >
          <span className="hero-line block">Every service.</span>
          <span className="hero-pill pill-outline mt-4 block w-fit max-w-full px-[0.6em]">One team</span>
        </h1>
        <p className="hero-in hero-copy mt-10 max-w-lg text-body-lg text-paper/75" style={{ opacity: 0 }}>
          Logistics, marketing, events, tech and more, run by one accountable team. Brief us once.
        </p>
      </div>
    </section>
  );
}
