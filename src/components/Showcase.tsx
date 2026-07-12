"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import summit from "../../public/images/summit-runner.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MEDIA_BOX = "aspect-[3/2] w-[clamp(200px,30vw,440px)]";

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const media = ref.current?.querySelector<HTMLElement>(
          ".showcase-media"
        );
        if (!media) return;

        // The media is exactly viewport-centered, so only a small margin is
        // needed to guarantee edge coverage
        const coverScale = () =>
          1.08 *
          Math.max(
            window.innerWidth / media.offsetWidth,
            window.innerHeight / media.offsetHeight
          );

        // Pin only: holds the section once it fills the screen
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          invalidateOnRefresh: true,
        });

        // Scrub starts as soon as the section begins rising over the hero
        // ("top bottom"). Range = 100% approach + 100% pinned; timeline
        // units match (1 ≈ one viewport of scroll). One continuous motion:
        // the halves converge while the image grows straight to full
        // cover, both finishing together at 1.85, with a short full-bleed
        // hold before the pin releases.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "+=195%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ".showcase-left",
          { x: "-28vw" },
          { x: 0, ease: "none", duration: 1.85 },
          0
        )
          .fromTo(
            ".showcase-right",
            { x: "28vw" },
            { x: 0, ease: "none", duration: 1.85 },
            0
          )
          .fromTo(
            ".showcase-media",
            { scale: 0.35 },
            { scale: coverScale, ease: "power1.in", duration: 1.85 },
            0
          )
          .to(".showcase-media", { borderRadius: 0, duration: 0.3 }, 1.4)
          .fromTo(
            ".showcase-sub",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.25 },
            1.6
          );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative z-10 overflow-hidden bg-ink">
      <div className="relative flex min-h-svh items-center justify-center px-6">
        {/* Image: exactly viewport-centered, behind the text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div
            className={`showcase-media relative overflow-hidden rounded-xl ${MEDIA_BOX}`}
          >
            <Image
              src={summit}
              alt="Trail runner cresting a rocky summit above a sea of clouds"
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>

        {/* Headline: equal flex halves meet at the exact center with a
            word-space gap, reading as one phrase above the growing image */}
        <div className="relative z-10 flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-0">
          <span className="showcase-left whitespace-nowrap font-display text-[clamp(2.25rem,7vw,6.5rem)] font-semibold leading-none tracking-tight sm:flex-1 sm:text-right">
            Every summit
          </span>

          <span className="showcase-right whitespace-nowrap font-display text-[clamp(2.25rem,7vw,6.5rem)] font-semibold leading-none tracking-tight sm:flex-1 sm:pl-[0.24em] sm:text-left">
            starts here
          </span>
        </div>

        {/* Scrim: anchors the paragraph against the photo once it covers */}
        <div className="showcase-scrim pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-72 bg-linear-to-t from-ink/85 via-ink/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-14 z-10 flex justify-center px-6">
          <p className="showcase-sub max-w-md text-center text-white [text-shadow:0_1px_16px_rgba(4,6,26,0.9)]">
            Training is how you get there. Wherever your goal sits, we&apos;ll
            map the route together.
          </p>
        </div>
      </div>
    </section>
  );
}
