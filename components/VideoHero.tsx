"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { ChevronsDown } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { company } from "@/lib/data";
import { ShaderBackground } from "@/components/ui/adisyon-shader";

/* easing constants */
const E = { out: "power3.out", io: "expo.inOut", pop: "back.out(2.4)", spring: "elastic.out(1, 0.5)" };

const SERVICE_WORDS = ["LOGISTICS", "MARKETING", "EVENTS", "E-COMMERCE"];
const INDUSTRY_WORDS = ["TRANSPORTATION", "RETAIL", "HOSPITALITY", "TECHNOLOGY", "MEDIA"];
const STEPS = ["DISCOVERY", "STRATEGY", "EXECUTION", "DELIVERY"];
const SATS = Array.from({ length: 6 }, (_, i) => {
  const a = ((i * 60 - 90) * Math.PI) / 180;
  return { x: 200 + 130 * Math.cos(a), y: 200 + 130 * Math.sin(a) };
});
const BOX = "M12 2 22 7v10l-10 5L2 17V7ZM2 7l10 5 10-5M12 12v10";

/** Pill whose word can cycle: `.pc` clips one word, `.pw` is the stack the timeline slides. */
function Pill({ words, big }: { words: string[]; big?: boolean }) {
  return (
    <span className={`hero-pill ${big ? "big" : ""}`}>
      <span className="pc">
        <span className="pw">
          {words.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </span>
      </span>
    </span>
  );
}

const H = "h flex flex-wrap items-center justify-center gap-x-[.3em] font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.3] tracking-[-0.01em]";

/** Scene 2 content, rendered twice: once live, once as the ghost for the vertical smear. */
function Crowns() {
  return (
    <>
      <p className={H}>
        <span className="ln">To Achieve</span>
      </p>
      <Pill words={["ACCOUNTABILITY"]} big />
      <div className="mt-10 flex items-end gap-8 md:gap-12">
        {[0.8, 1.15, 0.8].map((s, i) => (
          <svg key={i} viewBox="0 0 24 24" className="hero-box h-14 w-14 text-white md:h-20 md:w-20" style={{ scale: s }} fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round">
            <path d={BOX} />
          </svg>
        ))}
      </div>
    </>
  );
}

/**
 * Hero: one pinned 100vh stage, a master timeline scrubbed by scroll (~1 viewport per scene, 8 beats).
 * A WebGL wave shader fills the background; text enters char by char (rise + unblur) and leaves up.
 * Lenis smooths the scroll. Press D for a progress readout. Reduced motion: static end state, no Lenis.
 * ponytail: no dice icon or second pill nav, the global BottomNav dock is the site nav.
 */
export function VideoHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const one = (s: string) => q(s)[0] as HTMLElement;

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(q(".sc"), { autoAlpha: 0 });
        gsap.set(one(".s8"), { autoAlpha: 1 });
        return;
      }

      // smooth scroll, driven by gsap's ticker so ScrollTrigger stays in step
      const lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const split = SplitText.create(q(".ln"), { type: "words,chars" });
      const chars = (el: Element) => split.chars.filter((c) => el.contains(c));

      /* ambient loops (independent of scroll) */
      gsap.to(q(".ripple"), { scale: 1.06, transformOrigin: "50% 50%", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.25 });
      gsap.to(q(".hero-box"), { filter: "drop-shadow(0 0 10px rgba(34,211,238,.9))", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
      gsap.to(q(".chev"), { color: "#7ff0ff", filter: "drop-shadow(0 0 8px #7ff0ff)", duration: 0.35, repeat: -1, repeatDelay: 0.7, yoyo: true, stagger: 0.35, ease: "sine.inOut" });
      gsap.to(q(".hint"), { y: 8, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.from(chars(one(".s1")), { y: 40, opacity: 0, filter: "blur(8px)", stagger: 0.03, duration: 0.9, ease: E.out, delay: 0.2 });

      /* pill widths track the visible word; re-measured once fonts are in */
      const setWidths = () => q(".pc").forEach((pc) => gsap.set(pc, { width: ((pc.firstElementChild as HTMLElement).children[0] as HTMLElement).offsetWidth }));
      setWidths();
      document.fonts.ready.then(() => {
        setWidths();
        ScrollTrigger.refresh();
      });

      /* ---- master timeline ---- */
      const tl = gsap.timeline({ defaults: { ease: E.out } });
      const IN = { y: 0, opacity: 1, filter: "blur(0px)", stagger: { amount: 0.35 }, duration: 0.5, ease: E.out }; // fixed total stagger: long lines never take longer to land
      const show = (el: Element, at: number) => tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, at);
      const textIn = (el: Element, at: number) => tl.fromTo(chars(el), { y: 40, opacity: 0, filter: "blur(8px)" }, IN, at);
      const out = (el: Element, at: number) => tl.to(el, { y: -40, autoAlpha: 0, filter: "blur(8px)", duration: 0.4, ease: E.out }, at);
      const cycle = (pill: Element, n: number, times: number[]) => {
        const pw = pill.querySelector(".pw") as HTMLElement;
        const pc = pill.querySelector(".pc") as HTMLElement;
        times.forEach((t, k) => {
          const i = k + 1;
          tl.to(pw, { yPercent: -(i / n) * 100, duration: 0.3, ease: E.io }, t).to(pc, { width: () => (pw.children[i] as HTMLElement).offsetWidth, duration: 0.3, ease: E.io }, t);
        });
      };

      const s1 = one(".s1"), s2 = one(".s2"), g2 = one(".s2g"), s4 = one(".s4"), s5 = one(".s5"), s6 = one(".s6"), s7 = one(".s7"), s8 = one(".s8");

      /* 1: We Design [pill] Experiences */
      cycle(s1.querySelector(".hero-pill")!, SERVICE_WORDS.length, [0.2, 0.4, 0.6]);
      out(s1, 0.85);

      /* 2: To Achieve [PILL] + boxes drawing on */
      show(s2, 1);
      textIn(s2, 1);
      tl.from(s2.querySelector(".hero-pill"), { scale: 0.8, opacity: 0, duration: 0.4 }, 1.15);
      tl.from(q(".s2 .hero-box path"), { drawSVG: "0%", duration: 0.6, stagger: 0.15 }, 1.3);

      /* 3: vertical motion-blur smear + gradient wipe into the middle scenes */
      tl.to(s2, { scaleY: 1.6, autoAlpha: 0, filter: "blur(16px)", duration: 0.5, ease: E.io }, 2);
      tl.fromTo(g2, { autoAlpha: 0.6, scaleY: 1, y: 0, filter: "blur(0px)" }, { autoAlpha: 0, scaleY: 2.4, y: -60, filter: "blur(26px)", duration: 0.5, ease: E.io, immediateRender: false }, 2);

      /* 4: We Solve Complex Briefs through, line + four nodes */
      show(s4, 2.45);
      textIn(s4, 2.45);
      tl.from(q(".s4 .rule"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.6 }, 2.75)
        .from(q(".s4 .node"), { scale: 0, duration: 0.4, ease: E.pop, stagger: 0.12 }, 2.95)
        .from(q(".s4 .step"), { y: 20, opacity: 0, duration: 0.4, stagger: 0.12 }, 3.05);
      out(s4, 3.8);

      /* 5: text + dot cluster, two beats */
      show(s5, 3.95);
      tl.fromTo(q(".s5 .beat-b"), { autoAlpha: 0 }, { autoAlpha: 0, duration: 0.01 }, 3.95);
      textIn(one(".s5 .beat-a"), 4);
      // ripples: the box draws on, rings expand outward from it, then a tile lands at each office position
      tl.from(q(".s5 .hub path"), { drawSVG: "0%", duration: 0.6, stagger: 0.1 }, 4);
      tl.from(q(".s5 .ripple"), { scale: 0.2, opacity: 0, duration: 0.7, stagger: 0.15, transformOrigin: "50% 50%" }, 4.3);
      tl.from(q(".s5 .tile"), { scale: 0, rotation: -90, opacity: 0, duration: 0.5, ease: E.pop, stagger: 0.08, transformOrigin: "50% 50%" }, 4.7);
      tl.to(one(".s5 .beat-a"), { y: -40, autoAlpha: 0, filter: "blur(8px)", duration: 0.4 }, 5);
      tl.fromTo(one(".s5 .beat-b"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 5.1);
      textIn(one(".s5 .beat-b"), 5.1);
      // second beat: the tiles light up one after another
      tl.to(q(".s5 .tile"), { fill: "rgba(34,211,238,0.55)", stroke: "#7ff0ff", duration: 0.3, stagger: 0.1 }, 5.2);
      out(s5, 6.25);

      /* 6: chevrons + industries pill */
      show(s6, 6.35);
      textIn(s6, 6.35);
      cycle(s6.querySelector(".hero-pill")!, INDUSTRY_WORDS.length, [6.65, 6.85, 7.05, 7.25]);
      out(s6, 7.5);

      /* 7: India & the world, subline 0.4 later */
      show(s7, 7.6);
      textIn(one(".s7 .l1"), 7.6);
      textIn(one(".s7 .l2"), 8);
      out(s7, 8.6);

      /* 8: end state, back to teal */
      show(s8, 8.7);
      textIn(s8, 8.7);
      tl.to({}, { duration: 0.3 });

      const readout = one(".dbg");
      const st = ScrollTrigger.create({
        animation: tl,
        trigger: root.current,
        start: "top top",
        end: `+=${tl.duration() * 100}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          readout.textContent = `progress ${self.progress.toFixed(3)}  t ${tl.time().toFixed(2)} / ${tl.duration().toFixed(2)}`;
          if (self.progress > 0.01) gsap.to(q(".hint"), { autoAlpha: 0, duration: 0.3, overwrite: true });
        },
      });
      const key = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "d") readout.style.display = readout.style.display === "block" ? "none" : "block";
      };
      window.addEventListener("keydown", key);

      return () => {
        window.removeEventListener("keydown", key);
        st.kill();
        tl.kill();
        split.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-[#07051a] text-white">
      {/* animated gradient mesh */}
      <ShaderBackground className="absolute inset-0 h-full w-full" />
      {/* scrim: the shader runs bright at the top, keep the type legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0620]/70 via-[#0a0620]/30 to-[#0a0620]/10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/12)_100%]" />

      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label="Open Box Ventures LLP - home" className="flex items-center gap-3">
          <Image src="/logo_nobg.png" alt="" width={48} height={48} className="h-9 w-9 md:h-10 md:w-10" priority />
          <span className="hidden font-display text-body-lg font-semibold sm:block">Open Box Ventures</span>
        </Link>
        <div className="flex items-center gap-6 font-display text-body-base font-semibold text-white md:gap-10">
          <a href={`mailto:${company.email}`} className="hover:text-[#7ff0ff]">Email</a>
          <Link href="/contact" className="hover:text-[#7ff0ff]">Contact</Link>
        </div>
      </header>

      {/* 1 */}
      <div className="sc s1 absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <p className={H}>
          <span className="ln">We Deliver</span>
          <Pill words={SERVICE_WORDS} />
          <span className="ln">Solutions That Move Business</span>
        </p>
      </div>

      {/* 2 + its smear ghost */}
      <div aria-hidden className="sc s2g pointer-events-none absolute inset-0 z-[9] flex flex-col items-center justify-center px-6 text-center">
        <Crowns />
      </div>
      <div className="sc s2 absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <Crowns />
      </div>

      {/* 4 */}
      <div className="sc s4 absolute inset-0 z-10 flex flex-col items-center justify-center gap-14 px-6 text-center">
        <p className={H}>
          <span className="ln">We Solve Complex Briefs</span>
          <span className="ln">through</span>
        </p>
        <div className="relative w-[min(1100px,92vw)]">
          <div className="rule absolute inset-x-0 bottom-[6px] h-px bg-white/60" />
          <div className="grid grid-cols-4">
            {STEPS.map((s) => (
              <div key={s} className="flex flex-col items-center gap-5">
                <span className="step hero-pill !text-[clamp(8px,1.3vw,14px)] !px-3 !py-2 text-center">{s}</span>
                <span className="node relative z-10 block h-3.5 w-3.5 rounded-full bg-[#a78bfa] shadow-[0_0_14px_#a78bfa]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 */}
      <div className="sc s5 absolute inset-0 z-10 mx-auto grid max-w-7xl grid-rows-2 items-center px-6 md:grid-cols-[1.35fr_1fr] md:grid-rows-1 md:gap-6 md:px-10">
        <div className="relative md:text-left">
          <p className={`${H} beat-a !justify-start !text-[clamp(24px,3.6vw,48px)] text-left`}>
            <span className="ln">From</span>
            <Pill words={["DAILY OPERATIONS"]} />
            <span className="ln">that keep</span>
            <span className="ln">BUSINESSES</span>
            <span className="ln">moving</span>
          </p>
          <p className={`${H} beat-b absolute inset-0 !content-center !justify-start !text-[clamp(24px,3.6vw,48px)] text-left`}>
            <span className="ln">To Events that bring</span>
            <Pill words={["PEOPLE"]} />
            <span className="ln">TOGETHER</span>
          </p>
        </div>
        <svg viewBox="0 0 400 400" className="mx-auto h-full max-h-[70vh] w-full" aria-hidden>
          {[60, 100, 140].map((r) => (
            <circle key={r} className="ripple" cx="200" cy="200" r={r} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
          ))}
          <g className="hub" transform="translate(164 164) scale(3)" fill="none" stroke="#fff" strokeWidth="0.5" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 14px rgba(255,255,255,.7))" }}>
            <path d={BOX} />
          </g>
          {SATS.map((p, i) => (
            <rect key={i} className="tile" x={p.x - 14} y={p.y - 14} width="28" height="28" rx="7" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="2" />
          ))}
        </svg>
      </div>

      {/* 6 */}
      <div className="sc s6 absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex text-white/80" aria-hidden>
          {[0, 1, 2].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="chev h-12 w-12 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5 7 7-7 7" />
            </svg>
          ))}
        </div>
        <p className={H}>
          <span className="ln">Across Six Offices</span>
        </p>
        <p className={H}>
          <span className="ln">Our Teams have powered</span>
          <Pill words={INDUSTRY_WORDS} />
        </p>
      </div>

      {/* 7 */}
      <div className="sc s7 absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <p className={`${H} l1`}>
          <span className="ln">For India &amp; for the world</span>
        </p>
        <p className={`${H} l2 !text-[clamp(18px,2.4vw,28px)] text-white/80`}>
          <span className="ln">&amp; we&rsquo;re just getting started</span>
        </p>
      </div>

      {/* 8 */}
      <div className="sc s8 absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <p className={H}>
          <span className="ln">We Deliver Solutions That Move Business</span>
        </p>
      </div>

      <ChevronsDown aria-hidden className="hint absolute bottom-24 right-6 z-20 h-9 w-9 text-[#22d3ee] md:bottom-10 md:right-10" strokeWidth={1.5} />
      <div className="dbg absolute bottom-3 left-3 z-30 hidden font-mono text-[11px] text-white/70" />
    </section>
  );
}
