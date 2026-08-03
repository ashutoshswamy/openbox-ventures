"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { DUR } from "@/lib/motion-tokens";

/** Infinite horizontal marquee — track must render its children duplicated (e.g. [...items, ...items]) for a seamless loop. Pausable on hover. */
export function useMarquee(duration: number = DUR.marquee) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!trackRef.current) return;

      withReducedMotion(() => {
        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
        tl.to(trackRef.current, { xPercent: -50, duration });
        tlRef.current = tl;
        return () => {
          tl.kill();
          tlRef.current = null;
        };
      });
    },
    { scope: trackRef },
  );

  const pause = contextSafe(() => tlRef.current?.pause());
  const resume = contextSafe(() => tlRef.current?.play());

  return { trackRef, pause, resume };
}
