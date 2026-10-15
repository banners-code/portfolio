import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless horizontal marquee: the items are rendered twice and the track moves by half its width.
 * Pauses on hover; under reduced motion the global rule stops it. Decorative — give screen readers
 * the same content separately where it matters.
 */
export function Marquee({
  items,
  reverse = false,
  className,
  trackClassName,
  separator,
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
  separator?: ReactNode;
}) {
  const sequence = (copy: number) =>
    items.map((item, index) => (
      <li key={`${copy}-${index}`} className="flex shrink-0 items-center">
        {item}
        {separator ? <span className="flex shrink-0 items-center">{separator}</span> : null}
      </li>
    ));

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group/marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          "flex w-max group-hover/marquee:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          trackClassName,
        )}
      >
        {sequence(0)}
        {sequence(1)}
      </ul>
    </div>
  );
}
