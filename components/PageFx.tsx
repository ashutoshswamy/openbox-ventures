"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, withReducedMotion } from "@/lib/gsap";

/**
 * Site-wide GSAP layer, mounted once in the layout:
 *  - scroll progress bar (scrubbed scaleX)
 *  - depth parallax on every content image: it drifts against its frame while the frame scrolls through
 */
export function PageFx() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // global, once
  useGSAP(() => {
    withReducedMotion(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.3 },
      });
    });
  });

  // per route: images are new DOM after each navigation
  useGSAP(
    () => {
      withReducedMotion(() => {
        // section headings drift slower than the page
        gsap.utils.toArray<HTMLElement>("main h2").forEach((h) => {
          gsap.fromTo(
            h,
            { y: 36 },
            { y: -36, ease: "none", scrollTrigger: { trigger: h, start: "top bottom", end: "bottom top", scrub: 0.8 } },
          );
        });

        const fine = !window.matchMedia("(hover: none)").matches;
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLImageElement>("main img:not([data-fx=off])").forEach((img) => {
          const frame = img.parentElement;
          if (!frame) return;
          if (fine) {
            // pointer tilt: the cut-out turns toward the cursor in 3D while the frame is hovered
            gsap.set(img, { transformPerspective: 900 });
            const rx = gsap.quickTo(img, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(img, "rotationY", { duration: 0.6, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = frame.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 18);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            frame.addEventListener("pointermove", move);
            frame.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              frame.removeEventListener("pointermove", move);
              frame.removeEventListener("pointerleave", leave);
            });
          }
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });
        ScrollTrigger.refresh();
        return () => cleanups.forEach((c) => c());
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </>
  );
}
