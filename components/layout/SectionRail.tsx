"use client";

import { useEffect, useRef, useState } from "react";
import { numberedSections, sectionNumber } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./useActiveSection";

const spyIds = ["home", ...numberedSections.map((section) => section.id)];

/**
 * A numbered section navigator fixed to the right edge of the home page. Hidden over the hero, it
 * appears once About is reached; an arrow glides to the current section and each number jumps to
 * its section. It shares the navbar's scrollspy, so both always mark the same section.
 *
 * Below xl the page gutter is narrower than the rail, so there it only shows while you scroll (or
 * hover / focus it) and fades away when you stop. The section name beside the arrow shows briefly
 * whenever the section changes, then fades, so it never sits on top of the content. On very short
 * screens (a phone in landscape) the rail is hidden, as it would collide with the chat button.
 */
export function SectionRail() {
  const active = useActiveSection(spyIds);
  const visible = active !== "home";
  const activeIndex = Math.max(0, numberedSections.findIndex((section) => section.id === active));
  const [awake, setAwake] = useState(false);
  const idleTimer = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setAwake(true);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setAwake(false), 1500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(idleTimer.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      inert={!visible}
      className={cn(
        "group fixed top-1/2 right-1.5 z-30 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] [--item:2rem] sm:right-4 sm:[--item:2.25rem] [@media(max-height:480px)]:hidden",
        !visible
          ? "pointer-events-none scale-90 opacity-0"
          : awake
            ? "opacity-100"
            : "opacity-100 max-xl:pointer-events-none max-xl:opacity-0 max-xl:hover:pointer-events-auto max-xl:hover:opacity-100 max-xl:focus-within:pointer-events-auto max-xl:focus-within:opacity-100",
      )}
    >
      <div className="glass relative rounded-full bg-ink-950/55! px-0.5 py-1.5 sm:px-1">
        {/* The pointer: an arrow gliding to the active number, with the section's name shown briefly. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1.5 right-full mr-1 flex h-(--item) items-center gap-1.5 transition-transform duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `translateY(calc(${activeIndex} * var(--item)))` }}
        >
          <span
            key={active}
            className="glass animate-rail-label rounded-full bg-ink-950/80! px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.1em] whitespace-nowrap text-fg uppercase group-hover:animate-none group-hover:opacity-100 sm:text-[0.65rem]"
          >
            {numberedSections[activeIndex].label}
          </span>
          <svg viewBox="0 0 10 10" className="size-2.5 shrink-0 fill-violet-soft drop-shadow-[0_0_6px_rgb(196_181_253/0.8)]">
            <path d="M1 0.5 9 5 1 9.5Z" />
          </svg>
        </span>

        <ol className="flex flex-col">
          {numberedSections.map((section) => {
            const current = section.id === active;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-label={`${sectionNumber(section.id)} ${section.label}`}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "grid h-(--item) w-7 place-items-center rounded-full font-mono text-[0.68rem] tabular-nums transition-colors duration-300 sm:w-8 sm:text-[0.72rem]",
                    current ? "bg-white/[0.08] text-fg" : "text-faint hover:text-fg",
                  )}
                >
                  {sectionNumber(section.id)}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
