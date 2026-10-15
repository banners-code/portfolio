/**
 * Skills grouped by the work behind them. Each skill carries an honest experience label
 * instead of a percentage. Update levels as your experience grows.
 */

export type SkillLevel = "hands-on" | "project" | "developing" | "planning";
export type SkillGroupIcon = "frontend" | "data" | "workflow" | "infrastructure" | "product";

export type SkillGroup = {
  id: string;
  title: string;
  icon: SkillGroupIcon;
  summary: string;
  /** Where these skills have been used, by project title. */
  usedIn: string[];
  skills: { name: string; level: SkillLevel }[];
};

export const skillLevels: Record<SkillLevel, { label: string; description: string }> = {
  "hands-on": { label: "Hands-on experience", description: "Used regularly to build real projects." },
  project: { label: "Project experience", description: "Applied within specific projects." },
  developing: { label: "Currently developing", description: "Actively learning and investigating." },
  planning: { label: "Architecture planning", description: "Explored at the planning and design stage." },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    summary: "Building interfaces that hold up on every screen size.",
    usedIn: ["CENT Originals", "Beauty Commerce", "WhatsApp Checkout Store", "Gram Earner"],
    skills: [
      { name: "HTML5", level: "hands-on" },
      { name: "CSS3", level: "hands-on" },
      { name: "JavaScript", level: "hands-on" },
      { name: "TypeScript", level: "hands-on" },
      { name: "Next.js", level: "hands-on" },
      { name: "Tailwind CSS", level: "hands-on" },
      { name: "Responsive web design", level: "hands-on" },
      { name: "Reusable UI components", level: "hands-on" },
      { name: "Frontend application structure", level: "project" },
    ],
  },
  {
    id: "data",
    title: "Database & Integration",
    icon: "data",
    summary: "Connecting interfaces to real data, so pages are driven by what's in the database.",
    usedIn: ["Beauty Commerce", "CENT Originals"],
    skills: [
      { name: "Supabase", level: "project" },
      { name: "SQL", level: "project" },
      { name: "Database integration", level: "project" },
      { name: "Data-driven website features", level: "project" },
    ],
  },
  {
    id: "workflow",
    title: "Development Workflow",
    icon: "workflow",
    summary: "The habits that keep a codebase workable — from the first commit to the hundredth fix.",
    usedIn: ["All projects"],
    skills: [
      { name: "Git", level: "hands-on" },
      { name: "GitHub", level: "hands-on" },
      { name: "Version control", level: "hands-on" },
      { name: "Local development", level: "hands-on" },
      { name: "Debugging", level: "hands-on" },
      { name: "Implementing website features", level: "hands-on" },
      { name: "Project organization", level: "hands-on" },
      { name: "Maintaining existing codebases", level: "project" },
    ],
  },
  {
    id: "infrastructure",
    title: "Deployment & Infrastructure",
    icon: "infrastructure",
    summary: "Everything between finished code and a website people can actually reach.",
    usedIn: ["Gram Earner", "CENT Originals", "Beauty Commerce"],
    skills: [
      { name: "Website deployment", level: "project" },
      { name: "Deployment workflows", level: "project" },
      { name: "Hosting configuration", level: "project" },
      { name: "Domain configuration", level: "project" },
      { name: "DNS troubleshooting", level: "project" },
      { name: "SSL troubleshooting", level: "project" },
      { name: "Availability troubleshooting", level: "project" },
      { name: "Email & SMTP configuration", level: "developing" },
    ],
  },
  {
    id: "product",
    title: "Web Product Development",
    icon: "product",
    summary: "Thinking past single pages to whole products: flows, admin tools and the systems behind them.",
    usedIn: ["Beauty Commerce", "CENT Originals", "WhatsApp Checkout Store", "Gram Earner", "Multi-School Platform"],
    skills: [
      { name: "E-commerce interfaces", level: "project" },
      { name: "Product catalogues & carts", level: "project" },
      { name: "Payment workflows", level: "project" },
      { name: "Admin interfaces", level: "project" },
      { name: "Application prototyping", level: "project" },
      { name: "Telegram Mini App integration", level: "project" },
      { name: "SaaS architecture", level: "planning" },
      { name: "Multi-tenant product design", level: "planning" },
    ],
  },
];
