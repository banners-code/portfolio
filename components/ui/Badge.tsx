import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Compact label for technologies and topics. */
export function Badge({
  children,
  tone = "default",
  size = "sm",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "outline";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full leading-none font-medium whitespace-nowrap",
        size === "sm" ? "px-2.5 py-1 text-[0.75rem]" : "px-3 py-1.5 text-[0.8rem]",
        tone === "default" && "bg-white/[0.06] text-fg/85 ring-1 ring-white/[0.08] ring-inset",
        tone === "outline" && "border border-dashed border-white/[0.16] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
