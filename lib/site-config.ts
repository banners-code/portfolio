/**
 * Site-wide configuration — the one place to change the brand, contact details,
 * social links, navigation and SEO defaults. Components read from here; nothing
 * else hard-codes these values.
 */

export type NavItem = { id: string; label: string };
export type SocialLink = { label: string; href: string };

export const siteConfig = {
  brand: {
    /** The studio name — used in the nav label, footer, metadata, OG image and manifest. */
    name: "Banner Tech",
    tagline: "Ideas, built into digital experiences.",
    description:
      "Web developer and Computer Science student building websites, e-commerce platforms and application prototypes — and solving the technical problems that come with putting them online.",
    /** Short line under the footer logo (kept different from the hero and meta description). */
    footerLine: "The web development work of Nwigboji Anthony Izuchukwu — from first idea to live domain.",
    /** The hand-lettered wordmark (white on transparent). Replace the file to change the logo everywhere. */
    logo: { src: "/images/branding/banner-tech-logo.png", width: 1167, height: 225 },
  },

  owner: {
    /** Your name as you want it shown in the About section. Leave empty to keep the copy name-free. */
    name: "Nwigboji Anthony Izuchukwu",
    role: "Web Developer",
    university: "Nnamdi Azikiwe University",
    country: "Nigeria",
    /** Portrait for the About section (4:5). Set to null to hide it. */
    photo: { src: "/images/about/anthony.jpg", width: 960, height: 1200 } as { src: string; width: number; height: number } | null,
  },

  contact: {
    /**
     * CONFIGURE: your professional email address, e.g. "hello@yourdomain.com".
     * While empty, no email link is shown anywhere (the development build shows a reminder instead).
     */
    email: "antmich900@gmail.com",
    /** WhatsApp number in international format (digits, optional leading +). Leave empty to hide it. */
    whatsapp: "+2349055459281",
  },

  social: {
    github: "https://github.com/banners-code",
    /** Optional extra profiles. Only links with an href are rendered. */
    extra: [
      // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" },
      // { label: "X", href: "https://x.com/your-handle" },
    ] as SocialLink[],
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],

  seo: {
    title: "Web Developer — Websites, E-commerce & Digital Products",
    keywords: [
      "web developer",
      "Next.js developer",
      "frontend developer",
      "e-commerce website development",
      "Nigeria web developer",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    locale: "en_NG",
  },
} as const;

/**
 * The public site URL, read from NEXT_PUBLIC_SITE_URL. Returns null until a domain is configured,
 * so no false canonical URL is ever published.
 */
export function configuredSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

/**
 * The site's public address if it's known: NEXT_PUBLIC_SITE_URL, else Vercel's production URL.
 * Used for the sitemap and robots.txt, which must never point at localhost.
 */
export function publicBaseUrl(): URL | null {
  const configured = configuredSiteUrl();
  if (configured) return configured;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? new URL(`https://${vercel}`) : null;
}

/**
 * Best available absolute base URL for metadata that requires one (Open Graph images, sitemap, robots).
 * Order: NEXT_PUBLIC_SITE_URL → Vercel's production URL → localhost for local builds.
 */
export function metadataBaseUrl(): URL {
  return publicBaseUrl() ?? new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export const contactEmail = siteConfig.contact.email.trim() || null;

/** The WhatsApp number as shown (e.g. "+234 905 545 9281") and its wa.me chat link, or null. */
export const whatsappContact = (() => {
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const display = digits.startsWith("234") && digits.length === 13
    ? `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
    : `+${digits}`;
  return { display, href: `https://wa.me/${digits}` };
})();

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.social.github },
  ...siteConfig.social.extra.filter((link) => link.href.trim().length > 0),
];
