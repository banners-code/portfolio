"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** The numbered sections, matching each section heading's index and label. */
const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Selected work" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

/**
 * A numbered section navigator fixed to the right edge of the home page. Hidden over the hero, it
 * slides in once About is reached; an arrow glides to the current section as you scroll, and each
 * number jumps (smoothly) to its section.
 */
export function SectionRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const elements = sections.map((section) => document.getElementById(section.id));
      const about = elements[0];
      if (!about) return;
      setVisible(about.getBoundingClientRect().top <= window.innerHeight * 0.6);
      // The current section is the last one whose top has passed 40% of the viewport.
      let current = 0;
      elements.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) current = index;
      });
      // At the very bottom, the last section is current even if it's too short to reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      inert={!visible}
      className={cn(
        "fixed top-1/2 right-1.5 z-30 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] [--item:2rem] sm:right-4 sm:[--item:2.25rem]",
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
      )}
    >
      <div className="glass relative rounded-full bg-ink-950/55! px-0.5 py-1.5 sm:px-1">
        {/* The pointer: the current section's name and an arrow, gliding to the active number. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1.5 right-full mr-1 flex h-(--item) items-center gap-1.5 transition-transform duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `translateY(calc(${active} * var(--item)))` }}
        >
          <span
            key={active}
            className="animate-fade-in glass hidden rounded-full bg-ink-950/70! px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.1em] whitespace-nowrap text-fg uppercase sm:block"
          >
            {sections[active].label}
          </span>
          <svg viewBox="0 0 10 10" className="size-2.5 shrink-0 fill-violet-soft drop-shadow-[0_0_6px_rgb(196_181_253/0.8)]">
            <path d="M1 0.5 9 5 1 9.5Z" />
          </svg>
        </span>

        <ol className="flex flex-col">
          {sections.map((section, index) => {
            const current = index === active;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-label={`${String(index + 1).padStart(2, "0")} ${section.label}`}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "grid h-(--item) w-7 place-items-center rounded-full font-mono text-[0.68rem] tabular-nums transition-colors duration-300 sm:w-8 sm:text-[0.72rem]",
                    current ? "bg-white/[0.08] text-fg" : "text-faint hover:text-fg",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
