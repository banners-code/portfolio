/**
 * The guided "Ask about my work" assistant: short, pre-written answers that point visitors to the
 * right part of the site rather than repeating it. Nothing is generated and nothing is sent anywhere.
 */
import { caseStudyProjects } from "./projects";
import { contactEmail, siteConfig } from "./site-config";

export type AssistantLink = { label: string; href: string; external?: boolean };
export type AssistantEntry = { id: string; question: string; answer: string; links: AssistantLink[] };

export function buildAssistantEntries(): AssistantEntry[] {
  const contactLinks: AssistantLink[] = [{ label: "Open the contact form", href: "/#contact" }];
  if (contactEmail) contactLinks.push({ label: `Email ${contactEmail}`, href: `mailto:${contactEmail}`, external: true });
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
      answer: "Yes — it's where most of my experience is. The two case studies show what each store involves.",
      links: [
        { label: "Beauty Commerce", href: "/work/beauty-commerce" },
        { label: "CENT Originals", href: "/work/cent-originals" },
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
    {
      id: "pricing",
      question: "Cost, timelines and payments?",
      answer: "I've answered those in the FAQ.",
      links: [{ label: "Read the FAQ", href: "/#faq" }],
    },
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
      answer: contactEmail ? `Through the contact form, or by email at ${contactEmail}.` : "Through the contact form — or find my work on GitHub.",
      links: contactLinks,
    },
  ];
}
