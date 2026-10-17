"use client";

import { useEffect, useEffectEvent, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

/** Read at the moment of use, so a demo follows the visitor's current setting. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** setTimeout that is cleared on unmount, plus `clear()` to cancel whatever is still pending. */
export function useTimers() {
  const ids = useRef<number[]>([]);
  useEffect(() => {
    const pending = ids.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);
  return {
    later(callback: () => void, ms: number) {
      ids.current.push(window.setTimeout(callback, ms));
    },
    clear() {
      ids.current.forEach((id) => window.clearTimeout(id));
      ids.current.length = 0;
    },
  };
}

/**
 * Plays a demo the first time it scrolls into view. The server renders the finished conversation,
 * so it reads fine without JavaScript; a demo that starts off screen is emptied (`onReset`) and
 * replayed (`onPlay`) when the visitor reaches it. One already on screen at load, or a visitor who
 * prefers reduced motion, keeps the finished conversation.
 */
export function usePlayOnView(ref: RefObject<HTMLElement | null>, onReset: () => void, onPlay: () => void) {
  const reset = useEffectEvent(onReset);
  const play = useEffectEvent(onPlay);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) observer.disconnect();
          else reset();
          return;
        }
        if (entry.intersectionRatio >= 0.45) {
          observer.disconnect();
          play();
        }
      },
      { threshold: [0, 0.45] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}

/** A phone frame for the bot demos: bezel, camera, status bar and a screen for the app. */
export function Phone({ time, className, children }: { time: string; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[34rem] w-full max-w-[19.5rem] flex-col overflow-hidden rounded-[2.6rem] border-[7px] border-[#1a1f27] text-left shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08)]",
        className,
      )}
    >
      <div aria-hidden="true" className="relative flex h-8 shrink-0 items-center justify-between px-6 pt-1 text-[0.68rem] font-semibold text-white/90">
        <span className="tabular-nums">{time}</span>
        <span className="absolute top-2 left-1/2 h-[1.15rem] w-[4.6rem] -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-1">
          <span className="flex items-end gap-px">
            {[3, 5, 7, 9].map((height) => (
              <span key={height} className="w-[3px] rounded-sm bg-white/90" style={{ height }} />
            ))}
          </span>
          <span className="ml-1 h-[9px] w-[18px] rounded-[3px] border border-white/60 p-px">
            <span className="block h-full w-3/4 rounded-[1px] bg-white/90" />
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

/** Three bouncing dots while the bot "types". */
export function TypingBubble({ className, dot }: { className: string; dot: string }) {
  return (
    <div className="flex justify-start" role="status" aria-label="Typing">
      <span className={cn("flex gap-1 rounded-xl rounded-tl-sm px-3.5 py-3", className)}>
        {[0, 1, 2].map((index) => (
          <span key={index} className={cn("animate-typing-dot size-1.5 rounded-full", dot)} style={{ animationDelay: `${index * 150}ms` }} />
        ))}
      </span>
    </div>
  );
}
