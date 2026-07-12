"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoMark from "./Logo";
import HeroBackground from "./HeroBackground";
import { LOADER_SECONDS } from "./Loader";
import { CAL_BOOKING_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const headline = ["Begin strong.", "Finish stronger."];

const stats = [
  { value: "2012", label: "Running journey began" },
  { value: "2018", label: "World Skyrunning Championships,\nTeam PH" },
  { value: "2023", label: "UTMB Finisher, Chamonix" },
  { value: "2026", label: "Western States Endurance Run finisher" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Pin the hero while the showcase section scrolls up to cover it.
        // "bottom bottom" means a hero taller than the viewport is scrolled
        // through fully before pinning; pinSpacing: false lets the next
        // section overlap instead of leaving a gap.
        // One viewport of scroll = the showcase fully covering the hero
        // (measuring the sibling no longer works: the showcase's own pin
        // wraps it in a taller pin-spacer)
        // Fade the content away while the showcase covers the pinned hero.
        // Driven from the pin's own progress: a separate ScrollTrigger on the
        // same element would get offset by the pin distance on refresh and
        // never fire while the hero is still visible.
        const fade = gsap.to(".hero-content", {
          autoAlpha: 0,
          y: -48,
          ease: "none",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: ref.current,
          start: "bottom bottom",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          // Fully faded by 60% of the pin so it never peeks through
          onUpdate: (self) => fade.progress(Math.min(self.progress / 0.6, 1)),
        });

        // Wait for the loader curtain to start lifting before entering
        const tl = gsap.timeline({
          delay: LOADER_SECONDS,
          defaults: { ease: "power3.out" },
        });

        tl.from(".hero-line", {
          yPercent: 115,
          duration: 1,
          stagger: 0.12,
        })
          .from(
            ".hero-sub",
            // immediateRender hides these from first paint — without it they
            // are briefly visible while the loader curtain lifts (flicker)
            { y: 24, autoAlpha: 0, duration: 0.7, immediateRender: true },
            "-=0.5"
          )
          .from(
            ".hero-cta",
            { y: 24, autoAlpha: 0, duration: 0.6, immediateRender: true },
            "-=0.45"
          )
          .from(
            ".hero-stat",
            {
              y: 28,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.08,
              immediateRender: true,
            },
            "-=0.35"
          )
          .from(
            ".hero-mark",
            {
              autoAlpha: 0,
              scale: 0.85,
              duration: 1.2,
              ease: "power2.out",
              immediateRender: true,
            },
            0.4
          );

        // Slow ambient drift on the background glows
        gsap.to(".hero-glow", {
          xPercent: 6,
          yPercent: -5,
          duration: 10,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 2,
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative z-0 flex min-h-svh flex-col justify-end overflow-hidden pt-32"
    >
      {/* Background — static gradient as first paint, Three.js shader fades in over it */}
      <div className="mesh-bg absolute inset-0 -z-20" />
      <HeroBackground />
      {/* Radial gradients, not filter blurs — Safari repaints large blurs
          on every frame, which wrecks scroll performance */}
      <div className="hero-glow absolute -left-40 top-1/4 -z-10 h-[44rem] w-[44rem] bg-[radial-gradient(circle,rgba(46,70,255,0.28)_0%,rgba(46,70,255,0.10)_45%,transparent_70%)]" />
      <div className="hero-glow absolute -right-32 top-8 -z-10 h-[38rem] w-[38rem] bg-[radial-gradient(circle,rgba(227,15,61,0.28)_0%,rgba(227,15,61,0.10)_45%,transparent_70%)]" />

      {/* Watermark mark */}
      <LogoMark className="hero-mark pointer-events-none absolute -right-16 top-1/2 -z-10 h-[70svh] w-auto -translate-y-1/2 text-white opacity-[0.06]" />

      <div className="hero-content mx-auto w-full max-w-6xl px-6 pb-16">
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[1.05] tracking-tight">
          {headline.map((line) => (
            // pb gives Inter Tight's descenders room inside the reveal
            // mask; the negative mb cancels it so leading stays tight
            <span
              key={line}
              className="-mb-[0.15em] block overflow-hidden pb-[0.15em]"
            >
              <span className="hero-line block">
                {line === "Finish stronger." ? (
                  <>
                    Finish stronger<span className="text-crimson">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-sub max-w-xl text-lg leading-relaxed text-white/70">
            Your first 5K to your first Marathon. Personalized coaching by Don
            Santillan, with a plan for exactly where you are and a coach with
            you every step further.
          </p>

          <div className="hero-cta flex shrink-0 items-center gap-4">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-crimson px-7 py-3.5 font-medium text-white transition-colors hover:bg-cherry"
            >
              Book an Intro Call
            </a>
            <a
              href="#programs"
              className="hidden rounded-full border border-white/20 px-7 py-3.5 font-medium text-white/90 transition-colors hover:border-white/50 hover:text-white sm:inline-block"
            >
              Explore Programs
            </a>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="hero-stat">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white">
                {stat.value}
              </dd>
              <dd className="mt-1 whitespace-pre-line text-sm text-white/60">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
