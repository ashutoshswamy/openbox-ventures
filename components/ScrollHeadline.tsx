"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, withReducedMotion } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";

/** Section headline that splits into lines and reveals with a scroll-triggered stagger. */
export function ScrollHeadline({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      withReducedMotion(
        () => {
          const split = SplitText.create(ref.current, { type: "lines", mask: "lines" });
          gsap.set(ref.current, { opacity: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            opacity: 0,
            duration: DUR.slow,
            ease: EASE.smooth,
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          });
          return () => split.revert();
        },
        () => {
          gsap.set(ref.current, { opacity: 1 });
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
