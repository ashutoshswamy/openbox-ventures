import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

/** Shared sub-page hero. Top padding clears the fixed SiteHeader. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">{eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl leading-[0.95]">{title}</h1>
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
