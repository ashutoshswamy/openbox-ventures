import { ScrollHeadline } from "./ScrollHeadline";
import { ScrollReveal } from "./ScrollReveal";
import { LinkButton } from "./Button";

/** The orange block: the one full-colour moment at the end of each page. */
export function CTA({
  headline = "One team for the whole brief.",
  body = "Tell us what you're trying to do. We'll tell you how we'd do it.",
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <section className="on-accent overflow-hidden px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-5xl font-display text-[clamp(42px,7.4vw,120px)] leading-[0.92]">
          {headline}
        </ScrollHeadline>
        <ScrollReveal delay={0.05}>
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg text-body-lg text-ink/80">{body}</p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/contact" variant="ink">
                Start a project
              </LinkButton>
              <LinkButton href="/services" variant="outlineInk">
                Browse services
              </LinkButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
