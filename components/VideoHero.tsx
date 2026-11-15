"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { LinkButton } from "./Button";

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
          borderRadius: 0,
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
    // autoplay can be blocked (e.g. low-power mode) - don't trap the visitor behind the overlay
    videoRef.current?.play().catch(finish);
    return () => {
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const shown = phase !== "playing";

  // pointer parallax: values live outside React state, so moving the mouse never re-renders the hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 20 });
  const py = useSpring(my, { stiffness: 80, damping: 20 });
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -28);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -20);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-[calc(100svh-68px)] flex-col justify-center overflow-hidden px-6 pb-14 pt-12 md:px-10 md:pb-16 md:pt-14"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-6">
        <motion.div
          className="relative z-10 min-w-0"
          initial="hidden"
          animate={shown ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="font-display text-[clamp(46px,5.8vw,92px)] leading-[0.92]"
          >
            Every service.
            <br />
            <span className="text-accent">One team.</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-7 max-w-sm text-body-lg text-paper/75"
          >
            Logistics, marketing, events, tech and more, run by one accountable team. Brief us once.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <LinkButton href="/contact">Start a project</LinkButton>
            <LinkButton href="/services" variant="outline">
              Explore services
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* The hub runs wider than the text column and bleeds toward the right edge on large screens.
            Outer layer: pointer parallax (motion values, no re-renders). Inner layer: slow idle float. */}
        <motion.div
          ref={targetRef}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.94 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[1698/926] w-full lg:-mr-10 lg:w-[calc(100%+2.5rem)]"
        >
          <motion.div className="absolute inset-0" style={{ x: px, y: py }}>
            <motion.div
              className="absolute inset-0"
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* transparent PNG; swap /hero.png for any cut-out or photo */}
              <Image
                src="/hero.png"
                alt="Open Box Ventures LLP service lines connected around one hub"
                fill
                sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
                priority
                className="object-contain"
              />
            </motion.div>
          </motion.div>
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
            className="absolute bottom-6 right-6 z-10 border border-paper/40 px-4 py-2 text-body-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink md:bottom-8 md:right-10"
          >
            Skip intro
          </button>
        </div>
      )}
    </section>
  );
}
