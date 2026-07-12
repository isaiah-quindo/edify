"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LogoMark from "./Logo";
import { LOADER_SECONDS } from "./Loader";
import { CAL_BOOKING_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const links = [
  { label: "Programs", href: "#programs" },
  { label: "Coach", href: "#coach" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  // Reveal the nav background once the user scrolls past the top —
  // functional styling, so it runs regardless of reduced-motion.
  useEffect(() => {
    const onScroll = () => {
      ref.current?.classList.toggle("nav-scrolled", window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y: -72,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: LOADER_SECONDS + 0.15,
        });
      });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className="site-nav fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark className="h-8 w-auto text-white" />
          <span className="font-display text-lg font-semibold leading-none tracking-tight">
            Edify
            <br />
            Endurance
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-crimson px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cherry"
        >
          Start Training
        </a>
      </div>
    </header>
  );
}
