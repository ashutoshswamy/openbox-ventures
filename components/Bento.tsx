import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared bits for the Services/Industries bento modules: illustrations, the
 * prompt cell, and the display-font style for cell titles. */

export const bentoTitleStyle = { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.03em" } as const;

/** Illustration file (in /public/services) per service slug. Replace the PNGs in place to change the art. */
export const serviceImages: Record<string, string> = {
  "logistics-supply-chain": "logistics",
  "marketing-branding": "marketing",
  "event-management": "events",
  "it-digital": "it",
  "ecommerce-development": "ecommerce",
  "content-creation": "contentcreation",
  "photography-videography": "photovideo",
  advertising: "advertising",
};

/** The "ask" cell used by the Services bento: a prompt that leads to the brief form. */
export function PromptCell({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`group flex flex-col justify-between gap-10 px-7 py-10 transition-colors hover:bg-paper/[0.04] ${className}`}
    >
      <p className="max-w-sm font-display text-[clamp(26px,3vw,40px)] leading-[1.02]" style={bentoTitleStyle}>
        Pick a discipline, or hand us the whole brief.
      </p>
      <span className="flex h-14 w-full max-w-md items-center justify-between gap-3 border border-paper/40 pl-5 text-body-sm text-paper/70 transition-colors group-hover:border-accent">
        What are you building?
        <span className="flex h-full w-14 items-center justify-center bg-accent text-ink">
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
}
