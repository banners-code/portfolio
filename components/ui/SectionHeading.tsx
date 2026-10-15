import type { ReactNode } from "react";
import { cn, revealDelay } from "@/lib/utils";

/** Section intro: a numbered mono eyebrow, the heading and an optional lead paragraph. */
export function SectionHeading({
  index,
  eyebrow,
  command,
  title,
  description,
  id,
  className,
  children,
}: {
  index: string;
  eyebrow: string;
  /** Optional terminal-style hint shown after the eyebrow, e.g. "whoami". Decorative. */
  command?: string;
  title: ReactNode;
  description?: ReactNode;
  /** id of the heading, for aria-labelledby on the section. */
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10", className)}>
      <div className="max-w-2xl" data-reveal="">
        <p className="text-eyebrow flex items-center gap-3 text-violet-soft">
          <span className="text-faint">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet/70 to-transparent" />
          {eyebrow}
          {command ? (
            <span aria-hidden="true" className="ml-1 rounded-md bg-white/[0.04] px-2 py-1 tracking-[0.04em] text-faint normal-case ring-1 ring-white/[0.06]">
              <span className="text-violet">$</span> {command}
            </span>
          ) : null}
        </p>
        <h2 id={id} className="text-heading mt-5 font-semibold text-fg">
          {title}
        </h2>
        {description ? <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {children ? (
        <div className="md:shrink-0" data-reveal="" style={revealDelay(120)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
