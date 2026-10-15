"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, MessageSquareText, X } from "lucide-react";
import type { AssistantEntry } from "@/lib/assistant";
import { cn } from "@/lib/utils";

type Message = { id: number; from: "visitor" | "me"; text: string; links?: AssistantEntry["links"] };

/**
 * Floating "Ask about my work" panel with pre-written answers. Not a live chat and not AI:
 * visitors pick a question and get an answer drawn from the site's data.
 */
export function AssistantWidget({
  entries,
  avatar,
  title,
}: {
  entries: AssistantEntry[];
  avatar: string | null;
  title: string;
}) {
  const panelId = useId();
  const headingId = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "me", text: "Hi! Pick a question below and I'll answer from my portfolio." },
  ]);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);

  const remaining = entries.filter((entry) => !asked.includes(entry.id));

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) launcherRef.current?.focus();
  };

  // Escape closes; opening moves focus into the panel.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const ask = (entry: AssistantEntry) => {
    if (typing) return;
    setAsked((current) => [...current, entry.id]);
    setMessages((current) => [...current, { id: current.length, from: "visitor", text: entry.question }]);
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [...current, { id: current.length, from: "me", text: entry.answer, links: entry.links }]);
      // The asked question's button is gone; keep keyboard focus inside the panel on the next one.
      window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    }, 650);
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close the assistant" : "Ask about my work"}
        onClick={() => (open ? close() : setOpen(true))}
        className={cn(
          // Icon-only on phones so it never covers content; labelled from the sm breakpoint.
          "glass fixed right-4 bottom-4 z-30 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full p-2 text-sm font-medium text-fg transition-[transform,background-color] duration-300 hover:bg-white/[0.09] active:scale-[0.97] sm:right-6 sm:bottom-6 sm:pr-4",
          open && "bg-white/[0.09]",
        )}
      >
        <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#c4b5fd,#a78bfa_45%,#60a5fa)] text-ink-950">
          {open ? <X className="size-4" aria-hidden="true" /> : <MessageSquareText className="size-4" aria-hidden="true" />}
        </span>
        <span aria-hidden="true" className="hidden sm:inline">
          {open ? "Close" : "Ask about my work"}
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={headingId}
        hidden={!open}
        className="glass animate-fade-in fixed right-4 bottom-20 z-30 flex max-h-[min(36rem,calc(100dvh-11rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-ink-950/80! sm:right-6 sm:bottom-24"
      >
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
          {avatar ? (
            <Image src={avatar} alt="" width={40} height={40} sizes="40px" className="size-10 rounded-full object-cover object-[50%_35%] ring-1 ring-white/15" />
          ) : null}
          <div className="min-w-0 flex-1">
            <h2 id={headingId} className="text-sm font-semibold text-fg">
              Ask about my work
            </h2>
            <p className="text-xs text-faint">{title} · pre-written answers, not a live chat</p>
          </div>
          <button
            type="button"
            onClick={() => close()}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div ref={logRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.from === "visitor" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "animate-fade-in max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                  message.from === "visitor"
                    ? "rounded-br-md bg-[linear-gradient(135deg,#c4b5fd,#a78bfa_45%,#60a5fa)] text-ink-950"
                    : "rounded-bl-md bg-white/[0.06] text-fg/90 ring-1 ring-white/[0.07] ring-inset",
                )}
              >
                <span className="sr-only">{message.from === "visitor" ? "You asked: " : "Answer: "}</span>
                {message.text}
                {message.links && message.links.length > 0 ? (
                  <span className="mt-2.5 flex flex-wrap gap-1.5">
                    {message.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex min-h-8 items-center gap-1 rounded-full bg-white/[0.07] px-3 text-xs font-medium text-fg ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => close(false)}
                          className="inline-flex min-h-8 items-center gap-1 rounded-full bg-white/[0.07] px-3 text-xs font-medium text-fg ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                        >
                          {link.label}
                        </Link>
                      ),
                    )}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="flex justify-start" aria-label="Typing">
              <span className="flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-3 ring-1 ring-white/[0.07] ring-inset">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="animate-typing-dot size-1.5 rounded-full bg-violet-soft" style={{ animationDelay: `${dot * 150}ms` }} />
                ))}
              </span>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/[0.07] px-4 py-3">
          {remaining.length > 0 ? (
            <div role="group" aria-label="Questions you can ask" className="flex flex-wrap gap-1.5">
              {remaining.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  data-autofocus={index === 0 ? "" : undefined}
                  disabled={typing}
                  onClick={() => ask(entry)}
                  className="min-h-9 rounded-full px-3 text-left text-xs text-fg/85 ring-1 ring-white/[0.12] ring-inset transition-colors hover:bg-white/[0.06] hover:text-fg disabled:opacity-50"
                >
                  {entry.question}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-faint">
              That&apos;s everything I&apos;ve written answers for.{" "}
              <Link href="/#contact" onClick={() => close(false)} className="text-fg underline underline-offset-4">
                Ask me directly
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </>
  );
}
