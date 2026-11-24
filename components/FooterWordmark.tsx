"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";

/**
 * Closing wordmark. Letters rise through a mask as the footer scrolls in (scrubbed, so it assembles with the
 * scroll), and each letter lifts and turns ember while the pointer is over it.
 */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      withReducedMotion(
        () => {
          const split = SplitText.create(el, { type: "lines,chars", mask: "lines" });
          gsap.set(el, { opacity: 1 });
          gsap.from(split.chars, {
            yPercent: 105,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 108%", end: "top 82%", scrub: 0.6 },
          });

          const cleanups: Array<() => void> = [];
          if (!window.matchMedia("(hover: none)").matches) {
            split.chars.forEach((ch) => {
              const enter = () => gsap.to(ch, { y: -14, color: "#22d3ee", duration: 0.25, ease: "power2.out", overwrite: "auto" });
              const leave = () => gsap.to(ch, { y: 0, color: "#e4e6ff", duration: 0.7, ease: "elastic.out(1,0.5)", overwrite: "auto" });
              ch.addEventListener("pointerenter", enter);
              ch.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                ch.removeEventListener("pointerenter", enter);
                ch.removeEventListener("pointerleave", leave);
              });
            });
          }
          return () => {
            cleanups.forEach((c) => c());
            split.revert();
          };
        },
        () => {
          gsap.set(el, { opacity: 1 });
        },
      );
    },
    { scope: ref },
  );

  return (
    <p
      ref={ref}
      aria-hidden
      className="select-none whitespace-nowrap font-display text-[clamp(28px,7vw,112px)] pb-2 leading-[1.05] tracking-tight text-paper"
      style={{ opacity: 0 }}
    >
      {text}
    </p>
  );
}
