"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

const WORDS = ["audience.", "crowd.", "moment.", "guests."];

/**
 * Masked line-slide word swap for the hero headline — the current word
 * slides up out of an overflow-hidden mask, the text is swapped while
 * off-screen, then the next word slides in. No opacity crossfade, no
 * raw innerHTML replace.
 */
export function useHeroTimeline() {
  const maskRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!wordRef.current) return;

      withReducedMotion(
        () => {
          const tl = gsap.timeline({ repeat: -1 });
          WORDS.forEach((_, i) => {
            const next = WORDS[(i + 1) % WORDS.length];
            tl.to(wordRef.current, { yPercent: -100, duration: DUR.base, ease: EASE.smoothIn })
              .call(() => {
                if (wordRef.current) wordRef.current.textContent = next;
              })
              .set(wordRef.current, { yPercent: 100 })
              .to(wordRef.current, { yPercent: 0, duration: DUR.base, ease: EASE.smooth })
              .to({}, { duration: 1.3 });
          });
          return () => {
            tl.kill();
          };
        },
        () => {
          let i = 0;
          const id = window.setInterval(() => {
            i = (i + 1) % WORDS.length;
            if (wordRef.current) wordRef.current.textContent = WORDS[i];
          }, 2200);
          return () => window.clearInterval(id);
        },
      );
    },
    { scope: maskRef },
  );

  return { maskRef, wordRef, firstWord: WORDS[0] };
}
