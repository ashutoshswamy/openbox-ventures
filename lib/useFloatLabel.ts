"use client";

import { useRef, type FocusEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useFieldFocus } from "./useFieldFocus";

/** Floats a form label up on focus, eased with the shared motion tokens. Settles back only if the field is empty. */
export function useFloatLabel<T extends HTMLElement>() {
  const labelRef = useRef<HTMLLabelElement>(null);
  const { fieldRef, onFocus: fieldFocus, onBlur: fieldBlur } = useFieldFocus<T>();
  const { contextSafe } = useGSAP({ scope: labelRef });

  const onFocus = contextSafe(() => {
    fieldFocus();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(labelRef.current, {
      y: -22,
      scale: 0.82,
      color: "var(--color-paper)",
      duration: DUR.fast,
      ease: EASE.smooth,
      transformOrigin: "left center",
    });
  });

  const onBlur = contextSafe((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    fieldBlur();
    if (e.target.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(labelRef.current, {
      y: 0,
      scale: 1,
      color: "color-mix(in oklab, var(--color-paper) 55%, transparent)",
      duration: DUR.fast,
      ease: EASE.smooth,
      transformOrigin: "left center",
    });
  });

  return { labelRef, fieldRef, onFocus, onBlur };
}
