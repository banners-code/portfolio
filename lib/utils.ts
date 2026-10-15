import type { CSSProperties } from "react";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Builds a link to a section of the home page that works from any route. */
export function sectionHref(id: string): string {
  return id === "home" ? "/#home" : `/#${id}`;
}

/** Inline style that staggers a [data-reveal] element or a hero entrance (CSS custom property). */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms`, animationDelay: `${ms}ms` } as CSSProperties;
}
