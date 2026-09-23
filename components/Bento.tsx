import Link from "next/link";
import { Search } from "lucide-react";

/** Shared bits for the Services/Industries bento modules: illustrations, the
 * prompt cell, and the display-font override (bold DM Sans without the forced-uppercase `.font-display` transform). */

export const bentoTitleStyle = { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" } as const;

/** Illustration file (in /public/services) per service slug. */
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

/** Illustrated "ask" cell used by the Services bento. */
export function PromptCell({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`group relative flex flex-col justify-between gap-10 overflow-hidden px-7 py-10 transition-colors hover:bg-paper/[0.03] ${className}`}
    >
      <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-paper/25" aria-hidden />
      <span className="pointer-events-none absolute right-10 bottom-8 h-2 w-2 rounded-full bg-paper/60" aria-hidden />
      <p className="max-w-xs text-body-base text-paper/60">Pick the discipline, or hand us the whole brief.</p>
      <span className="flex h-14 w-full max-w-sm items-center gap-3 rounded-panel border border-line px-5 text-body-sm text-paper/50 transition-colors group-hover:border-paper/50">
        <Search className="h-4 w-4 shrink-0" strokeWidth={1.6} />
        What are you building?
      </span>
    </Link>
  );
}
