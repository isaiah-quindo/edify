"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LogoMark from "./Logo";

gsap.registerPlugin(useGSAP);

// When the curtain starts revealing the page — Hero and Nav delay their
// entrance animations by this amount so everything feels sequenced.
export const LOADER_SECONDS = 2.1;

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // Lock scrolling while the loader is up
  useEffect(() => {
    if (done) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        setDone(true);
        return;
      }

      const counter = { value: 0 };
      const countEl = ref.current?.querySelector(
        ".loader-count"
      ) as HTMLElement | null;

      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      tl.from(".loader-mark", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(".loader-bar", { autoAlpha: 0, duration: 0.4 }, "<0.2")
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countEl) {
                countEl.textContent = String(Math.round(counter.value));
              }
            },
          },
          0.1
        )
        .to(
          ".loader-fill",
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.1
        )
        .to(
          ".loader-inner",
          { autoAlpha: 0, y: -20, duration: 0.35, ease: "power2.in" },
          "+=0.15"
        )
        .to(
          ref.current,
          { yPercent: -100, duration: 0.85, ease: "power4.inOut" },
          "<"
        );
    },
    { scope: ref }
  );

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-ink"
    >
      <div className="loader-inner flex h-full flex-col items-center justify-center">
        <div className="loader-mark flex flex-col items-center gap-5">
          <LogoMark className="h-16 w-auto text-white" />
          <span className="font-logo text-lg font-semibold tracking-tight text-white">
            Edify Endurance
          </span>
        </div>

        <div className="loader-bar mt-10 h-px w-48 overflow-hidden rounded-full bg-white/10">
          <div className="loader-fill h-full w-full origin-left scale-x-0 bg-linear-to-r from-electric to-cherry" />
        </div>

        <span className="loader-count absolute bottom-6 right-8 font-display text-7xl font-semibold text-white/15 sm:text-8xl">
          0
        </span>
      </div>
    </div>
  );
}
