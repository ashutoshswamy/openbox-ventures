"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

/** Animates a form field's border + a soft glow on focus/blur via GSAP — no CSS :focus snap. */
export function useFieldFocus<T extends HTMLElement>() {
  const fieldRef = useRef<T | null>(null);
  const { contextSafe } = useGSAP({ scope: fieldRef });

  const onFocus = contextSafe(() => {
    if (!fieldRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(fieldRef.current, {
      borderColor: "var(--color-paper)",
      boxShadow: "0 0 0 3px color-mix(in oklab, var(--color-paper) 14%, transparent)",
      duration: DUR.fast,
      ease: EASE.smooth,
    });
  });

  const onBlur = contextSafe(() => {
    if (!fieldRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(fieldRef.current, {
      borderColor: "var(--color-line)",
      boxShadow: "0 0 0 0px transparent",
      duration: DUR.fast,
      ease: EASE.smooth,
    });
  });

  return { fieldRef, onFocus, onBlur };
}
