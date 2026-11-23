"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, withReducedMotion } from "@/lib/gsap";
import { useMagnetic } from "@/lib/useMagnetic";

const links = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
];

const item =
  "inline-flex h-11 items-center rounded-lg px-2 font-display text-[12px] font-bold transition-colors min-[400px]:px-3 min-[400px]:text-[14px] sm:px-5 sm:text-[17px]";

/** Dock item that leans toward the pointer (GSAP quickTo). */
function DockLink({ href, className, children, ...rest }: { href: string; className: string; children: ReactNode; "aria-current"?: "page"; "aria-label"?: string; onClick?: () => void }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <Link ref={ref} href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** The site's only navigation: a fixed bottom dock (Elephant-style) with home, four routes and the contact CTA. */
export function BottomNav() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  // entrance: the dock rises in after the hero headline starts
  useGSAP(
    () => {
      withReducedMotion(() => {
        gsap.from(nav.current, { y: 90, opacity: 0, duration: 1, delay: 1.1, ease: "expo.out" });
      });
    },
    { scope: nav },
  );
  // optimistic highlight: the clicked item lights up immediately, not after the new route commits
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const target = pending && pending.from === pathname ? pending.href : pathname;
  const isActive = (href: string) => target === href || target.startsWith(href + "/");
  const go = (href: string) => () => setPending({ href, from: pathname });
  return (
    <nav
      ref={nav}
      aria-label="Primary"
      style={{ viewTransitionName: "dock" }}
      className="pill-dock fixed bottom-3 left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center md:bottom-6"
    >
      <DockLink href="/" aria-label="Open Box Ventures LLP - home" className="hidden h-11 w-11 items-center justify-center rounded-lg bg-paper/10 hover:bg-paper/25 min-[400px]:flex">
        <Image src="/logo_nobg.png" alt="" width={32} height={32} className="h-8 w-8" />
      </DockLink>
      {links.map((l) => (
        <DockLink
          key={l.href}
          href={l.href}
          aria-current={isActive(l.href) ? "page" : undefined}
          onClick={go(l.href)}
          className={`${item} ${isActive(l.href) ? "bg-paper text-ink" : "bg-paper/10 text-paper hover:bg-paper hover:text-ink"}`}
        >
          {l.label}
        </DockLink>
      ))}
      <DockLink
        href="/contact"
        aria-current={isActive("/contact") ? "page" : undefined}
        onClick={go("/contact")}
        className={`${item} bg-accent text-ink hover:bg-accent-2`}
      >
        Contact
      </DockLink>
    </nav>
  );
}
