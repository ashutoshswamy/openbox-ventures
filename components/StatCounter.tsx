"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";

export function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      withReducedMotion(
        () => {
          const counter = { val: 0 };
          const tween = gsap.to(counter, {
            val: value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
            onUpdate: () => {
              if (ref.current) ref.current.textContent = Math.round(counter.val).toLocaleString() + suffix;
            },
          });
          return () => tween.kill();
        },
        () => {
          if (ref.current) ref.current.textContent = value.toLocaleString() + suffix;
        },
      );
    },
    { scope: ref, dependencies: [value, suffix] },
  );

  return <span ref={ref}>0{suffix}</span>;
}
