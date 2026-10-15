# Banner Tech — Developer Portfolio

The portfolio of Nwigboji Anthony Izuchukwu (Banner Tech): a personal developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4** — a dark glassmorphism design with violet-blue lighting, honest project statuses, case-study pages and a contact form that never pretends to send.

Everything you're likely to change lives in four data files under `lib/`. You shouldn't need to touch components to update your brand, contact details, projects, skills or services.

---

## Contents

1. [Requirements](#requirements)
2. [Getting started](#getting-started)
3. [Commands](#commands)
4. [Project structure](#project-structure)
5. [Configuration](#configuration) — brand, name, email, social links
6. [Updating projects](#updating-projects)
7. [Skills and services](#skills-and-services)
8. [Contact form setup](#contact-form-setup)
9. [Adding a custom domain](#adding-a-custom-domain)
10. [Deployment](#deployment)
11. [Design and accessibility notes](#design-and-accessibility-notes)
12. [Content review checklist](#content-review-checklist)

---

## Requirements

- **Node.js 20.9 or newer** (developed on Node 24)
- **npm** (bundled with Node)

No database or external service is required to run the site.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (all pages are pre-rendered as static HTML) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generate route types, then run the TypeScript compiler |
| `npm run check` | Lint, type-check and build in one go |

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, metadata, navigation, footer, scroll reveal
  page.tsx                   Home page (Hero, About, Projects, Skills, Services, Contact)
  globals.css                Design tokens, glass utilities, background lighting, motion rules
  work/[slug]/page.tsx       Case-study pages, generated from lib/projects.ts
  work/[slug]/opengraph-image.tsx   Per-project social preview images
  actions/contact.ts         Server action that validates and delivers contact messages
  opengraph-image.tsx  icon.png  apple-icon.png  manifest.ts  robots.ts  sitemap.ts  not-found.tsx
components/
  brand/                     Wordmark (the Banner Tech logo image)
  assistant/                 AssistantWidget (the guided "Ask about my work" panel)
  layout/                    Navbar (scrollspy), MobileMenu, Footer
  sections/                  HeroSection, AboutSection, ProjectsSection, SkillsSection, ServicesSection, FaqSection, ContactSection
  projects/                  ProjectCard, ProjectGrid (filters), ProjectFilters, ProjectPreview (CSS mockups), StatusBadge
  ui/                        Button, GlassCard, Badge, Container, SectionHeading, ContactForm, RevealObserver, GitHubIcon,
                             Portrait, WhoamiTerminal, TypingCode
lib/
  site-config.ts             Brand, owner, contact, social links, navigation, SEO, site URL helpers
  projects.ts                Projects, statuses, filters, case studies, additional work
  skills.ts                  Skill groups and experience levels
  services.ts                Services, deliverables, the featured service and the "How a project runs" steps
  faq.ts                     Client FAQ
  assistant.ts               Builds the assistant's answers from the site's data
  contact.ts                 Contact form validation (shared by browser and server)
  contact-delivery.ts        Email delivery via Resend (server only)
  og.tsx                     Shared social-preview image renderer
  utils.ts                   Small helpers
```

Server Components are the default. Only interactive pieces are Client Components: the navbar and mobile menu, the project filters, the contact form and the scroll-reveal observer.

## Configuration

Open **`lib/site-config.ts`**.

| Setting | What it controls |
| --- | --- |
| `brand.name` | The studio name, `Banner Tech`. Used in page titles, labels, OG images and the manifest. |
| `brand.logo` | The hand-lettered logo (`public/images/branding/banner-tech-logo.png`, white on transparent) with its pixel size. Shown in the nav, footer and OG image. |
| `brand.tagline`, `brand.description` | Footer copy and the default meta description. |
| `owner.name` | Your name for the About section. Leave it empty and the copy reads naturally without it. |
| `owner.role`, `owner.university`, `owner.country` | Used in the About section; name and role also drive the hero's `whoami` terminal. |
| `owner.photo` | The About portrait (`public/images/about/anthony.jpg`, 4:5) with its pixel size. Set to `null` to hide it. Also used as the assistant's avatar. |
| `contact.email` | **Configure this.** Your professional email address. While it's empty, no email link appears anywhere (the development build shows a reminder in the contact section). |
| `social.github` | Your GitHub profile (currently `https://github.com/banners-code`). |
| `social.extra` | Optional extra profiles, e.g. `{ label: "LinkedIn", href: "https://…" }`. Only entries with an `href` are shown — no empty or fake social links. |
| `nav` | Navigation items. Each `id` must match a section `id` on the home page. |
| `seo` | Title suffix, keywords and locale. |

**Changing the logo:** replace `public/images/branding/banner-tech-logo.png` (keep it white on a transparent background) and update `brand.logo` with its width and height. The favicon (`app/icon.png`) and Apple touch icon (`app/apple-icon.png`) are the logo's "B" on a dark tile; replace those files too if the logo changes.

**Changing the portrait:** replace `public/images/about/anthony.jpg` (a 4:5 crop works best) and update `owner.photo`.

## Updating projects

Open **`lib/projects.ts`**. The home-page grid, filters and every `/work/<slug>` case-study page are generated from the `projects` array.

Each project has:

- `slug` — URL of its case study (`/work/<slug>`)
- `title`, `tagline`, `category`, `summary`
- `statuses` — one or more of `built`, `client`, `in-development`, `prototype`, `planning`, `case-study` (labels and descriptions are in `statusMeta`)
- `filters` — which filter buttons show it: `client`, `ecommerce`, `applications`, `technical`
- `tech` — technologies **verified in the project's code**; leave empty for concepts and use `topics` instead
- `layout` — `feature`, `standard` or `wide` (wide cards take a full row)
- `preview` — which illustrative mockup to draw and its caption
- `links` — only real, working destinations (live site, public repository…). If a repository is private, leave it out and set `sourceNote`.
- `note` — an optional honesty note on the card (used for the Gram Earner prototype)
- `caseStudy` — optional; when present, the card links to a full case study with twelve sections (overview, purpose, role, objective, approach, implementation, technologies, challenges, solutions, status, what I learned, next steps)

**To add a project:** copy an existing entry, give it a new `slug`, and fill in the fields. Small pieces of work that don't need a case study go in `additionalWork` at the bottom of the file.

**Previews:** the project images are original CSS mockups in `components/projects/ProjectPreview.tsx`, each captioned "Illustrative preview" or "Concept visualization". To use a real screenshot instead, put the image in `public/images/projects/`, render it with `next/image` in `ProjectPreview`, and update the caption. For client work, get the client's permission first.

**Filters** recalculate automatically, and the grid pairs cards in a 7/5 then 5/7 rhythm on large screens; a card left without a partner takes the full row and switches to a side-by-side layout.

## Skills and services

- **`lib/skills.ts`** — five groups. Each skill has a `level`: `hands-on`, `project`, `developing` or `planning`. Each level is shown with its own shape and a text label, not percentages. Move skills up a level as your experience grows.
- **`lib/services.ts`** — five services with deliverables and optional notes. There are no prices and no guarantees. Each card's "Discuss your project" link scrolls to the contact form and pre-fills the subject. Set `featured` on a service to highlight it (E-commerce is marked "Core experience"). `projectProcess` holds the three numbered steps shown under the services.
- **`lib/faq.ts`** — the client FAQ. The answers are drawn from your services and projects; keep them in your own words and up to date.
- **The assistant** (`lib/assistant.ts`) — the floating "Ask about my work" panel offers pre-written questions and answers built from your projects, FAQ and contact settings, so it updates when they do. Every question in `lib/faq.ts` is also askable in the assistant, with the same answer. It isn't AI and sends nothing anywhere. To add a question, add an entry to `buildAssistantEntries()`.
- **Intro** — the home page opens with the typed `whoami` session (`components/ui/WhoamiTerminal.tsx`) full screen, via `components/ui/IntroOverlay.tsx`. It plays once per browser session, can be skipped (button or Escape), and is skipped for reduced motion.
- **No repeats** — each piece of content appears once: identity in the hero terminal, the story in About, client process under Services, and only questions answered nowhere else in the FAQ. Keep that in mind when adding content.

## Contact form setup

The form has three modes, chosen automatically. It never shows a success message unless the email provider actually accepted the message.

| Mode | When | Behaviour |
| --- | --- | --- |
| **Online** | `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set | Validates in the browser and again on the server, then sends the message through [Resend](https://resend.com). "Message sent" appears only after Resend confirms. |
| **Email app** | No delivery configured, but `contact.email` is set | Validates, then opens the visitor's email app with the message ready to send to you. The page says clearly that nothing is sent from the site itself. |
| **Not connected** | Neither is configured (the current default) | The form is disabled, explains why, and points visitors to GitHub. |

**To switch on online delivery:**

1. Create a free account at [resend.com](https://resend.com) and an API key.
2. Verify a domain you own in Resend (needed to send to any inbox). For quick testing, Resend's shared sender `onboarding@resend.dev` only delivers to the email address on your Resend account.
3. Copy `.env.example` to `.env.local` (locally) or add the variables in your host's dashboard:

   ```bash
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"
   ```

4. Restart the dev server, or **redeploy** in production. The contact section is pre-rendered, so it picks up the new mode at build time.

The API key is only read on the server (`lib/contact-delivery.ts`) and is never sent to the browser. Never prefix these variables with `NEXT_PUBLIC_`.

**Spam protection:** a hidden honeypot field, a minimum time before a form can be submitted, server-side validation and a per-IP rate limit (5 messages per 10 minutes). The rate limit is in memory, so on serverless hosts it applies per instance — fine for a portfolio. If spam becomes a problem, add a CAPTCHA service such as Cloudflare Turnstile.

## Adding a custom domain

Domain-dependent features stay switched off until you configure a domain, so the site never publishes a false canonical URL.

1. Connect the domain at your host (on Vercel: **Project → Settings → Domains**) and follow its DNS instructions.
2. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (no trailing slash) in the host's environment variables.
3. Redeploy.

This enables canonical links, absolute Open Graph URLs, sitemap entries and the sitemap reference in `robots.txt`.

Without it: on Vercel the production `*.vercel.app` address is used for the sitemap and social images, but no canonical link is set. On other hosts the sitemap stays empty.

## Deployment

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository. The Next.js defaults (build `next build`, Node 20+) work without changes.
3. Optionally add the environment variables from `.env.example`.
4. Deploy. Every push to the main branch deploys again.

### Other hosts

Any host that runs Node.js 20.9+ works:

```bash
npm ci
npm run build
npm start          # serves on port 3000, or set PORT
```

The contact form uses a Server Action, so the site needs a Node.js server — a purely static export would disable it.

## Design and accessibility notes

- **Design tokens** live at the top of `app/globals.css` (`@theme`): background `#08090D`/`#0E111A`, text `#F5F7FC`/`#9CA3B5`, accents `#A78BFA` and `#60A5FA`, plus status colours.
- **Glass is used sparingly.** `glass` (frosted, with backdrop blur) is for the navigation, hero panels, the mobile menu and key panels. `surface` (no blur) is for repeated cards, so the page stays light on low-powered phones.
- **Write `backdrop-filter` without the `-webkit-` duplicate** in custom CSS: the build adds the prefix itself, and writing both makes the minifier keep only the prefixed version, which Chromium ignores.
- **Motion:** hero entrance, gentle floating panels, one drifting light source, a pointer-following border glow on project cards (mouse only), scroll reveals, and typing code behind the About heading. The code snippets are the `codeSnippets` array in `components/sections/AboutSection.tsx`; the typing engine is `components/ui/TypingCode.tsx` and only runs while the section is on screen and the tab is visible. Everything respects `prefers-reduced-motion`. Scroll reveals are progressive: content is visible without JavaScript, and only content still below the viewport is hidden before it fades in.
- **Accessibility:** skip link, semantic landmarks and heading order, visible focus rings, keyboard-operable mobile menu (Escape closes it and returns focus), `aria-pressed` filters with a live result count, labelled form fields with inline errors linked by `aria-describedby`, status shown as icon plus text rather than colour alone, 44px minimum touch targets, and decorative mockups exposed as single labelled images.

## Content review checklist

All copy is based on the information you supplied and on what each project's own code and documentation show. Before publishing, read it through in your own voice:

- [ ] Read the FAQ answers (`lib/faq.ts`) and the "How a project runs" steps (`lib/services.ts`) and adjust anything that doesn't match how you work.
- [ ] Add `contact.email`, and optionally `owner.name` and extra social links.
- [ ] Read each case study's **What I learned** section in `lib/projects.ts` and rewrite anything that doesn't match your own experience.
- [ ] Confirm the CENT Originals client is happy for the project to appear in your portfolio, and for any screenshots you add later.
- [ ] Re-check project statuses whenever something launches, and add live links only once they work.
