"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CheckCheck, ChevronLeft, Mic, Phone as PhoneIcon, RotateCcw, Store, Video } from "lucide-react";
import { whatsappDemo } from "@/lib/bots";
import { cn } from "@/lib/utils";
import { Phone, TypingBubble, prefersReducedMotion, usePlayOnView, useTimers } from "./demo-kit";

type Message = { id: number; from: "customer" | "bot"; text: string; time: string };
type Reply = (typeof whatsappDemo.replies)[number];

const { business, opening, replies } = whatsappDemo;
const openingMessages: Message[] = [
  { id: 0, from: "customer", text: opening.customer, time: "11:48 PM" },
  { id: 1, from: "bot", text: opening.bot, time: "11:48 PM" },
];

/**
 * A WhatsApp chat with a business after hours: the bot greets the customer, and the visitor taps
 * the reply buttons to see it answer. Everything is scripted in lib/bots.ts and runs in the page.
 */
export function WhatsAppBotDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(openingMessages);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<string[]>([]);
  const timers = useTimers();

  const play = () => {
    timers.clear();
    setUsed([]);
    setTyping(false);
    setMessages([]);
    timers.later(() => setMessages(openingMessages.slice(0, 1)), 500);
    timers.later(() => setTyping(true), 1100);
    timers.later(() => {
      setTyping(false);
      setMessages(openingMessages);
    }, 2700);
  };

  usePlayOnView(rootRef, () => setMessages([]), play);

  // Follow the conversation inside the phone (never the page).
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [messages, typing]);

  const choose = (reply: Reply) => {
    if (typing) return;
    setUsed((current) => [...current, reply.id]);
    setMessages((current) => [...current, { id: current.length, from: "customer", text: reply.label, time: "11:49 PM" }]);
    const answer = () => {
      setTyping(false);
      setMessages((current) => [...current, { id: current.length, from: "bot", text: reply.answer, time: "11:49 PM" }]);
      // The tapped button is gone; keep keyboard focus on the next set of replies.
      window.requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>("[data-reply]")?.focus({ preventScroll: true }));
    };
    if (prefersReducedMotion()) {
      answer();
    } else {
      setTyping(true);
      timers.later(answer, 1300);
    }
  };

  const restart = () => {
    if (prefersReducedMotion()) {
      setUsed([]);
      setMessages(openingMessages);
    } else {
      play();
    }
  };

  const remaining = replies.filter((reply) => !used.includes(reply.id));
  const last = messages.at(-1);
  const showReplies = !typing && last?.from === "bot";

  return (
    <div ref={rootRef}>
      <Phone time="11:48" className="bg-[#0b141a]">
        <div className="flex shrink-0 items-center gap-2 bg-[#202c33] px-2 py-2.5">
          <ChevronLeft className="size-5 text-white/80" aria-hidden="true" />
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#25d366]/20 text-[#25d366]">
            <Store className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[0.88rem] font-medium text-[#e9edef]">{business}</span>
            <span className="block text-[0.68rem] text-[#8696a0]">Business account</span>
          </span>
          <Video className="size-[1.1rem] text-white/80" aria-hidden="true" />
          <PhoneIcon className="mx-2 size-4 text-white/80" aria-hidden="true" />
        </div>

        <div
          ref={logRef}
          role="log"
          aria-label={`Demo chat with ${business}`}
          className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain bg-[radial-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:14px_14px] px-3 py-3 [scrollbar-width:none]"
        >
          <span className="mx-auto mb-1.5 rounded-md bg-[#182229] px-2.5 py-1 text-[0.65rem] text-[#8696a0]">Today</span>
          {messages.map((message, index) => {
            const isCustomer = message.from === "customer";
            const withReplies = showReplies && index === messages.length - 1;
            return (
              <Fragment key={message.id}>
                <div className={cn("animate-fade-in flex max-w-[86%] flex-col gap-0.5", isCustomer ? "self-end" : "self-start")}>
                  <p
                    className={cn(
                      "rounded-lg px-2.5 pt-1.5 pb-1 text-[0.8rem] leading-snug whitespace-pre-line text-[#e9edef] shadow-sm",
                      isCustomer ? "rounded-tr-none bg-[#005c4b]" : "rounded-tl-none bg-[#202c33]",
                    )}
                  >
                    <span className="sr-only">{isCustomer ? "Customer: " : `${business} bot: `}</span>
                    {message.text}
                    <span className="float-right mt-1.5 ml-2 flex items-center gap-0.5 text-[0.6rem] leading-none text-white/55">
                      {message.time}
                      {isCustomer ? <CheckCheck className="size-3.5 text-[#53bdeb]" aria-hidden="true" /> : null}
                    </span>
                  </p>
                  {withReplies && remaining.length > 0 ? (
                    <div role="group" aria-label="Quick replies" className="flex flex-col gap-0.5">
                      {remaining.map((reply, replyIndex) => (
                        <button
                          key={reply.id}
                          type="button"
                          data-reply={replyIndex === 0 ? "" : undefined}
                          onClick={() => choose(reply)}
                          className="min-h-9 rounded-lg bg-[#202c33] px-3 text-[0.8rem] font-medium text-[#53bdeb] transition-colors hover:bg-[#2a3942] focus-visible:outline-offset-1"
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                {withReplies && remaining.length === 0 ? (
                  <button
                    type="button"
                    data-reply=""
                    onClick={restart}
                    className="mx-auto mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#182229] px-3.5 text-[0.72rem] text-[#8696a0] ring-1 ring-white/[0.06] transition-colors hover:text-[#e9edef]"
                  >
                    <RotateCcw className="size-3" aria-hidden="true" />
                    Play the demo again
                  </button>
                ) : null}
              </Fragment>
            );
          })}
          {typing ? <TypingBubble className="bg-[#202c33]" dot="bg-[#8696a0]" /> : null}
        </div>

        <div aria-hidden="true" className="flex shrink-0 items-center gap-2 px-2 pt-1.5 pb-3">
          <span className="flex-1 rounded-full bg-[#202c33] px-4 py-2.5 text-[0.8rem] text-[#8696a0]">Message</span>
          <span className="grid size-10 place-items-center rounded-full bg-[#00a884] text-[#0b141a]">
            <Mic className="size-[1.1rem]" />
          </span>
        </div>
      </Phone>
    </div>
  );
}
