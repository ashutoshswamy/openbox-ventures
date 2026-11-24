"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Landing page is hero-only: render children (the footer) everywhere except "/". */
export function HideOnHome({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : children;
}
