import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The Banner Tech hand-lettered logo. Decorative by default (alt=""), because every link that
 * wraps it carries its own accessible label; pass `label` when it stands alone.
 */
export function Wordmark({
  className,
  label,
  priority,
  sizes = "(min-width: 640px) 160px, 130px",
}: {
  className?: string;
  label?: string;
  priority?: boolean;
  /** Responsive image hint; raise it for large renderings. */
  sizes?: string;
}) {
  const { src, width, height } = siteConfig.brand.logo;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={label ?? ""}
      priority={priority}
      sizes={sizes}
      // Size comes from className (default "h-6 w-auto"); pass both a height and a width rule.
      className={cn(className ?? "h-6 w-auto", "select-none")}
      draggable={false}
    />
  );
}
