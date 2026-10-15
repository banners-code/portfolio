"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhoamiTerminal } from "./WhoamiTerminal";

const SEEN_KEY = "intro-seen";

/**
 * Runs before first paint: turns the intro on with `html[data-intro]`, once per browser session,
 * and never for visitors who prefer reduced motion. Without JavaScript the intro never shows.
 */
const introScript = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${SEEN_KEY}"))return;document.documentElement.setAttribute("data-intro","")}catch(e){}})()`;

/** Ends the intro (once): remember it for this session, fade the overlay and release the page. */
function finishIntro(overlay: HTMLElement | null) {
  const html = document.documentElement;
  if (!overlay || !html.hasAttribute("data-intro")) return;
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the intro simply plays again next time.
  }
  overlay.setAttribute("data-leaving", "");
  html.removeAttribute("data-intro");
  window.setTimeout(() => overlay.removeAttribute("data-leaving"), 800);
}

/**
 * The home page intro: the `whoami` boot sequence types out full screen, then the overlay fades
 * away and the hero animates in. Skippable with the button or Escape; it gives up after a few
 * seconds in any case, so it can never trap the page.
 */
export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro(overlayRef.current);
    };
    const fallback = window.setTimeout(() => finishIntro(overlayRef.current), 9000);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <div ref={overlayRef} className="intro-overlay fixed inset-0 z-[200] place-items-center bg-ink-950 px-4">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="animate-drift h-[34rem] w-[min(64rem,140vw)] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.2),rgb(96_165_250/0.06)_55%,transparent)] blur-2xl" />
        </div>

        <div className="intro-panel relative w-full max-w-[36rem]">
          <Wordmark className="mx-auto mb-8 h-8 w-auto sm:h-9" priority sizes="200px" />
          <WhoamiTerminal onComplete={() => window.setTimeout(() => finishIntro(overlayRef.current), 700)} />
        </div>

        <button
          type="button"
          onClick={() => finishIntro(overlayRef.current)}
          className="absolute right-4 bottom-6 min-h-11 rounded-full px-4 font-mono text-[0.72rem] tracking-[0.12em] text-faint uppercase ring-1 ring-white/10 transition-colors hover:text-fg sm:right-8 sm:bottom-8"
        >
          Skip intro
        </button>
      </div>
    </>
  );
}
