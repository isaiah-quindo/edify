"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoMark from "./Logo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const credentials = [
  "Co-founder, Don't Stop Running Community",
  "Member, PhilTRA",
  "Member, Asia Skyrunning Council",
  "UTMB Finisher, Chamonix 2023",
  "Team PH, World Skyrunning Championships 2018",
  "Multiple 100K & 100-mile finishes",
];

export default function Coach() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".coach-photo", {
          x: -60,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
        gsap.from(".coach-body > *", {
          y: 36,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="coach"
      ref={ref}
      className="border-y border-white/10 bg-navy/20 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[5fr_7fr]">
        {/* Placeholder portrait — swap for photography */}
        <div className="coach-photo ph-img relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
          <LogoMark className="absolute left-1/2 top-1/2 h-40 w-auto -translate-x-1/2 -translate-y-1/2 text-white opacity-15" />
          <span className="absolute bottom-4 left-5 text-xs uppercase tracking-widest text-white/50">
            Photo placeholder
          </span>
        </div>

        <div className="coach-body">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-crimson">
            Meet your coach
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Don Santillan
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            Don began his running journey in 2012 and co-founded the Don&apos;t
            Stop Running Community. A proud member of PhilTRA and the Asia
            Skyrunning Council since 2026, he represented the Philippines at
            the World Skyrunning Championships in 2018 and completed the Ultra
            Trail du Mont Blanc in 2023, among numerous other 100-kilometer
            and 100-mile finishes that have shaped his deep understanding of
            ultrarunning and race organization.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            That experience is the backbone of Edify Endurance: coaching that
            respects where you are today and builds, week by week, toward
            where you want to go.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {credentials.map((credential) => (
              <li
                key={credential}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
              >
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
