import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

/** One button look, used everywhere — sharp-cornered panel radius, two variants. */
const base = "inline-flex h-14 items-center justify-center gap-2 rounded-panel px-7 text-body-sm font-medium transition-colors";

const variants = {
  solid: "bg-paper text-ink",
  outline: "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
} as const;

type Variant = keyof typeof variants;

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  { variant?: Variant; className?: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>
>(function ButtonLink({ variant = "solid", className = "", children, ...props }, ref) {
  return (
    <a ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
});

export const Button = forwardRef<
  HTMLButtonElement,
  { variant?: Variant; className?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ variant = "solid", className = "", children, ...props }, ref) {
  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
});
