"use client";

import type { ProjectFilter } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type FilterId = ProjectFilter | "all";

export function ProjectFilters({
  filters,
  counts,
  active,
  onChange,
}: {
  filters: { id: FilterId; label: string }[];
  counts: Record<FilterId, number>;
  active: FilterId;
  onChange: (id: FilterId) => void;
}) {
  return (
    <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const selected = filter.id === active;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(filter.id)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm transition-[background-color,color,box-shadow,transform] duration-300 active:scale-[0.97]",
              selected
                ? "bg-fg text-ink-950 shadow-[0_8px_30px_-12px_rgb(245_247_252/0.5)]"
                : "text-muted ring-1 ring-line ring-inset hover:bg-white/[0.05] hover:text-fg",
            )}
          >
            {filter.label}
            <span className={cn("font-mono text-[0.7rem]", selected ? "text-ink-950/60" : "text-faint")}>
              <span className="sr-only">, </span>
              {counts[filter.id]}
              <span className="sr-only"> {counts[filter.id] === 1 ? "project" : "projects"}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
