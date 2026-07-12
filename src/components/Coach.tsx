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
  "Western States Endurance Run finisher, 2026",
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
            Don started in 2012 the way most runners do: as a beginner
            figuring it out one run at a time. That journey took him from
            co-founding the Don&apos;t Stop Running Community to representing
            the Philippines at the World Skyrunning Championships in 2018,
            finishing the Ultra Trail du Mont Blanc in 2023, and completing
            the Western States Endurance Run in 2026. He has been at the very
            start of the road and past its hardest miles, so if
            you&apos;re on your first week, he remembers exactly what that
            feels like, and if you&apos;re chasing a limit, he has already
            been beyond it.
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
