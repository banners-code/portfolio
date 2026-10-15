/**
 * Services offered to clients. No prices and no guaranteed outcomes — every engagement is
 * scoped around the client's actual requirements.
 */

export type ServiceIcon = "website" | "ecommerce" | "frontend" | "deployment" | "prototype";

export type Service = {
  id: string;
  title: string;
  icon: ServiceIcon;
  description: string;
  deliverables: string[];
  /** Optional clarification shown under the deliverables. */
  note?: string;
  /** Highlights the card, with this label (e.g. where most of your experience is). */
  featured?: string;
};

export const services: Service[] = [
  {
    id: "business-websites",
    title: "Business Website Development",
    icon: "website",
    description:
      "Modern, responsive websites for businesses, professionals and brands — structured around what your visitors need to find and do.",
    deliverables: [
      "Website structure and navigation",
      "Responsive page implementation",
      "Business information and contact sections",
      "Basic SEO configuration",
      "Deployment assistance",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Website Development",
    icon: "ecommerce",
    featured: "Core experience",
    description:
      "Online product experiences for businesses that are ready to sell: catalogues, categories, product pages and shopping flows.",
    deliverables: [
      "Product catalogues and product cards",
      "Category organisation",
      "Shopping interfaces and cart workflows",
      "Database integration",
      "Payment integration with supported providers",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "frontend",
    description: "Turning designs and ideas into responsive, accessible interfaces built from reusable components.",
    deliverables: [
      "Designs translated into code",
      "Responsive layouts",
      "Reusable components",
      "Interactive UI elements",
      "Interface improvements and frontend integration",
    ],
  },
  {
    id: "deployment",
    title: "Website Deployment & Technical Setup",
    icon: "deployment",
    description: "Help with the technical side of publishing a website and keeping it reachable.",
    deliverables: [
      "Hosting configuration",
      "Domain connection and DNS configuration",
      "SSL troubleshooting",
      "Deployment workflows with GitHub",
      "Website availability troubleshooting",
    ],
    note: "Some issues depend on third-party hosts and registrars — I'll be clear about what's within my control.",
  },
  {
    id: "prototyping",
    title: "Web Application Prototyping",
    icon: "prototype",
    description:
      "Turning an early idea into a first working interface you can click through, test and show to others.",
    deliverables: [
      "Interface and application structure planning",
      "Reusable UI components",
      "Feature prototypes",
      "Initial database integration where appropriate",
      "Technical feasibility exploration",
    ],
    note: "Best suited to early-stage ideas and first versions, rather than large enterprise systems.",
  },
];

/** How a client project runs, shown as a numbered band under the services. */
export const projectProcess: { title: string; body: string; tags: string[] }[] = [
  {
    title: "Plan",
    body: "We agree on what you need, who it's for and what a good result looks like, so the scope is clear before anything is built.",
    tags: ["Requirements", "Scope", "Structure"],
  },
  {
    title: "Design & build",
    body: "I turn the plan into responsive pages and working features, with check-ins so you can give feedback along the way.",
    tags: ["Interface", "Features", "Integrations"],
  },
  {
    title: "Launch & support",
    body: "I help connect your domain, DNS, SSL and hosting, and can help with fixes and improvements after launch.",
    tags: ["Deployment", "Domain & SSL", "Handover"],
  },
];
