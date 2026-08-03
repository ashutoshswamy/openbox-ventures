"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";

/** Slow side-to-side sweep for the hero's laser-rig motif. Static (no sweep) under reduced motion. */
export function useLaserFan<T extends SVGElement>() {
  const groupRef = useRef<T | null>(null);

  useGSAP(
    () => {
      if (!groupRef.current) return;

      withReducedMotion(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut", transformOrigin: "50% 0%" } });
        tl.to(groupRef.current, { rotation: 5, duration: 5 }).to(groupRef.current, { rotation: -5, duration: 5 });
        return () => tl.kill();
      });
    },
    { scope: groupRef },
  );

  return groupRef;
}
