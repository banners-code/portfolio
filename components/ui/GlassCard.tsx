import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps<T extends ElementType> = {
  as?: T;
  /** "glass" blurs what's behind it; "surface" is the lighter, blur-free variant for repeated cards. */
  variant?: "glass" | "surface";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function GlassCard<T extends ElementType = "div">({
  as,
  variant = "glass",
  className,
  ...props
}: GlassCardProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(variant === "glass" ? "glass" : "surface", "rounded-3xl", className)}
      {...props}
    />
  );
}
