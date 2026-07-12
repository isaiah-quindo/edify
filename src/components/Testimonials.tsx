"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SLIDE_SECONDS = 6;

// Placeholder testimonials: swap for real athlete quotes when available
const testimonials = [
  {
    quote:
      "I came to Coach Don barely able to run 5K without stopping. Eighteen months later I crossed my first 50K finish line. He met me exactly where I was and built from there.",
    name: "Migs R.",
    detail: "First 50K finisher",
  },
  {
    quote:
      "The structure changed everything. No more guessing what to do each week. My marathon went from 4:12 to 3:38 in one training cycle.",
    name: "Andrea L.",
    detail: "Marathon PR, 4:12 to 3:38",
  },
  {
    quote:
      "Don has actually raced the mountains he coaches you for. When he talks about pacing a 100K with 6,000 meters of vert, it comes from experience, not a textbook.",
    name: "Paolo S.",
    detail: "100K mountain ultra finisher",
  },
  {
    quote:
      "I'm not a racer. I just wanted to feel strong again after years at a desk. The plan fit around my work and my kids, and it stuck. Two years in and I haven't stopped.",
    name: "Karen D.",
    detail: "General fitness, 2 years coached",
  },
  {
    quote:
      "After my knee injury I thought trail running was over for me. The patient rebuild Don mapped out got me back on the mountain, stronger than before.",
    name: "JC V.",
    detail: "Post-injury comeback",
  },
  {
    quote:
      "From my first skyrace to representing the country, the jump felt impossible until it wasn't. Every block had a purpose. Every week built on the last.",
    name: "Bea T.",
    detail: "National skyrunning athlete",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const timerTween = useRef<gsap.core.Tween | null>(null);
  const [index, setIndex] = useState(0);

  const count = testimonials.length;
  const active = testimonials[index];

  // One-time section reveal
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".testimonial-heading", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
        gsap.from(".testimonial-stage", {
          y: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
    },
    { scope: ref }
  );

  // Per-slide entrance + line timer; re-runs whenever the index changes
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        // No auto-advance: static full line, manual navigation only
        gsap.set(".timer-fill", { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        ".testimonial-quote-wrap",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".testimonial-photo",
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      timerTween.current = gsap.fromTo(
        ".timer-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SLIDE_SECONDS,
          ease: "none",
          onComplete: () => setIndex((i) => (i + 1) % count),
        }
      );
    },
    { dependencies: [index], scope: ref }
  );

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="border-y border-white/10 bg-navy/20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="testimonial-heading max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-crimson">
            Testimonials
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Momentum,
            <br />
            <span className="text-white/50">in their words.</span>
          </h2>
        </div>

        <figure
          className="testimonial-stage mt-16 flex flex-col gap-10 sm:flex-row lg:gap-16"
          onMouseEnter={() => timerTween.current?.pause()}
          onMouseLeave={() => timerTween.current?.play()}
        >
          {/* Big portrait placeholder: swap for athlete photography */}
          <div className="testimonial-photo flex aspect-[3/4] w-48 shrink-0 items-center justify-center self-start rounded-2xl bg-linear-to-br from-electric to-crimson sm:w-64 lg:w-72">
            <span className="font-display text-7xl font-semibold text-white">
              {active.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <span
              aria-hidden
              className="block font-display text-6xl leading-none text-crimson"
            >
              &ldquo;
            </span>

            <div
              aria-live="polite"
              className="testimonial-quote-wrap mt-4 min-h-[14rem] sm:min-h-[12rem]"
            >
              <blockquote className="text-xl leading-relaxed text-white/85 sm:text-2xl">
                {active.quote}
              </blockquote>
              <figcaption className="mt-6">
                <span className="block text-sm font-medium text-white">
                  {active.name}
                </span>
                <span className="block text-xs text-white/55">
                  {active.detail}
                </span>
              </figcaption>
            </div>

            {/* Controls: full-width line timer, arrows and counter below */}
            <div className="mt-10">
              <div className="relative h-0.5 overflow-hidden rounded-full bg-white/10">
                <div className="timer-fill absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-electric to-cherry" />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>

                <span className="text-xs tabular-nums text-white/50">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
