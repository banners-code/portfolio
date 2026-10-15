import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { contactEmail, siteConfig, socialLinks, whatsappContact } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { sectionHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-line">
      <div aria-hidden="true" className="hairline-x absolute inset-x-0 -top-px" />

      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href={sectionHref("home")} className="inline-flex rounded-full" aria-label={`${siteConfig.brand.name} — back to the top`}>
            <Wordmark className="h-8 w-auto" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-muted">{siteConfig.brand.footerLine}</p>
          <p className="mt-6 font-mono text-xs leading-relaxed text-violet-soft/90">
            Still building. Still learning. Always working on the next version.
          </p>
        </div>

        <nav aria-labelledby="footer-sections">
          <h2 id="footer-sections" className="text-eyebrow text-faint">
            Sections
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {siteConfig.nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={sectionHref(item.id)}
                  className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-eyebrow text-faint">Elsewhere</h2>
          <ul className="mt-5 flex flex-col gap-1">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  {contactEmail}
                </a>
              ) : (
                <Link
                  href={sectionHref("contact")}
                  className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-fg"
                >
                  Get in touch
                </Link>
              )}
            </li>
            {whatsappContact ? (
              <li>
                <a
                  href={whatsappContact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  <WhatsAppIcon className="size-3.5" />
                  {whatsappContact.display}
                  <span className="sr-only"> — WhatsApp (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.brand.name}
        </p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
      </Container>

      {/* Oversized logo as the page's closing mark. Decorative. */}
      <div aria-hidden="true" className="pointer-events-none overflow-hidden select-none">
        <Container className="[mask-image:linear-gradient(to_bottom,#000_20%,transparent_95%)]">
          <Wordmark className="h-auto w-full opacity-[0.08]" sizes="(min-width: 1216px) 1152px, 100vw" />
        </Container>
      </div>
    </footer>
  );
}
