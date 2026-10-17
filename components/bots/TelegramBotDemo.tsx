"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Bot, ChevronLeft, Ellipsis, Mic, Plus, ShoppingBag, X } from "lucide-react";
import { naira, telegramDemo } from "@/lib/bots";
import { cn } from "@/lib/utils";
import { Phone, TypingBubble, prefersReducedMotion, usePlayOnView, useTimers } from "./demo-kit";

type Message = { id: number; from: "user" | "bot"; text: string; time: string };

const { bot, welcome, openLabel, products } = telegramDemo;
const startMessages: Message[] = [
  { id: 0, from: "user", text: "/start", time: "10:24" },
  { id: 1, from: "bot", text: welcome, time: "10:24" },
];

/**
 * A Telegram bot whose button opens a shop as a Mini App inside the chat. Checking out closes the
 * Mini App and the bot confirms the order in the conversation. Scripted in lib/bots.ts.
 */
export function TelegramBotDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [messages, setMessages] = useState<Message[]>(startMessages);
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const intro = useTimers();
  const timers = useTimers();
  // Once the visitor opens the shop themselves, the intro never plays over them.
  const touched = useRef(false);

  usePlayOnView(
    rootRef,
    () => setMessages([]),
    () => {
      if (touched.current) return;
      intro.later(() => setMessages(startMessages.slice(0, 1)), 500);
      intro.later(() => setTyping(true), 1100);
      intro.later(() => {
        setTyping(false);
        setMessages(startMessages);
      }, 2500);
      // Then open the shop once by itself, to show where the button leads.
      intro.later(() => setOpen(true), 4300);
    },
  );

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [messages, typing]);

  const openApp = () => {
    if (!touched.current) {
      // Skip the rest of the intro, whatever point it had reached.
      touched.current = true;
      intro.clear();
      setTyping(false);
      setMessages((current) => (current.length < startMessages.length ? startMessages : current));
    }
    setOpen(true);
    window.requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
  };

  const closeApp = () => {
    setOpen(false);
    menuRef.current?.focus({ preventScroll: true });
  };

  const total = cart.reduce((sum, index) => sum + products[index].price, 0);

  const checkout = () => {
    const count = cart.length;
    const confirmation = `✅ Order received: ${count} ${count === 1 ? "item" : "items"}, ${naira(total)}.\nI'll message you here as soon as it ships 📦`;
    touched.current = true;
    closeApp();
    setCart([]);
    const confirm = () => {
      setTyping(false);
      setMessages((current) => [...current, { id: current.length, from: "bot", text: confirmation, time: "10:26" }]);
    };
    if (prefersReducedMotion()) {
      confirm();
    } else {
      setTyping(true);
      timers.later(confirm, 1400);
    }
  };

  const onSheetKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeApp();
  };

  return (
    <div ref={rootRef}>
      <Phone time="10:24" className="bg-[#0e1621]">
        <div className="flex shrink-0 items-center gap-2 bg-[#17212b] px-2 py-2.5">
          <ChevronLeft className="size-5 text-[#6ab3f3]" aria-hidden="true" />
          <span className="min-w-0 flex-1 text-center leading-tight">
            <span className="block truncate text-[0.88rem] font-medium text-white">{bot}</span>
            <span className="block text-[0.68rem] text-[#6d7f8f]">bot</span>
          </span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#6ab3f3,#2aabee)] text-white">
            <Bot className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          <div
            ref={logRef}
            role="log"
            aria-label={`Demo chat with the ${bot} bot`}
            className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain bg-[radial-gradient(120%_80%_at_80%_0%,rgb(42_171_238/0.12),transparent_60%)] px-3 py-3 [scrollbar-width:none]"
          >
            {messages.map((message) => {
              const fromUser = message.from === "user";
              return (
                <div key={message.id} className={cn("animate-fade-in flex max-w-[86%] flex-col gap-1", fromUser ? "self-end" : "self-start")}>
                  <p
                    className={cn(
                      "rounded-2xl px-3 pt-1.5 pb-1 text-[0.8rem] leading-snug whitespace-pre-line text-white",
                      fromUser ? "rounded-br-sm bg-[#2b5278]" : "rounded-bl-sm bg-[#182533]",
                      message.text.startsWith("/") && "font-mono text-[#cfe6ff]",
                    )}
                  >
                    <span className="sr-only">{fromUser ? "You: " : `${bot} bot: `}</span>
                    {message.text}
                    <span className={cn("float-right mt-1.5 ml-2 text-[0.6rem] leading-none", fromUser ? "text-[#7da8d3]" : "text-[#6d7f8f]")}>
                      {message.time}
                    </span>
                  </p>
                  {!fromUser ? (
                    <button
                      type="button"
                      onClick={openApp}
                      className="relative min-h-9 rounded-xl bg-white/[0.09] px-3 text-[0.8rem] font-medium text-white transition-colors hover:bg-white/[0.14] focus-visible:outline-offset-1"
                    >
                      {openLabel}
                      <ArrowUpRight className="absolute top-1.5 right-1.5 size-3 text-white/70" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              );
            })}
            {typing ? <TypingBubble className="bg-[#182533]" dot="bg-[#6d7f8f]" /> : null}
          </div>

          <div className="flex shrink-0 items-center gap-2 bg-[#17212b] px-2 pt-2 pb-3">
            <button
              ref={menuRef}
              type="button"
              onClick={openApp}
              className="min-h-9 shrink-0 rounded-full bg-[#2aabee] px-3.5 text-[0.75rem] font-semibold text-white transition-[filter] hover:brightness-110"
            >
              Open app
            </button>
            <span aria-hidden="true" className="flex-1 text-[0.8rem] text-[#6d7f8f]">
              Message
            </span>
            <Mic className="mr-1 size-[1.1rem] text-[#6d7f8f]" aria-hidden="true" />
          </div>

          {/* The Mini App: the shop's website, opened over the chat. */}
          <div
            role="region"
            aria-label={`${bot} Mini App`}
            inert={!open}
            onKeyDown={onSheetKeyDown}
            className={cn(
              "absolute inset-x-0 top-3 bottom-0 z-10 flex flex-col overflow-hidden rounded-t-2xl bg-[#f5f6fa] shadow-[0_-20px_40px_-10px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-[var(--ease-out-expo)]",
              open ? "translate-y-0" : "translate-y-[105%]",
            )}
          >
            <div className="flex shrink-0 items-center gap-2 bg-[#17212b] px-2 py-2">
              <button
                ref={closeRef}
                type="button"
                onClick={closeApp}
                aria-label="Close the Mini App"
                className="grid size-8 place-items-center rounded-full text-[#6ab3f3] transition-colors hover:bg-white/[0.08]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <span className="flex-1 text-center leading-tight">
                <span className="block text-[0.82rem] font-medium text-white">{bot}</span>
                <span className="block text-[0.62rem] text-[#6d7f8f]">mini app</span>
              </span>
              <Ellipsis className="mr-2 size-4 text-[#6ab3f3]" aria-hidden="true" />
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-3 pt-3 pb-2 text-[#0f172a] [scrollbar-width:none]">
              <div className="rounded-2xl bg-[linear-gradient(135deg,#7c3aed,#2563eb)] p-3.5 text-white">
                <p className="font-mono text-[0.58rem] tracking-[0.14em] text-white/75 uppercase">New this week</p>
                <p className="mt-1 text-[0.95rem] leading-tight font-semibold">Shop without leaving the chat</p>
                <p className="mt-1 text-[0.68rem] text-white/80">Free delivery on orders over {naira(30000)}</p>
              </div>
              <div aria-hidden="true" className="mt-3 flex gap-1.5">
                {["All", "Shoes", "Bags", "Accessories"].map((chip, index) => (
                  <span key={chip} className={cn("rounded-full px-2.5 py-1 text-[0.62rem] font-medium", index === 0 ? "bg-[#0f172a] text-white" : "bg-white text-[#475569] ring-1 ring-black/[0.06]")}>
                    {chip}
                  </span>
                ))}
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {products.map((product, index) => {
                  const inCart = cart.filter((item) => item === index).length;
                  return (
                    <li key={product.name} className="rounded-xl bg-white p-2 ring-1 ring-black/[0.05]">
                      <span aria-hidden="true" className="grid aspect-[4/3] place-items-center rounded-lg" style={{ background: `${product.color}40` }}>
                        <span className="size-7 rounded-full" style={{ background: product.color }} />
                      </span>
                      <span className="mt-1.5 block text-[0.7rem] font-medium">{product.name}</span>
                      <span className="flex items-center justify-between">
                        <span className="text-[0.66rem] text-[#64748b]">{naira(product.price)}</span>
                        <button
                          type="button"
                          onClick={() => setCart((current) => [...current, index])}
                          aria-label={`Add ${product.name} to the cart${inCart ? ` (${inCart} in the cart)` : ""}`}
                          className="relative grid size-7 place-items-center rounded-full bg-[#2aabee] text-white transition-transform active:scale-90"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                          {inCart ? (
                            <span aria-hidden="true" className="absolute -top-1 -right-1 grid size-3.5 place-items-center rounded-full bg-[#0f172a] text-[0.5rem] font-semibold">
                              {inCart}
                            </span>
                          ) : null}
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Telegram's main button, at the foot of every Mini App. */}
            <div className="shrink-0 bg-[#f5f6fa] px-3 pt-1 pb-3">
              <button
                type="button"
                onClick={checkout}
                disabled={cart.length === 0}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2aabee] text-[0.8rem] font-semibold text-white transition-[filter,opacity] hover:brightness-105 disabled:opacity-45"
              >
                <ShoppingBag className="size-4" aria-hidden="true" />
                {cart.length === 0 ? "Add something to check out" : `Check out · ${cart.length} ${cart.length === 1 ? "item" : "items"} · ${naira(total)}`}
              </button>
            </div>
          </div>
        </div>
      </Phone>
    </div>
  );
}
