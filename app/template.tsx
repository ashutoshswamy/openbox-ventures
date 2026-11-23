"use client";

import { useLayoutEffect, ViewTransition } from "react";

/**
 * Remounts on every navigation (unlike layout.tsx): jumps to the top before paint, and the page crossfades
 * through the browser's View Transitions API (classes in globals.css). The dock lives in the layout, so it stays put.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
