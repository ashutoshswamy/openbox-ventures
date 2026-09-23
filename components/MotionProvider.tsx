"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Site-wide reduced-motion handling: framer drops transform animations for users who ask, SSR-safely. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
