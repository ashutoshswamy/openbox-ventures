"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/data";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", services: true },
  { href: "/life", label: "Life at OBV" },
  { href: "/outcomes", label: "Outcomes" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const closeMobile = () => {
    setOpen(false);
    setMobileServices(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" aria-label="Open Box Ventures — home" className="block">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={48} height={48} priority className="h-12 w-12" />
          </Link>

          <ul className="hidden items-center gap-8 text-body-sm md:flex">
            {links.map((l) => (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={l.services ? () => setServicesOpen(true) : undefined}
                onMouseLeave={l.services ? () => setServicesOpen(false) : undefined}
              >
                <Link
                  href={l.href}
                  className={`inline-flex items-center gap-1 transition-colors hover:text-paper ${
                    isActive(l.href) ? "text-paper" : "text-paper/80"
                  }`}
                >
                  {l.label}
                  {l.services && <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.6} />}
                </Link>

                {l.services && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-panel border border-line bg-ink/95 p-2 backdrop-blur">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="block rounded-[3px] px-3 py-2 text-body-sm text-paper/75 transition-colors hover:bg-paper/8 hover:text-paper"
                            >
                              {s.name}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            className="mt-1 block border-t border-line px-3 pt-3 pb-1 font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/55 transition-colors hover:text-paper"
                          >
                            All services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="hidden h-11 items-center justify-center rounded-panel border border-paper/30 px-5 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink md:inline-flex"
          >
            Start a Project
          </Link>

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
            className="fixed inset-0 z-40 flex flex-col gap-2 overflow-y-auto bg-ink px-6 pb-16 pt-24 md:hidden"
          >
            {links.map((l) =>
              l.services ? (
                <div key={l.href} className="border-b border-line py-3">
                  <button
                    onClick={() => setMobileServices((v) => !v)}
                    className="flex w-full items-center justify-between font-display text-display-md"
                  >
                    Services
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${mobileServices ? "rotate-180" : ""}`}
                      strokeWidth={1.6}
                    />
                  </button>
                  {mobileServices && (
                    <div className="mt-3 flex flex-col gap-1 pl-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={closeMobile}
                          className="py-1.5 text-body-base text-paper/75"
                        >
                          {s.name}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={closeMobile}
                        className="py-1.5 font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/55"
                      >
                        All services →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="border-b border-line py-4 font-display text-display-md"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              onClick={closeMobile}
              className="mt-6 inline-flex h-14 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
            >
              Start a Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
