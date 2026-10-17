/**
 * The guided "Ask about my work" assistant: short, pre-written answers that point visitors to the
 * right part of the site, and repeat the FAQ answers word for word. Nothing is generated and nothing is sent anywhere.
 */
import { faqs } from "./faq";
import { caseStudyProjects } from "./projects";
import { contactEmail, siteConfig, whatsappContact } from "./site-config";

export type AssistantLink = { label: string; href: string; external?: boolean };
export type AssistantEntry = { id: string; question: string; answer: string; links: AssistantLink[] };

/** "Through the contact form, by email at …, or on WhatsApp at …." — only the channels that are set. */
function contactAnswer(): string {
  const ways = ["Through the contact form"];
  if (contactEmail) ways.push(`by email at ${contactEmail}`);
  if (whatsappContact) ways.push(`on WhatsApp at ${whatsappContact.display}`);
  if (ways.length === 1) return "Through the contact form — or find my work on GitHub.";
  return `${ways.slice(0, -1).join(", ")}, or ${ways.at(-1)}.`;
}

export function buildAssistantEntries(): AssistantEntry[] {
  const contactLinks: AssistantLink[] = [{ label: "Open the contact form", href: "/#contact" }];
  if (contactEmail) contactLinks.push({ label: `Email ${contactEmail}`, href: `mailto:${contactEmail}`, external: true });
  if (whatsappContact) contactLinks.push({ label: "Chat on WhatsApp", href: whatsappContact.href, external: true });
  contactLinks.push({ label: "GitHub", href: siteConfig.social.github, external: true });

  return [
    {
      id: "built",
      question: "What have you built?",
      answer: `${caseStudyProjects.length} pieces of work so far — from a client storefront to a SaaS concept — each with its real status. Pick one to read the full story:`,
      links: caseStudyProjects.map((project) => ({ label: project.title, href: `/work/${project.slug}` })),
    },
    {
      id: "ecommerce",
      question: "Do you build e-commerce sites?",
      answer:
        "Yes — it's where most of my experience is, from stores with online payments to a WhatsApp checkout for small businesses. Each case study shows what the store involves.",
      links: [
        { label: "Beauty Commerce", href: "/work/beauty-commerce" },
        { label: "CENT Originals", href: "/work/cent-originals" },
        { label: "WhatsApp Checkout Store", href: "/work/whatsapp-checkout-store" },
      ],
    },
    {
      id: "bots",
      question: "Do you build WhatsApp or Telegram bots?",
      answer:
        "Yes — WhatsApp chatbots that answer your customers while you're away, and Telegram bots that open your website inside Telegram as a Mini App. You can try a demo of each in the Bots section.",
      links: [
        { label: "Try the bot demos", href: "/#bots" },
        { label: "Gram Earner (Telegram Mini App)", href: "/work/gram-earner" },
      ],
    },
    {
      id: "stack",
      question: "What do you build with?",
      answer: "Mainly Next.js, TypeScript and Tailwind CSS, with Supabase for data. The Skills section shows everything, with how I've used each one.",
      links: [{ label: "See my skills", href: "/#skills" }],
    },
    {
      id: "process",
      question: "How would we work together?",
      answer: "In three stages — plan, design & build, then launch & support. The details are under Services.",
      links: [{ label: "See how a project runs", href: "/#services" }],
    },
    // Every FAQ is askable here too, with the same answer as the FAQ section.
    ...faqs.map((faq, index) => ({ id: `faq-${index}`, question: faq.question, answer: faq.answer, links: [] })),
    {
      id: "fit",
      question: "Can you take on my project?",
      answer:
        "Tell me what you're building, who it's for and your timeline, and I'll let you know honestly whether I'm the right fit and when I could start.",
      links: [{ label: "Open the contact form", href: "/#contact" }],
    },
    {
      id: "contact",
      question: "How do I contact you?",
      answer: contactAnswer(),
      links: contactLinks,
    },
  ];
}
