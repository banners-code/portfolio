"use client";

import { useEffect, useState } from "react";

/**
 * Scrollspy shared by the navbar, mobile menu and section rail, so they always agree: the current
 * section is the one crossing a thin band just above the middle of the viewport. An observer
 * (not a scroll handler) also catches layout shifts, such as an FAQ answer opening.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!enabled) return;
    const sections = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
