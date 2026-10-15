/**
 * Project data — add, edit or remove projects here. The home page grid, the filters and the
 * /work/[slug] case-study pages are all generated from this file.
 *
 * Ground rule: describe what the code and the work actually support. Planned features stay
 * labelled as planned, and statuses must stay truthful.
 */

export type ProjectStatus = "built" | "client" | "in-development" | "prototype" | "planning" | "case-study";
export type ProjectFilter = "client" | "ecommerce" | "applications" | "technical";
export type PreviewKind = "cent" | "beauty" | "whatsapp" | "gramearner" | "school" | "infrastructure";
export type ProjectLayout = "feature" | "standard" | "wide";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "source" | "external";
};

export type CaseStudy = {
  overview: string;
  purpose: string;
  role: string;
  objective: string;
  approach: { title: string; items: string[] };
  implementation: { title: string; items: string[] };
  challenges: { title: string; body: string }[];
  solutions: { title: string; items: string[] };
  status: string;
  learned: string[];
  nextSteps: string[];
  /** Optional list of proposed or delivered capabilities, shown alongside the implementation. */
  capabilities?: { title: string; items: string[] };
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  statuses: ProjectStatus[];
  filters: ProjectFilter[];
  summary: string;
  /** Technologies verified in the project's code. Leave empty for concepts. */
  tech: string[];
  /** Non-technology focus areas (used for concepts with no committed stack). */
  topics?: string[];
  layout: ProjectLayout;
  preview: { kind: PreviewKind; label: string };
  links: ProjectLink[];
  /** Shown instead of a source link when the repository isn't public. */
  sourceNote?: string;
  /** A short honesty note shown on the card, e.g. for prototypes. */
  note?: string;
  caseStudy?: CaseStudy;
};

export const statusMeta: Record<ProjectStatus, { label: string; description: string }> = {
  built: { label: "Working Build", description: "Built and working, with its core features in place." },
  client: { label: "Client Project", description: "Paid work for a client's business." },
  "in-development": { label: "In Development", description: "Actively being built; not launched yet." },
  prototype: { label: "Prototype", description: "A working interface for exploring an idea — not production software." },
  planning: { label: "Planning", description: "Architecture and product planning; no application built yet." },
  "case-study": { label: "Technical Case Study", description: "Experience gathered across projects, not a standalone product." },
};

export const projectFilters: { id: ProjectFilter | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "client", label: "Client Projects" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "applications", label: "Applications" },
  { id: "technical", label: "Technical Work" },
];

export const projects: Project[] = [
  {
    slug: "cent-originals",
    title: "CENT Originals",
    tagline: "A storefront and admin dashboard for a clothing brand",
    category: "Client Website · Clothing Brand · E-commerce",
    statuses: ["client", "in-development"],
    filters: ["client", "ecommerce"],
    summary:
      "The website I'm developing for CENT Originals, a client's clothing brand: an editorial storefront, customer accounts and an admin dashboard. It currently runs in demo mode while the client's live services are connected.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Paystack", "Zod", "Vitest", "Playwright"],
    layout: "feature",
    preview: { kind: "cent", label: "Illustrative preview" },
    links: [],
    sourceNote: "Private client repository",
    caseStudy: {
      overview:
        "CENT Originals is a clothing brand that belongs to a client. I'm being paid to develop its website as a side project: an online store that presents the brand, its collections and its products, with accounts for customers and a dashboard for the people who run the store.",
      purpose:
        "Give the brand a digital home that feels as considered as its clothing — and build the foundations for it to take real orders.",
      role:
        "Developer on a paid client engagement. I'm responsible for the website structure, interface implementation, brand presentation, commerce logic, database design and deployment preparation.",
      objective:
        "Present a clothing brand convincingly online while building the parts of a working store: catalogue, sizes and colours, bag, checkout, payments, stock and administration.",
      approach: {
        title: "Design approach",
        items: [
          "Translated the brand's identity — its emblem, monogram and burgundy-and-gold palette — into an editorial storefront instead of a generic shop template.",
          "Built product pages around how clothing is actually bought: a size and colour selector that blocks unavailable combinations, colour-aware galleries and a size guide.",
          "Treated mobile as its own composition: solid drawers, a compact menu and an account shortcut in the header rather than a shrunken desktop layout.",
        ],
      },
      implementation: {
        title: "Technical implementation",
        items: [
          "Next.js App Router with React Server Components, strict TypeScript and Tailwind CSS.",
          "Supabase for Postgres, authentication, storage and row-level security. Checkout totals are always re-priced on the server from the database.",
          "Order creation that reserves stock and enforces discount-code limits inside a single database transaction, with idempotent submissions.",
          "Paystack hosted checkout with server-side verification and signed webhooks, written behind a payment-provider abstraction.",
          "A demo mode with an in-memory catalogue and a clearly labelled payment simulator, so the whole store can be reviewed before any live service is connected.",
          "An admin dashboard for products, variants, inventory, orders, discounts, customers and homepage content.",
          "Automated checks: unit and component tests (Vitest), database tests against in-process PostgreSQL (PGlite) and end-to-end browser journeys (Playwright) on desktop and mobile.",
        ],
      },
      challenges: [
        {
          title: "Reviewing a store before it's connected",
          body: "The client needs to see and try the store before live database and payment accounts are in place.",
        },
        {
          title: "Keeping prices and stock trustworthy",
          body: "Totals shown in a browser can't be trusted, and two customers can try to buy the last item at the same moment.",
        },
        {
          title: "Clothing variants",
          body: "Every product comes in combinations of size and colour, and each combination has its own stock.",
        },
      ],
      solutions: {
        title: "Solutions",
        items: [
          "Built a demo mode that runs the full storefront and an admin preview without external services, with a banner on every page stating that it's a demo.",
          "Moved all pricing to the server and handled stock reservation in one database transaction, so a repeated click can't create a duplicate order.",
          "Modelled variants explicitly and made the selector block combinations that don't exist or are out of stock.",
        ],
      },
      status:
        "In development as a client project. The storefront, accounts and admin run today in demo mode. Live Supabase authentication, Paystack payments and email delivery are implemented in code but haven't yet been verified against the client's live accounts.",
      learned: [
        "Client work means building for someone else's brand — and for the people who will run the store every day, not only for its visitors.",
        "A complete demo lets a client review real flows early, before infrastructure decisions are final.",
        "Commerce rules belong on the server. The interface presents prices and stock; it never decides them.",
      ],
      nextSteps: [
        "Connect the client's Supabase project and run the live authentication and storage checks.",
        "Connect Paystack and test payment verification and webhooks end to end.",
        "Finish replacing demonstration imagery with the brand's own photography.",
        "Launch, then add shipping notifications and automatic refund handling.",
      ],
    },
  },
  {
    slug: "beauty-commerce",
    title: "Beauty Commerce",
    tagline: "A modern e-commerce experience, starting with lip care",
    category: "E-commerce Development",
    statuses: ["in-development"],
    filters: ["ecommerce", "applications"],
    summary:
      "My own beauty e-commerce platform, starting with lip-care products and structured to grow into other categories. Catalogue, cart, admin and two payment workflows — online and manual bank transfer — built on Next.js and Supabase.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "SQL", "Korapay API", "Zod", "Vitest"],
    layout: "feature",
    preview: { kind: "beauty", label: "Illustrative preview" },
    links: [],
    sourceNote: "Private repository",
    caseStudy: {
      overview:
        "Beauty Commerce (working name Blush & Balm) is my own e-commerce project: a storefront and admin for a lip-care brand, built so that other beauty products can be added later. It's the most substantial application I've worked on — interface, data, payments and administration all have to work together.",
      purpose:
        "Find out what it takes to build an online store that could run as a real business in Nigeria, including the payment methods customers here actually use.",
      role:
        "Personal project. I'm responsible for product planning, interface design and implementation, the database, payment workflows and admin tooling.",
      objective:
        "Build the complete shopping journey — browse, choose, pay, track — plus the administration behind it, with both online payment and manual bank transfer.",
      approach: {
        title: "Design approach",
        items: [
          "A catalogue organised by category and brand, with product cards that open a quick options dialog instead of sending shoppers away from the listing.",
          "A soft, frosted-glass storefront over a light brand wash, with a serif hero and a category cloud.",
          "Responsive work done in deliberate phases — layout, header, product cards, product page, bag and checkout, account, admin — so phones get layouts designed for them.",
        ],
      },
      implementation: {
        title: "Technical implementation",
        items: [
          "Next.js App Router, TypeScript and Tailwind CSS v4, with Supabase Postgres, Auth and Storage and row-level security on every table.",
          "Cart, coupons, wishlist, reviews and a checkout that holds stock while an order is pending.",
          "Manual bank transfer: customers see the account details, upload a payment receipt to a private storage bucket, and staff approve or reject it from the admin.",
          "Korapay online payments: checkout redirect, server-side verification of every charge and a signed webhook handler. Online payment ships switched off until it's configured.",
          "Admin tools for products, inventory, orders, payments, coupons, shipping, banners, customers and email campaigns, with CSV exports.",
          "Two-step sign-in with an authenticator app required for staff accounts.",
          "Database and validation tests against in-memory PostgreSQL (PGlite).",
        ],
      },
      challenges: [
        {
          title: "Payments people actually use",
          body: "Many customers prefer to pay by bank transfer, which has no automatic confirmation.",
        },
        {
          title: "Never trusting the browser",
          body: "Prices, totals, stock and payment status must be impossible to change from the client.",
        },
        {
          title: "Serverless upload limits",
          body: "Receipt and product-image uploads ran into the request-size limit of serverless functions.",
        },
      ],
      solutions: {
        title: "Solutions",
        items: [
          "Designed a manual-payment workflow — transfer, receipt upload, staff verification — alongside the online option, with order states that show customers where their payment stands.",
          "Moved price, stock and payment changes into database functions that recalculate and verify on the server, behind row-level security.",
          "Changed uploads to go straight from the browser to Supabase Storage instead of through the server.",
        ],
      },
      status:
        "In development. The storefront, admin and both payment workflows are implemented in the codebase. Online payment is off by default, and the full payment flow hasn't been confirmed with live customers yet.",
      learned: [
        "An e-commerce site is mostly invisible work: stock holds, payment states and admin tools matter as much as the storefront.",
        "Local payment habits shape the product. Supporting bank transfers properly took more design than adding a payment gateway.",
        "Security is easier to build in from the start — row-level security and server-side checks are hard to retrofit.",
      ],
      nextSteps: [
        "Complete end-to-end payment testing in Korapay's test mode, then work through the launch checklist.",
        "Add beauty categories beyond lip care.",
        "Launch with real product photography and content.",
      ],
    },
  },
  {
    slug: "whatsapp-checkout-store",
    title: "WhatsApp Checkout Store",
    tagline: "An online store for small businesses, with checkout on WhatsApp",
    category: "E-commerce · Small Business · Hand-coded",
    statuses: ["built"],
    filters: ["ecommerce", "applications"],
    summary:
      "A hand-coded footwear store for small business owners who already sell on WhatsApp: customers browse and fill a cart, and checkout sends the complete order to the seller's WhatsApp. An admin dashboard keeps products, stock and settings up to date.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "WhatsApp"],
    layout: "wide",
    preview: { kind: "whatsapp", label: "Illustrative preview" },
    links: [],
    caseStudy: {
      overview:
        "A glass-style online store for footwear, written by hand in plain HTML, CSS and JavaScript with a small Node.js server — no framework. Customers browse products and build a cart; instead of a card-payment checkout, the order goes to the business on WhatsApp, where the sale is confirmed in conversation.",
      purpose:
        "Help small business owners sell online in the way they already work. Many small sellers take orders through WhatsApp chats; this store gives them a proper catalogue and cart without forcing them to set up a payment gateway first.",
      role: "Design and development of the storefront, the WhatsApp checkout, the Node.js server and the admin dashboard.",
      objective:
        "Turn \"Is this available? How much? What sizes?\" chat threads into one complete, readable order message — and give the owner a simple place to manage what's for sale.",
      approach: {
        title: "Design approach",
        items: [
          "Built around the seller's existing habit: WhatsApp stays the place where the business talks to customers, confirms availability and agrees delivery and payment.",
          "A glass-style storefront that presents the products clearly, so customers can choose before they start a conversation.",
          "Checkout sends the full order — the items and the order details — so the seller doesn't have to piece it together from several messages.",
          "An admin dashboard for people who aren't developers: products, stock and settings are changed there, not in the code.",
        ],
      },
      implementation: {
        title: "Technical implementation",
        items: [
          "Plain HTML, CSS and JavaScript for the storefront, with no framework or build step.",
          "A cart that collects the customer's choices and sends the complete order to the business's WhatsApp.",
          "A small Node.js server behind the store and its admin.",
          "An admin dashboard for managing products, stock and store settings.",
        ],
      },
      challenges: [
        {
          title: "Selling without a payment gateway",
          body: "Many small businesses aren't ready for — or don't want — an online card-payment setup, but still need a way to take orders from a website.",
        },
        {
          title: "Orders that arrive in pieces",
          body: "Taking orders over chat usually means many back-and-forth messages before the seller knows exactly what the customer wants.",
        },
        {
          title: "Keeping the shop current",
          body: "A small business owner needs to change products and stock levels without asking a developer each time.",
        },
      ],
      solutions: {
        title: "Solutions",
        items: [
          "Made WhatsApp the checkout: the order goes straight to the seller, and payment and delivery are agreed in the chat they already manage.",
          "Wrote the full order into the message the customer sends, so the conversation starts with everything the seller needs.",
          "Built an admin dashboard for products, stock and settings.",
        ],
      },
      status:
        "Working build. The storefront, WhatsApp checkout and admin dashboard are in place. The store doesn't take payments online — by design, payment is arranged between the seller and the customer on WhatsApp.",
      learned: [
        "The right checkout depends on the business. For a small seller, meeting customers where they already talk can matter more than an online payment page.",
        "A store doesn't need a framework to be useful — plain HTML, CSS and JavaScript go a long way for a focused catalogue.",
      ],
      nextSteps: [
        "Adapt the same approach for other small businesses — handmade goods, fashion, food and more.",
        "Offer online payment as an optional addition for sellers who want it.",
      ],
    },
  },
  {
    slug: "gram-earner",
    title: "Gram Earner",
    tagline: "A Telegram Mini App prototype",
    category: "Telegram Mini App · Web Integration",
    statuses: ["prototype"],
    filters: ["applications", "technical"],
    summary:
      "A front-end prototype that opens inside Telegram as a Mini App from its bot, deployed on its own domain with HTTPS — an exploration of platform integration and the launch flow.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "Telegram Bot API", "Telegram Mini Apps"],
    layout: "standard",
    preview: { kind: "gramearner", label: "Illustrative preview" },
    links: [
      { label: "Visit website", href: "https://gramearner.online/", kind: "live" },
      { label: "Open the Telegram bot", href: "https://t.me/Gramearnerbot", kind: "external" },
    ],
    sourceNote: "Private repository",
    note: "Figures and activity in the prototype are illustrative. No wallet connections, rewards or payments are operational.",
    caseStudy: {
      overview:
        "Gram Earner is an experiment in connecting a web experience to an external platform. The website is configured as the destination of a Telegram Mini App, so people launch it from inside Telegram through the project's bot.",
      purpose:
        "Learn how Telegram Mini Apps work end to end: bot entry points, launch configuration, webhooks, and hosting a site that Telegram can open.",
      role: "Front-end development, Telegram integration, deployment and troubleshooting.",
      objective:
        "Build a multi-page Mini App interface and get the whole launch path working: bot → menu button → website inside Telegram.",
      approach: {
        title: "Design approach",
        items: [
          "A mobile-first interface for Telegram's in-app browser, with pages for an overview, portfolio, referrals, sending, transactions and a guide for newcomers.",
          "Every illustrative figure and activity feed is labelled as simulated in the interface, so the prototype can't be mistaken for a live product.",
        ],
      },
      implementation: {
        title: "Technical implementation",
        items: [
          "Plain HTML, CSS and JavaScript — no backend and no persistence.",
          "Telegram Mini App integration so the site adapts when it's opened inside Telegram.",
          "A PHP webhook handler for the bot that answers commands, sends a welcome message and sets the persistent menu button to launch the app.",
          "Deployment to a custom domain with HTTPS, which Telegram requires for Mini Apps.",
        ],
      },
      challenges: [
        {
          title: "Platform requirements",
          body: "Telegram only opens Mini Apps from HTTPS addresses, and a bot webhook needs a public endpoint with a valid certificate.",
        },
        {
          title: "Keeping secrets out of the code",
          body: "The bot token and webhook secret must never be committed or reachable by visitors.",
        },
        {
          title: "Honesty in a finance-themed prototype",
          body: "An interface about rewards can easily look as though it's making real promises.",
        },
      ],
      solutions: {
        title: "Solutions and investigation",
        items: [
          "Configured the domain, hosting and SSL so the site is served over HTTPS, and investigated the webhook integration and deployment configuration.",
          "Kept bot configuration in a separate server-side file, excluded from version control and blocked from direct web access.",
          "Labelled all figures as illustrative and all activity as simulated, and documented that no real wallet, balance or payment features exist.",
        ],
      },
      status:
        "Prototype. The website is live at gramearner.online and the bot is reachable on Telegram. There is no production backend: wallet connections, eligibility checks, rewards and payments are not operational.",
      learned: [
        "Integrating with a platform means working inside its rules — HTTPS, webhooks and launch configuration come before any interface work matters.",
        "A prototype should be honest about what it is, especially when its subject is money.",
      ],
      nextSteps: [
        "Decide whether the concept justifies a real backend. Any financial functionality would need a proper security review first.",
        "If it goes further: verify Telegram's signed launch data on a server, and add a database and server-side logic.",
      ],
    },
  },
  {
    slug: "multi-school-saas",
    title: "Multi-School Platform",
    tagline: "Architecture for a subscription-based school management SaaS",
    category: "SaaS · Architecture · Product Planning",
    statuses: ["planning"],
    filters: ["applications"],
    summary:
      "An architecture concept for one platform that many independent schools can register for and subscribe to — each with its own administration, users and data, kept strictly separate.",
    tech: [],
    topics: ["Multi-tenancy", "Role-based access", "Subscriptions", "Dashboards"],
    layout: "standard",
    preview: { kind: "school", label: "Concept visualization" },
    links: [],
    caseStudy: {
      overview:
        "This is an architecture-planning concept, not a built application. I've explored how a single platform could serve many independent schools: each school registers, subscribes and manages its own students, staff and academic records while sharing the same underlying software.",
      purpose:
        "Think a real SaaS product through before writing code — where most of the hard decisions are about data separation, access and billing rather than screens.",
      role: "Product and architecture planning.",
      objective:
        "Define the capabilities, the users and the technical considerations of a multi-tenant school management platform.",
      approach: {
        title: "Potential users",
        items: [
          "School owners and administrators — register the school, manage the subscription, staff and settings.",
          "Staff and teachers — manage classes, students and academic records.",
          "Students, and potentially parents — view their own information.",
        ],
      },
      capabilities: {
        title: "Proposed capabilities",
        items: [
          "School registration",
          "Subscription management",
          "School-specific administration",
          "Role-based access control",
          "Student management",
          "Staff management",
          "Academic administration",
          "School-specific dashboards",
          "Web access",
          "Potential mobile access",
          "Optional desktop access",
        ],
      },
      implementation: {
        title: "Technical considerations",
        items: [
          "Tenant isolation: every record belongs to a school, and access rules must make cross-school access impossible — enforced in the database (for example with row-level security), not only in application code.",
          "Role-based access control inside each school: owner, administrator, staff, teacher and student.",
          "Subscription management: plans, billing status, and what happens to access when a subscription lapses.",
          "Web access first, with possible mobile and desktop clients later — which favours a clear API boundary from day one.",
        ],
      },
      challenges: [
        { title: "Data separation", body: "One school must never be able to see another school's data, even through a bug." },
        { title: "Different school structures", body: "Schools organise classes, terms and grading in different ways." },
        { title: "Scope", body: "The full list of capabilities is large enough that it could never ship as one release." },
      ],
      solutions: {
        title: "Proposed approach",
        items: [
          "Plan tenant isolation into the database layer from the start.",
          "Keep academic structures configurable per school instead of hard-coding one model.",
          "Define a minimal first version — registration, roles, students and staff — before academic modules.",
        ],
      },
      status: "Planning. No application has been built yet; the dashboard on this page is a concept visualization.",
      learned: [
        "Much of SaaS architecture is about boundaries — who can see what, and whose data is whose — before it's about interface.",
      ],
      nextSteps: [
        "Talk to school administrators to validate the problem and priorities.",
        "Prototype the tenant and role model.",
        "Build a minimal first version.",
      ],
    },
  },
  {
    slug: "deployment-troubleshooting",
    title: "Beyond the Interface",
    tagline: "Deployment and technical troubleshooting",
    category: "Web Infrastructure · Deployment · Problem-Solving",
    statuses: ["case-study"],
    filters: ["technical"],
    summary:
      "A website only matters once people can reach it. Across my projects I've worked through hosting configuration, domain setup, DNS records, SSL certificates, Git-based deployments and availability problems.",
    tech: ["Git", "GitHub", "Vercel", "DNS", "SSL/TLS", "Environment variables"],
    layout: "wide",
    preview: { kind: "infrastructure", label: "How a request reaches a website" },
    links: [],
    caseStudy: {
      overview:
        "This isn't a product — it's the work around products. Several of my projects have depended on getting the infrastructure right: connecting domains, configuring DNS records, getting SSL certificates to validate and setting up deployments from GitHub.",
      purpose: "Show that I understand what sits between finished code and a working website.",
      role: "Configuring and troubleshooting deployments for my own projects and client work.",
      objective: "Get sites reliably online — and understand why they fail when they don't.",
      approach: {
        title: "How I approach it",
        items: [
          "Follow the request path in order: domain → DNS records → hosting → SSL certificate → the application itself.",
          "Change one thing at a time, and allow for DNS propagation before drawing conclusions.",
          "Keep credentials and environment variables in the host's settings, never in the repository.",
        ],
      },
      implementation: {
        title: "What I've worked on",
        items: [
          "Domain configuration and DNS records that point domains at their hosting.",
          "SSL certificate validation and HTTPS for sites that depend on it — a Telegram Mini App won't open without it.",
          "Git and GitHub workflows connected to automatic deployments, including redeploying so new environment variables take effect.",
          "Working within platform limits, such as moving file uploads direct-to-storage when serverless request limits got in the way.",
          "Diagnosing website availability problems.",
        ],
      },
      challenges: [
        {
          title: "Problems that look identical",
          body: "An unreachable site can be a wrong DNS record, slow propagation, a mismatched certificate or the host itself.",
        },
        {
          title: "Email delivery",
          body: "I've investigated email delivery and SMTP configuration issues while working on web projects.",
        },
      ],
      solutions: {
        title: "Solutions and attempted solutions",
        items: [
          "Worked through the chain systematically, confirming each layer before moving to the next.",
          "For email, investigated SMTP settings and delivery configuration. Not every one of these investigations ended in a fix, and I don't present them as solved — email infrastructure is an area I'm still developing.",
        ],
      },
      status: "An ongoing capability demonstrated across my projects — presented as experience, not as a standalone product.",
      learned: [
        "A website's appearance is one layer of many. Availability depends on a chain of systems, and each can fail on its own.",
        "Methodical troubleshooting beats guessing: most configuration problems become clear once each layer is checked in order.",
      ],
      nextSteps: [
        "Deepen my understanding of email authentication records (SPF, DKIM and DMARC) and deliverability.",
        "Add uptime monitoring so availability problems are noticed before visitors notice them.",
      ],
    },
  },
];

/** Smaller pieces of genuine work that don't warrant their own case study. */
export const additionalWork: { title: string; description: string }[] = [
  {
    title: "Business and trading-related website concepts",
    description: "Exploratory website concepts, including trading-related sites, and business website development.",
  },
  {
    title: "Domain and brand-name research",
    description: "Researching available domains and names for new projects before they're built.",
  },
  {
    title: "Metadata and favicon configuration",
    description: "Page titles, descriptions, social previews and icons, so sites present well in search and when shared.",
  },
  {
    title: "Popup and notification interfaces",
    description: "Custom popups, toasts and notification patterns, customised to fit each interface.",
  },
  {
    title: "Interface customisation",
    description: "Restyling and adjusting existing interfaces to fit a brand, a new requirement or a smaller screen.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const caseStudyProjects = projects.filter((project) => project.caseStudy);
