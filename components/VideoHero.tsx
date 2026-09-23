"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { company } from "@/lib/data";

// Intro plays once per full page load; client-side navigations back to "/" skip it.
let introPlayed = false;

export function VideoHero() {
  const reduced = useReducedMotion();
  // playing: full-screen video · in: shrinking into the hero image · done: overlay gone
  const [phase, setPhase] = useState<"playing" | "in" | "done">(
    introPlayed ? "done" : "playing",
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const shrinking = useRef(false);

  const finish = () => {
    if (shrinking.current) return;
    shrinking.current = true;
    document.documentElement.style.overflow = "";
    const box = boxRef.current;
    const target = targetRef.current;
    if (!box || !target) return setPhase("done");
    const r = target.getBoundingClientRect();
    gsap
      .timeline({ onComplete: () => setPhase("done") })
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.9, ease: "power2.inOut" },
        0,
      )
      .to(
        box,
        {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
          borderRadius: 12,
          duration: 1.1,
          ease: "power3.inOut",
        },
        0,
      )
      .add(() => setPhase("in"), 0.8)
      .to(box, { opacity: 0, duration: 0.5 }, 0.9);
  };

  useEffect(() => {
    if (phase !== "playing") return;
    introPlayed = true;
    if (reduced) return setPhase("done");
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    // autoplay can be blocked (e.g. low-power mode) — don't trap the visitor behind the overlay
    videoRef.current?.play().catch(finish);
    return () => {
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const shown = phase !== "playing";

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(100% 60% at 90% 100%, rgba(255,255,255,0.06), transparent 55%), var(--color-ink)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          className="relative"
          initial="hidden"
          animate={shown ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60"
          >
            {company.tagline}
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="mt-6 max-w-2xl font-display text-[clamp(40px,5.6vw,80px)] leading-[0.98]"
          >
            Every service. One team.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-6 max-w-lg text-body-lg text-paper/75"
          >
            Logistics, marketing, events, technology, e-commerce, content,
            photography and advertising — every service line under one
            accountable team, so you brief once and we deliver.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="inline-flex h-14 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-panel border border-paper/30 px-7 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          ref={targetRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/hero.png"
            alt="Open Box Ventures service lines connected around one hub"
            width={1698}
            height={926}
            priority
            className="h-auto w-full"
          />
        </motion.div>
      </div>

      {phase !== "done" && (
        <div ref={overlayRef} className="fixed inset-0 z-[70]">
          <div ref={backdropRef} className="absolute inset-0 bg-ink" />
          <div
            ref={boxRef}
            className="fixed left-0 top-0 h-svh w-screen overflow-hidden"
          >
            <video
              ref={videoRef}
              src="/hero-video-final.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finish}
              onError={finish}
            />
          </div>
          <button
            ref={skipRef}
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-6 z-10 font-mono text-utility-xs uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper md:bottom-8 md:right-10"
          >
            Skip
          </button>
        </div>
      )}
    </section>
  );
}
