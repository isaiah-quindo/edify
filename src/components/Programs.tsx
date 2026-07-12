"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const programs = [
  {
    number: "01",
    title: "Road Running",
    copy: "Your first 5K, your first marathon, or the PR that keeps slipping away. Structured blocks built around your schedule, your paces, and your goal race.",
    points: [
      "5K to marathon training plans",
      "Pacing, speedwork & threshold sessions",
      "Race-day strategy & taper",
    ],
  },
  {
    number: "02",
    title: "Trail Running",
    copy: "Start with your first trail race and see how far the mountains take you, coached by someone who has raced all the way to 100 miles. Vert, technical descents, and long days on feet.",
    points: [
      "First trail race to ultra preparation",
      "Climbing, descending & terrain skills",
      "Fueling & nutrition for long efforts",
    ],
  },
  {
    number: "03",
    title: "General Fitness",
    copy: "Build a durable, capable body for life, not just race day. Sustainable training that fits around work, family, and everything else.",
    points: [
      "Strength training for runners",
      "Mobility & injury resilience",
      "Habit-first, sustainable programming",
    ],
  },
];

export default function Programs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".program-heading", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
        gsap.from(".program-card", {
          y: 64,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".program-grid", start: "top 78%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="programs" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="program-heading max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-crimson">
            Programs
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pick your discipline.
            <br />
            <span className="text-white/50">We build the plan.</span>
          </h2>
        </div>

        <div className="program-grid mt-14 grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.number}
              className="program-card group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
            >
              {/* Placeholder image — swap for photography */}
              <div className="ph-img relative h-44 w-full">
                <span className="absolute bottom-3 right-4 font-display text-5xl font-semibold text-white/25">
                  {program.number}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {program.copy}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-white/80">
                  {program.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-white transition-colors group-hover:text-cherry"
                >
                  Get started
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
