"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useMagnetic } from "@/lib/useMagnetic";
import { ButtonLink } from "./Button";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const magneticCta = useMagnetic<HTMLAnchorElement>(0.25);

  const { contextSafe } = useGSAP({ scope: listRef });

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= 120) current = `#${el.id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveIndicator = contextSafe(() => {
    const el = active ? linkRefs.current[active] : null;
    const list = listRef.current;
    if (!el || !list || !indicatorRef.current) {
      if (indicatorRef.current) gsap.to(indicatorRef.current, { opacity: 0, duration: DUR.fast });
      return;
    }
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x: elRect.left - listRect.left,
      width: elRect.width,
      opacity: 1,
      duration: DUR.fast,
      ease: EASE.inOut,
    });
  });

  useEffect(() => {
    moveIndicator();
  }, [active, moveIndicator]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" data-intro="wordmark" className="block">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={48} height={48} priority className="h-12 w-12" />
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-8 text-body-sm md:flex">
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute -bottom-1 left-0 h-px bg-paper opacity-0"
            />
            {links.map((l) => (
              <li key={l.href} data-intro="nav-link">
                <a
                  ref={(el) => {
                    linkRefs.current[l.href] = el;
                  }}
                  href={l.href}
                  className={`transition-colors hover:text-paper ${active === l.href ? "text-paper" : "text-paper/80"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block" data-intro="nav-cta">
            <ButtonLink ref={magneticCta} href="#contact" variant="outline">
              Start a Project
            </ButtonLink>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-ink py-20 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="font-display text-display-lg"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * links.length, duration: 0.4 }}
              className="mt-4 inline-flex h-14 items-center justify-center gap-2 rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
            >
              Start a Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
