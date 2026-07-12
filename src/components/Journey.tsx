"use client";

import { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import summit from "../../public/images/summit-runner.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Milestone = {
  year: string;
  title: string;
  copy: string;
  image?: StaticImageData;
  alt?: string;
};

const milestones: Milestone[] = [
  {
    year: "2012",
    title: "The journey begins",
    copy: "Don takes his first steps as a complete beginner and goes on to co-found the Don't Stop Running Community.",
  },
  {
    year: "2018",
    title: "World Skyrunning Championships",
    copy: "Represents the Philippines on the international skyrunning stage.",
    image: summit,
    alt: "Trail runner cresting a rocky summit above a sea of clouds",
  },
  {
    year: "2023",
    title: "Ultra Trail du Mont Blanc",
    copy: "Finishes UTMB in Chamonix, the pinnacle of mountain ultrarunning.",
  },
  {
    year: "2026",
    title: "Western States Endurance Run finisher",
    copy: "Finishes the Western States 100, the world's oldest 100-mile trail race, from Olympic Valley to Auburn, California.",
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
        // Crossfade the sticky media panel to the last milestone the
        // growing timeline line has reached, in either scroll direction
        const slides = gsap.utils.toArray<HTMLElement>(".journey-slide");
        let active = 0;
        const show = (next: number) => {
          if (next === active || !slides[next]) return;
          gsap.to(slides[active], {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.fromTo(
            slides[next],
            { autoAlpha: 0, scale: 1.06 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
          active = next;
        };

        const list = ref.current?.querySelector<HTMLElement>(".journey-list");
        const items = gsap.utils.toArray<HTMLElement>(".journey-item");

        gsap.from(".journey-line", {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
            onUpdate: (self) => {
              if (!list) return;
              // The line's tip sits at progress × list height; show the
              // last milestone whose dot the tip has passed
              const tipY = self.progress * list.offsetHeight;
              let index = 0;
              items.forEach((item, i) => {
                if (item.offsetTop + 8 <= tipY) index = i;
              });
              show(index);
            },
          },
        });

        items.forEach((item) => {
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

        <div className="mt-14 lg:grid lg:grid-cols-[1fr_minmax(0,400px)] lg:items-start lg:gap-16">
          <div className="journey-list relative pl-8 sm:pl-12">
            <div className="journey-line absolute bottom-0 left-[5px] top-0 w-px bg-gradient-to-b from-electric via-white/40 to-crimson" />

            <ol className="space-y-12 lg:space-y-24">
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

          {/* Sticky media panel: crossfades to the milestone in view.
              First slide is visible by default so reduced-motion users
              still get an image */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`journey-slide absolute inset-0 ${
                      index === 0 ? "" : "invisible opacity-0"
                    }`}
                  >
                    {milestone.image ? (
                      <Image
                        src={milestone.image}
                        alt={milestone.alt ?? ""}
                        fill
                        sizes="(min-width: 1024px) 400px, 100vw"
                        placeholder="blur"
                        className="object-cover"
                      />
                    ) : (
                      <div className="ph-img absolute inset-0" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink/80 to-transparent" />
                    <span className="absolute bottom-4 right-5 font-display text-5xl font-semibold text-white/30">
                      {milestone.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
