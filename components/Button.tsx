import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

/** One button look, used everywhere: full pill, one height. Variants only change colour. */
const base =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 font-display text-body-base font-semibold transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98]";

export const variants = {
  /** primary: ember fill, amber on hover */
  accent: "bg-accent text-ink hover:bg-accent-2",
  /** on the orange block */
  ink: "bg-ink text-paper hover:bg-paper hover:text-ink",
  /** on the white band */
  inkSolid: "bg-ink text-paper hover:bg-paper/90 hover:text-ink",
  outline: "border border-paper/35 bg-ink/40 text-paper backdrop-blur hover:border-paper hover:bg-paper hover:text-ink",
  outlineInk: "border border-ink/45 text-ink hover:bg-ink hover:text-paper",
} as const;

export type Variant = keyof typeof variants;

export function LinkButton({
  href,
  variant = "accent",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  { variant?: Variant; className?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ variant = "accent", className = "", children, ...props }, ref) {
  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
});

/** Plain anchor (mailto:, #hash) with the same look; use LinkButton for routes. */
export function ButtonLink({
  variant = "accent",
  className = "",
  children,
  ...props
}: { variant?: Variant; className?: string; children: ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

/** Sharp-cornered buttons for the redesigned pages (hero language). Pair with `<Link className={...}>`. */
export const sharp = {
  base: "inline-flex h-14 items-center justify-center gap-2 px-9 font-display text-body-base font-semibold transition-colors",
  accent: "bg-accent text-ink hover:bg-accent-2",
  glass: "bg-paper/10 text-paper backdrop-blur hover:bg-paper hover:text-ink",
} as const;
