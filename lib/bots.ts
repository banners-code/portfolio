/**
 * "Bots I build" — the WhatsApp and Telegram bots offered, what each one does, and the scripts
 * the two demos in the Bots section play. The demos run in the page: nothing is sent anywhere.
 */

export type BotId = "whatsapp" | "telegram";

export type Bot = {
  id: BotId;
  /** Small label above the title. */
  kind: string;
  title: string;
  summary: string;
  features: string[];
  /** Shown under the features, e.g. what the platform requires. */
  note?: string;
  /** The message pre-typed in the WhatsApp quote link. */
  quote: string;
  /** Floating labels around the demo phone. Decorative. */
  highlights: [string, string];
  /** Work of mine that shows this kind of bot, when there is one. */
  caseStudy?: { label: string; href: string };
};

export const bots: Bot[] = [
  {
    id: "whatsapp",
    kind: "WhatsApp chatbot",
    title: "Customer support that replies while you're away.",
    summary:
      "A WhatsApp chatbot on your business number that answers customers in seconds — at midnight, on weekends or while you're busy — and passes the chat to you when a real person is needed.",
    features: [
      "Instant replies, day and night",
      "Answers to the questions you get every day: prices, opening hours, location, delivery",
      "Tap-to-reply menus, so customers don't have to type",
      "Order and booking updates sent straight to the chat",
      "Hands the conversation to you whenever a person is needed",
    ],
    note: "Built on WhatsApp's official Business Platform, so your number stays in good standing. Meta verifies the business, and some message types carry Meta's fees.",
    quote: "Hi, I'd like a WhatsApp chatbot for my business.",
    highlights: ["Replies 24/7", "Away mode on"],
  },
  {
    id: "telegram",
    kind: "Telegram bot & Mini App",
    title: "Your website, opened right inside Telegram.",
    summary:
      "A Telegram bot that launches your website as a Mini App, so people browse, sign up or order without leaving the chat — and the bot keeps them updated afterwards.",
    features: [
      "Your website inside Telegram as a Mini App",
      "A welcome message and menu button that open it",
      "Bot commands such as /start and /help",
      "Order updates and alerts sent to your users in Telegram",
      "Hosted on your own domain with HTTPS",
    ],
    quote: "Hi, I'd like a Telegram bot / Mini App for my website.",
    highlights: ["Opens inside Telegram", "No app to download"],
    caseStudy: { label: "See Gram Earner, a Mini App I built", href: "/work/gram-earner" },
  },
];

/** Anchor for a bot's row in the Bots section. */
export const botAnchor = (id: BotId) => `#bot-${id}`;

/** The WhatsApp demo: a customer messages a business after hours and the bot takes it from there. */
export const whatsappDemo = {
  business: "Your Business",
  opening: {
    customer: "Hi, are you still open? 😅",
    bot: "Hi there 👋 Thanks for messaging Your Business! We're closed for the night, but I can help you right now. What do you need?",
  },
  replies: [
    {
      id: "prices",
      label: "Price list",
      answer: "Here's our price list 📋\n• Basic — ₦5,000\n• Standard — ₦10,000\n• Premium — ₦18,000\n\nDelivery is free on orders over ₦15,000.",
    },
    {
      id: "track",
      label: "Track my order",
      answer: "Order #1042 is out for delivery 🚚\nIt should reach you before 2 PM tomorrow. I'll message you here when it arrives.",
    },
    {
      id: "person",
      label: "Talk to a person",
      answer: "No problem 🙂 I've passed your chat to the team. Someone will reply here at 8 AM — you won't need to repeat yourself.",
    },
  ],
};

/** The Telegram demo: /start, the welcome with its Mini App button, and the shop inside Telegram. */
export const telegramDemo = {
  bot: "Your Shop",
  welcome: "Welcome to Your Shop 🛍️\nBrowse the whole store without leaving Telegram.",
  openLabel: "Open the shop",
  products: [
    { name: "Sneakers", price: 25000, color: "#93c5fd" },
    { name: "Tote bag", price: 12000, color: "#f9a8d4" },
    { name: "Watch", price: 30000, color: "#fcd34d" },
    { name: "Cap", price: 6500, color: "#6ee7b7" },
  ],
};

/** "₦25,000" — formatted by hand so the server and every browser render the same text. */
export function naira(amount: number): string {
  return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
