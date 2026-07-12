import LogoMark from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark className="h-7 w-auto text-white" />
          <span className="font-display text-sm font-semibold leading-tight tracking-tight">
            Edify
            <br />
            Endurance
          </span>
        </a>

        <nav className="flex items-center gap-6 text-sm text-white/60">
          <a href="#programs" className="transition-colors hover:text-white">
            Programs
          </a>
          <a href="#coach" className="transition-colors hover:text-white">
            Coach
          </a>
          <a href="#journey" className="transition-colors hover:text-white">
            Journey
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </nav>

        <p className="text-xs text-white/40">
          © 2026 Edify Endurance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
