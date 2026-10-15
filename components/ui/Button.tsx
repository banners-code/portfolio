import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,box-shadow,color,filter] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#ddd6fe_0%,#a78bfa_45%,#60a5fa_100%)] text-ink-950 shadow-[0_10px_30px_-10px_rgb(167_139_250_/_0.65)] hover:brightness-110 hover:shadow-[0_14px_40px_-10px_rgb(167_139_250_/_0.85)]",
  secondary: "glass text-fg hover:bg-white/[0.09]",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.95rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

/** A link styled as a button. In-site links use next/link; external links open in a new tab. */
export function ButtonLink({ href, variant, size, external, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size } & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
