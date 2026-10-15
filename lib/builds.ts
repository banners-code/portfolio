/**
 * "What I can build" — the kinds of websites offered, and what each one usually includes.
 * Types with a case study link to it. The previews for the others are illustrations of the
 * features, not client sites; say so wherever they're shown.
 */

export type BuildId = "investment" | "ecommerce" | "blogging" | "banking" | "logistics" | "whatsapp";

export type Build = {
  id: BuildId;
  title: string;
  /** Short name used in the hero panel and the WhatsApp message. */
  short: string;
  summary: string;
  features: string[];
  /** A caution shown under the features, e.g. for financial products. */
  note?: string;
  /** A case study that shows this type of work, when one exists. */
  caseStudy?: { label: string; href: string };
};

export const builds: Build[] = [
  {
    id: "investment",
    title: "Bitcoin & investment websites",
    short: "Bitcoin investment website",
    summary: "Platforms where members follow investment plans and their portfolio, with every money movement checked by an admin.",
    features: [
      "Investment plans with clear terms",
      "A portfolio dashboard for each member",
      "Deposit and withdrawal requests with admin approval",
      "Admin tools for members and transactions",
    ],
    note: "Financial platforms need the right licences and a security review — I build the website; the regulation is yours to handle.",
  },
  {
    id: "ecommerce",
    title: "E-commerce websites",
    short: "e-commerce website",
    summary: "Online stores with a catalogue, cart, checkout and the admin behind them.",
    features: [
      "Product catalogues, categories and product pages",
      "Cart and checkout",
      "Online payments or bank transfer",
      "Admin for products, stock and orders",
    ],
    caseStudy: { label: "Beauty Commerce case study", href: "/work/beauty-commerce" },
  },
  {
    id: "blogging",
    title: "Blogging websites",
    short: "blogging website",
    summary: "Blogs and content sites that are easy to read, easy to find and easy for you to update.",
    features: [
      "Posts with categories and tags",
      "An editor for writing and publishing",
      "Search, and pages set up for SEO",
      "Newsletter sign-up",
    ],
  },
  {
    id: "banking",
    title: "Banking websites",
    short: "banking website",
    summary: "Online banking interfaces where customers see their accounts and staff handle what needs approval.",
    features: [
      "Account dashboard and transaction history",
      "Transfers with confirmation steps",
      "Two-step sign-in",
      "Admin approvals and customer management",
    ],
    note: "Banking products need regulatory approval and a security review before launch — I build the website, not the licence.",
  },
  {
    id: "logistics",
    title: "Logistics & delivery websites",
    short: "logistics website",
    summary: "Sites where customers track a shipment and request a delivery, and staff keep every status up to date.",
    features: [
      "Tracking-number lookup",
      "A shipment timeline, from pickup to delivery",
      "Quote and booking forms",
      "Admin to update shipment status",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp checkout stores",
    short: "WhatsApp checkout store",
    summary: "Online stores for small businesses that already sell on WhatsApp: the cart sends the full order to your chat.",
    features: [
      "Product catalogue and cart",
      "Checkout that sends the complete order to your WhatsApp",
      "Admin for products, stock and settings",
      "No payment gateway needed to start",
    ],
    caseStudy: { label: "WhatsApp Checkout Store case study", href: "/work/whatsapp-checkout-store" },
  },
];

/** Anchor for a build's card in the "What I can build" section. */
export const buildAnchor = (id: BuildId) => `#build-${id}`;
