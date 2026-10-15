"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive scroll reveal. Server-rendered content is always visible; once JavaScript runs,
 * only elements that are still below the viewport are hidden and then faded in as they arrive.
 * Nothing is hidden for reduced-motion users or when JavaScript is unavailable.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal=""]'));
    const viewportBottom = window.innerHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const element of elements) {
      if (element.getBoundingClientRect().top < viewportBottom * 0.92) {
        element.dataset.reveal = "shown";
        continue;
      }
      element.dataset.reveal = "pending";
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      // Never leave content hidden if this effect is torn down mid-way.
      for (const element of elements) {
        if (element.dataset.reveal === "pending") element.dataset.reveal = "shown";
      }
    };
  }, [pathname]);

  return null;
}
