"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAL_BOOKING_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Cta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-panel", {
          y: 56,
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="cta-panel mesh-bg relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center sm:px-16 sm:py-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/70">
            Begin strong. Finish stronger.
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Ready to start,
            <br />
            or go further<span className="text-crimson">?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Book a free intro call with Coach Don. Never run a step? That
            call is where we figure out your start, together. Already putting
            in the miles? Bring the goal that scares you a little.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-crimson px-8 py-4 font-medium text-white transition-colors hover:bg-cherry"
            >
              Book an Intro Call
            </a>
            <a
              href="mailto:coach@edifyendurance.com"
              className="text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              or email coach@edifyendurance.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
