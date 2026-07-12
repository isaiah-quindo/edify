"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const milestones = [
  {
    year: "2012",
    title: "The journey begins",
    copy: "Don starts running and goes on to co-found the Don't Stop Running Community.",
  },
  {
    year: "2018",
    title: "World Skyrunning Championships",
    copy: "Represents the Philippines on the international skyrunning stage.",
  },
  {
    year: "2023",
    title: "Ultra Trail du Mont Blanc",
    copy: "Finishes UTMB in Chamonix, the pinnacle of mountain ultrarunning.",
  },
  {
    year: "2026",
    title: "PhilTRA & Asia Skyrunning Council",
    copy: "Joins PhilTRA and the Asia Skyrunning Council, giving back to the sport through governance and race organization.",
  },
];

export default function Journey() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".journey-heading", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
        gsap.from(".journey-line", {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item) => {
          gsap.from(item, {
            x: 48,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="journey" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="journey-heading max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-crimson">
            The journey
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Fourteen years
            <br />
            <span className="text-white/50">of forward motion.</span>
          </h2>
        </div>

        <div className="journey-list relative mt-14 pl-8 sm:pl-12">
          <div className="journey-line absolute bottom-0 left-[5px] top-0 w-px bg-gradient-to-b from-electric via-white/40 to-crimson" />

          <ol className="space-y-12">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="journey-item relative">
                <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-crimson bg-ink sm:-left-12" />
                <p className="font-display text-3xl font-semibold text-white">
                  {milestone.year}
                </p>
                <h3 className="mt-1 text-lg font-medium text-white/90">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/60">
                  {milestone.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
