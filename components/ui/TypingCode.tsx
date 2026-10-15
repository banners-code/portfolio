"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export type CodeTone = "comment" | "keyword" | "name" | "key" | "string" | "plain" | "fn";
export type CodeLine = [CodeTone, string][];
export type CodeSnippet = CodeLine[];

export type TypingVariant = "ghost" | "terminal";

const toneClasses: Record<TypingVariant, Record<CodeTone, string>> = {
  // Translucent: a background layer, so text on top keeps its contrast.
  ghost: {
    comment: "text-white/[0.2]",
    keyword: "text-violet/45",
    name: "text-fg/40",
    key: "text-violet-soft/[0.38]",
    string: "text-blue-soft/[0.38]",
    plain: "text-fg/[0.26]",
    fn: "text-blue/45",
  },
  // Readable foreground text for a terminal panel.
  terminal: {
    comment: "text-faint",
    keyword: "text-violet",
    name: "text-fg",
    key: "text-faint",
    string: "text-blue-soft",
    plain: "text-fg/80",
    fn: "text-violet-soft",
  },
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

const lineText = (line: CodeLine) => line.map(([, text]) => text).join("");

/**
 * Decorative code that types itself out line by line. Looping (default): holds, fades and moves to the
 * next snippet. With  it types once and leaves the caret blinking at the end.
 * Characters are revealed by widening each monospace line in `ch` units, so typing touches one
 * inline style per keystroke instead of re-rendering React. It only runs while on screen and the
 * tab is visible; with reduced motion (and before JavaScript loads) the code is simply shown, static.
 */
export function TypingCode({
  snippets,
  className,
  variant = "ghost",
  loop = true,
  gutter = variant === "ghost",
  startHidden = false,
  speed = 1,
  onComplete,
}: {
  snippets: CodeSnippet[];
  className?: string;
  variant?: TypingVariant;
  loop?: boolean;
  gutter?: boolean;
  /**
   * Render hidden on the server so above-the-fold text never flashes fully typed before typing starts.
   * A <noscript> rule shows it when JavaScript is off; reduced-motion visitors get it static after hydration.
   */
  startHidden?: boolean;
  /** Typing speed multiplier (2 = twice as fast). */
  speed?: number;
  /** Called once when a type-once instance finishes typing. */
  onComplete?: () => void;
}) {
  const toneClass = toneClasses[variant];
  const rootRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });
  // A type-once instance stays typed after it finishes, even if it scrolls out of view and back.
  const finishedRef = useRef(false);
  // Where typing paused, so it resumes rather than restarting when the tab or section comes back.
  const progressRef = useRef<{ index: number; row: number; column: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  // Server snapshots assume "reduced" / "hidden", so the first paint is the static code.
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => !startHidden,
  );
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);

  const snippet = snippets[index % snippets.length];
  const animate = !reduced;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animate) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [animate]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animate || !inView || !pageVisible || (!loop && finishedRef.current)) return;

    const block = root.querySelector<HTMLElement>("[data-block]");
    const caret = root.querySelector<HTMLElement>("[data-caret]");
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-line]"));
    if (!block || !caret) return;

    const lengths = lines.map((line) => Number(line.dataset.length ?? 0));
    const indents = lines.map((line) => Number(line.dataset.indent ?? 0));
    const saved = progressRef.current?.index === index ? progressRef.current : null;
    let row = saved?.row ?? 0;
    let column = saved?.column ?? indents[0] ?? 0;
    let timer = 0;
    const save = () => {
      progressRef.current = { index, row, column };
    };

    const placeCaret = () => {
      caret.style.transform = `translate(${column}ch, ${row * 1.9}em)`;
    };

    lines.forEach((line, lineIndex) => {
      const width = lineIndex < row ? lengths[lineIndex] : lineIndex === row ? column : 0;
      line.style.width = `${width}ch`;
    });
    block.style.opacity = "1";
    caret.style.opacity = "1";
    placeCaret();

    const tick = () => {
      if (row >= lines.length) {
        if (!loop) {
          // Typed once: rest the caret at the end of the last line.
          finishedRef.current = true;
          row = lines.length - 1;
          column = lengths[row] ?? 0;
          placeCaret();
          onCompleteRef.current?.();
          return;
        }
        // Hold the finished snippet, fade it out, then move on to the next one.
        timer = window.setTimeout(() => {
          block.style.opacity = "0";
          caret.style.opacity = "0";
          timer = window.setTimeout(() => setIndex((current) => current + 1), 650);
        }, 2800);
        return;
      }

      if (column >= lengths[row]) {
        row += 1;
        column = indents[row] ?? 0;
        if (row < lines.length) lines[row].style.width = `${column}ch`;
        placeCaret();
        save();
        timer = window.setTimeout(tick, (lengths[row - 1] === 0 ? 120 : 260) / speed);
        return;
      }

      column += 1;
      lines[row].style.width = `${column}ch`;
      placeCaret();
      save();
      // A little rhythm: slightly uneven keystrokes, a pause after punctuation.
      const previous = lineText(snippet[row]).charAt(column - 1);
      const delay = /[,;{(=]/.test(previous) ? 110 : 34 + ((column * 13) % 29);
      timer = window.setTimeout(tick, delay / speed);
    };

    timer = window.setTimeout(tick, saved ? 150 : 500);
    return () => window.clearTimeout(timer);
  }, [animate, inView, pageVisible, index, snippet, loop, speed]);

  return (
    <div ref={rootRef} aria-hidden="true" data-typing-root="" className={cn("font-mono leading-[1.9] select-none", className)}>
      {startHidden ? (
        <noscript>
          <style>{"[data-typing-root] [data-block]{opacity:1!important}"}</style>
        </noscript>
      ) : null}
      {/* Mounts hidden while animating so a new snippet never flashes fully typed; the effect fades it in. */}
      <div data-block="" key={index} className="flex transition-opacity duration-500" style={animate ? { opacity: 0 } : undefined}>
        {gutter ? (
          <div className="mr-5 shrink-0 text-right text-white/[0.14] tabular-nums">
            {snippet.map((_, lineIndex) => (
              <div key={lineIndex}>{String(lineIndex + 1).padStart(2, "0")}</div>
            ))}
          </div>
        ) : null}
        <div className="relative min-w-0">
          {snippet.map((line, lineIndex) => {
            const text = lineText(line);
            return (
              <div
                key={lineIndex}
                data-line=""
                data-length={text.length}
                data-indent={text.length - text.trimStart().length}
                className="h-[1.9em] overflow-hidden whitespace-pre"
              >
                {line.map(([tone, segment], segmentIndex) => (
                  <span key={segmentIndex} className={toneClass[tone]}>
                    {segment}
                  </span>
                ))}
              </div>
            );
          })}
          {/* Outer span: position and visibility (inline styles). Inner span: the blink animation. */}
          {animate ? (
            <span data-caret="" className="absolute top-[0.3em] left-0 h-[1.3em] w-[0.55ch] transition-opacity duration-300" style={{ opacity: 0 }}>
              <span className="animate-caret block size-full rounded-[1px] bg-violet-soft/80 shadow-[0_0_12px_rgb(196_181_253/0.8)]" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
