"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Mail, Menu, X } from "lucide-react";
import { contactEmail, siteConfig, whatsappContact } from "@/lib/site-config";
import { cn, sectionHref } from "@/lib/utils";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { MobileMenu } from "./MobileMenu";
import { useActiveSection } from "./useActiveSection";

const MENU_ID = "mobile-menu";
const navIds = siteConfig.nav.map((item) => item.id);
const iconLink =
  "grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg sm:size-11";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const spyId = useActiveSection(navIds, isHome);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const activeId = isHome ? spyId : null;
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (open && !headerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <>
      <header ref={headerRef} onBlur={onBlur} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Main"
          className={cn(
            "glass mx-auto flex max-w-[76rem] items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-4 transition-[background-color,box-shadow] duration-500",
            // `!` because the glass utility's background shorthand would otherwise win.
            scrolled ? "bg-ink-950/75!" : "bg-ink-950/30!",
          )}
        >
          <Link
            href={sectionHref("home")}
            onClick={close}
            className="-my-1 flex min-h-11 items-center rounded-full px-1"
            aria-label={`${siteConfig.brand.name} — back to the top`}
          >
            <Wordmark priority className="h-[1.35rem] w-auto sm:h-6" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={sectionHref(item.id)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative inline-flex min-h-10 items-center rounded-full px-3.5 text-sm transition-colors duration-300",
                      active ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {/* GitHub, WhatsApp and email: slightly smaller on phones so the bar fits a 320px screen. */}
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className={iconLink}
            >
              <GitHubIcon className="size-[1.1rem] sm:size-[1.15rem]" />
            </a>
            {whatsappContact ? (
              <a
                href={whatsappContact.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp, ${whatsappContact.display} (opens in a new tab)`}
                className={iconLink}
              >
                <WhatsAppIcon className="size-[1.1rem] sm:size-[1.15rem]" />
              </a>
            ) : null}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} aria-label={`Email ${contactEmail}`} className={iconLink}>
                <Mail className="size-[1.1rem] sm:size-[1.15rem]" aria-hidden="true" />
              </a>
            ) : null}
            {/* Wrapped: the button's own display class would override `hidden`. */}
            <span className="hidden sm:block">
              <ButtonLink href={sectionHref("contact")}>Let&apos;s talk</ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/[0.06] sm:size-11 lg:hidden"
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
        <MobileMenu id={MENU_ID} open={open} activeId={activeId} onNavigate={close} />
      </header>
      {open ? (
        <div aria-hidden="true" className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm lg:hidden" onClick={close} />
      ) : null}
    </>
  );
}
