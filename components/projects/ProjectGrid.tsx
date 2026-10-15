"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import type { ProjectFilter, ProjectLayout } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectFilters, type FilterId } from "./ProjectFilters";

export type GridEntry = {
  slug: string;
  title: string;
  filters: ProjectFilter[];
  layout: ProjectLayout;
  /** The server-rendered card. */
  card: ReactNode;
};

/**
 * Editorial grid rhythm: consecutive cards pair up 7/5, then 5/7; "wide" cards and any card
 * left without a partner take the full row (and switch to their side-by-side layout).
 */
function spanClasses(entries: GridEntry[]): string[] {
  const spans: string[] = [];
  let pair = 0;
  for (let index = 0; index < entries.length; ) {
    const current = entries[index];
    const next = entries[index + 1];
    if (current.layout !== "wide" && next && next.layout !== "wide") {
      spans.push(...(pair % 2 === 0 ? ["lg:col-span-7", "lg:col-span-5"] : ["lg:col-span-5", "lg:col-span-7"]));
      pair += 1;
      index += 2;
    } else {
      spans.push("md:col-span-2 lg:col-span-12");
      index += 1;
    }
  }
  return spans;
}

export function ProjectGrid({
  entries,
  filters,
}: {
  entries: GridEntry[];
  filters: { id: FilterId; label: string }[];
}) {
  const [active, setActive] = useState<FilterId>("all");
  const [interacted, setInteracted] = useState(false);

  const visible = active === "all" ? entries : entries.filter((entry) => entry.filters.includes(active));
  const spans = spanClasses(visible);
  const counts = Object.fromEntries(
    filters.map((filter) => [
      filter.id,
      filter.id === "all" ? entries.length : entries.filter((entry) => entry.filters.includes(filter.id as ProjectFilter)).length,
    ]),
  ) as Record<FilterId, number>;
  const activeLabel = filters.find((filter) => filter.id === active)?.label ?? "All Work";

  // Border illumination follows the pointer; one delegated listener for the whole grid.
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-glow]");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div>
      <ProjectFilters
        filters={filters}
        counts={counts}
        active={active}
        onChange={(id) => {
          setActive(id);
          setInteracted(true);
        }}
      />
      <p className="sr-only" aria-live="polite">
        {interacted ? `${activeLabel}: showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}.` : ""}
      </p>
      <div onPointerMove={onPointerMove} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {visible.map((entry, index) => (
          <div
            key={entry.slug}
            className={cn(spans[index], interacted && "animate-fade-in")}
            style={interacted ? { animationDelay: `${index * 70}ms` } : undefined}
          >
            {entry.card}
          </div>
        ))}
      </div>
    </div>
  );
}
