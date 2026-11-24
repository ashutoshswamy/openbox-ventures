"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { arc, gsap, withReducedMotion } from "@/lib/gsap";

type Item = { title: string; body: string };

/**
 * Pinned stage, scroll scrubs through N scenes. Each cut-out swings round the centre on an arc to the opposite side
 * while the copy wheels out and in (same motion as the hero), with a progress line along the bottom.
 * Mobile: image below the text. Reduced motion: first scene only.
 * ponytail: image paths are measured in px at setup, reload after a big resize.
 */
export function ScrollScenes({ heading, items, images }: { heading: string; items: readonly Item[]; images: string[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      withReducedMotion(
        () => {
          const mm = gsap.matchMedia();
          mm.add({ wide: "(min-width: 768px)" }, (ctx) => {
            const wide = !!ctx.conditions?.wide;
            const scenes = q(".ss-scene");
            const imgs = q(".ss-img");
            const vw = window.innerWidth / 100;
            const vh = window.innerHeight / 100;
            const at = (i: number) => ({ x: (wide ? (i % 2 ? 24 : -24) : 0) * vw, y: (wide ? 0 : 20) * vh });
            gsap.set(scenes, { transformOrigin: "50% 130%", opacity: 0 });
            gsap.set(scenes[0], { opacity: 1 });
            gsap.set(imgs, { transformPerspective: 900, opacity: 0, ...at(0) });
            gsap.set(imgs[0], { opacity: 1 });
            const tl = gsap.timeline({
              defaults: { ease: "power2.inOut" },
              scrollTrigger: { trigger: root.current, start: "top top", end: `+=${items.length * 90}%`, scrub: 0.6, pin: true },
            });
            for (let i = 1; i < scenes.length; i++) {
              const from = at(i - 1);
              const to = at(i);
              const t = i - 1;
              tl.to(scenes[i - 1], { opacity: 0, rotation: -7, y: -40, duration: 0.35 }, t + 0.1)
                .fromTo(scenes[i], { opacity: 0, rotation: 7, y: 40 }, { opacity: 1, rotation: 0, y: 0, duration: 0.35 }, t + 0.55)
                .to(imgs[i - 1], { motionPath: arc(from, to), opacity: 0, duration: 0.9 }, t + 0.1)
                .fromTo(imgs[i], { opacity: 0 }, { motionPath: arc(from, to), opacity: 1, duration: 0.9 }, t + 0.1);
            }
            tl.to({}, { duration: 0.4 }); // hold the last scene
            tl.to(q(".ss-line"), { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
          });
          return () => mm.revert();
        },
        () => {
          gsap.set(q(".ss-scene"), { opacity: 0 });
          gsap.set(q(".ss-scene")[0], { opacity: 1 });
          gsap.set(q(".ss-img")[0], { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-svh overflow-hidden border-t border-line bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(34,211,238,0.35),rgba(91,47,176,0.2)_45%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />
      <h2 className="absolute inset-x-0 top-24 z-20 text-center font-display text-body-sm font-semibold uppercase tracking-[0.18em] text-paper/60 md:top-32">
        {heading}
      </h2>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        {images.map((src) => (
          <div key={src} style={{ opacity: 0 }} className="ss-img bg-[radial-gradient(closest-side,rgba(34,211,238,0.4),transparent)] absolute h-[min(44vh,420px)] w-[min(80vw,34vw+120px)] md:h-[min(60vh,520px)] md:w-[34vw]">
            <Image src={src} alt="" fill sizes="(min-width: 768px) 34vw, 80vw" data-fx="off" className="object-contain" />
          </div>
        ))}
      </div>

      {items.map((d, i) => (
        <div
          key={d.title}
          style={i ? { opacity: 0 } : undefined}
          className={`ss-scene absolute inset-0 z-10 flex flex-col items-center px-6 pt-[16vh] text-center md:items-start md:justify-center md:pt-0 md:text-left ${
            i % 2 ? "md:pl-40 md:pr-[52%]" : "md:pl-[52%] md:pr-10"
          }`}
        >
          <p className="font-display text-body-sm tracking-[0.18em] text-accent">
            0{i + 1} / 0{items.length}
          </p>
          <h3 className="mt-4 font-display text-[clamp(32px,5vw,76px)] font-semibold leading-[1.05]">{d.title}</h3>
          <p className="mt-6 max-w-md text-body-lg text-paper/80">{d.body}</p>
        </div>
      ))}

      <div aria-hidden className="absolute inset-x-6 bottom-8 z-20 h-px bg-paper/10 md:inset-x-10">
        <div className="ss-line h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}
