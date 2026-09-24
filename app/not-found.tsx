import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center overflow-hidden px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Error 404</p>
          <h1 className="mt-6 font-display text-[clamp(44px,6vw,88px)] leading-[0.96]">This box is empty.</h1>
          <p className="mt-6 max-w-md text-body-lg text-paper/70">
            The page you&apos;re after has moved, or never existed. Let&apos;s get you back on track.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-panel border border-paper/30 px-7 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Start a Project
            </Link>
          </div>

          <div className="mt-14 border-t border-line pt-6">
            <p className="font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50">Or explore a service</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex rounded-full border border-line px-4 py-2 text-body-sm text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <span
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[clamp(120px,22vw,320px)] leading-none text-paper/[0.05]"
            aria-hidden
          >
            404
          </span>
          <Image
            src="/404.png"
            alt="An open, empty box surrounded by a compass, a map pin and a question mark"
            width={1254}
            height={1254}
            priority
            className="relative mx-auto h-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
