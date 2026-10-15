"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses } from "@/components/ui/Button";
import { cn, sectionHref } from "@/lib/utils";

/**
 * Disclosure panel for small screens. Opening moves focus to the first link; Escape,
 * the toggle, a link, the backdrop or tabbing away closes it (handled by Navbar).
 */
export function MobileMenu({
  id,
  open,
  activeId,
  onNavigate,
}: {
  id: string;
  open: boolean;
  activeId: string | null;
  onNavigate: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  return (
    <div
      ref={panelRef}
      id={id}
      hidden={!open}
      className="glass animate-fade-in mx-auto mt-2 max-w-[76rem] rounded-3xl p-2 lg:hidden"
    >
      <ul className="flex flex-col">
        {siteConfig.nav.map((item, index) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <Link
                href={sectionHref(item.id)}
                onClick={onNavigate}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-2xl px-4 text-base transition-colors",
                  active ? "bg-white/[0.07] text-fg" : "text-muted hover:bg-white/[0.04] hover:text-fg",
                )}
              >
                {item.label}
                <span className="font-mono text-xs text-faint" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 border-t border-line p-2 pt-3">
        <Link
          href={sectionHref("contact")}
          onClick={onNavigate}
          className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
        >
          Let&apos;s talk
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
