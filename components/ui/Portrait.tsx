import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The About portrait: framed by the same corner brackets as the hero, with a soft violet-blue wash
 * and a slow scan line (hidden under reduced motion).
 */
export function Portrait({
  src,
  width,
  height,
  name,
  caption,
  fileLabel,
  className,
}: {
  src: string;
  width: number;
  height: number;
  name: string;
  /** Optional caption shown over the bottom of the photo. */
  caption?: string;
  /** Small mono label above the photo, e.g. "~/about/anthony.jpg". */
  fileLabel?: string;
  className?: string;
}) {
  return (
    <figure className={cn("group relative mx-auto w-full max-w-[26rem] md:max-w-none", className)}>
      {fileLabel ? (
        <p aria-hidden="true" className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] text-faint">
          <span className="size-1.5 rotate-45 bg-violet" />
          {fileLabel}
        </p>
      ) : null}

      <div className="relative">
        <span aria-hidden="true" className="absolute -top-3 -left-3 z-10 size-14 rounded-tl-[1.9rem] border-t-2 border-l-2 border-violet-soft/60" />
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 z-10 size-14 rounded-br-[1.9rem] border-r-2 border-b-2 border-violet-soft/60" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgb(167_139_250/0.45)] ring-1 ring-white/10">
          <Image
            src={src}
            width={width}
            height={height}
            alt={`Portrait of ${name}`}
            sizes="(min-width: 1024px) 30rem, (min-width: 768px) 40vw, 12rem"
            className="size-full object-cover object-[50%_42%] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgb(167_139_250/0.22),transparent_45%,rgb(96_165_250/0.2))] mix-blend-soft-light" />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(8_9_13/0.85)_100%)]" />
          <span
            aria-hidden="true"
            className="motion-safe-only animate-scan absolute inset-x-0 top-0 h-1/5 bg-[linear-gradient(180deg,transparent,rgb(196_181_253/0.16)_60%,rgb(196_181_253/0.35)_62%,transparent_64%)]"
          />
        </div>
      </div>

      {caption ? (
        <figcaption className="glass absolute right-4 bottom-4 left-4 rounded-2xl px-4 py-3 text-sm text-fg">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
