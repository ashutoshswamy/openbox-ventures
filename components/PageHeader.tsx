import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

/** Shared sub-page hero: the title, big, and one sentence. The header is sticky, so no top offset is needed. */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h1 className="max-w-5xl font-display text-[clamp(42px,7vw,104px)] leading-[0.94]">{title}</h1>
        </ScrollReveal>
        {intro && (
          <ScrollReveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-body-lg text-paper/70">{intro}</p>
          </ScrollReveal>
        )}
        {children}
      </div>
    </header>
  );
}
