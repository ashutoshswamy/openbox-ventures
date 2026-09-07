import Link from "next/link";
import { ScrollHeadline } from "./ScrollHeadline";
import { ScrollReveal } from "./ScrollReveal";

export function CTA({
  headline = "One team for the whole brief.",
  body = "Tell us what you're trying to do. We'll tell you how we'd do it.",
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollHeadline className="max-w-3xl font-display text-display-lg leading-tight">{headline}</ScrollHeadline>
        <ScrollReveal delay={0.05}>
          <p className="mt-6 max-w-xl text-body-lg text-paper/70">{body}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex h-14 items-center justify-center rounded-panel border border-paper/30 px-7 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Browse Services
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
