import { siteConfig } from "@/lib/site-config";
import { Marquee } from "@/components/ui/Marquee";

const separator = <span className="mx-6 size-3 rotate-45 bg-[linear-gradient(135deg,#c4b5fd,#60a5fa)] sm:mx-10 sm:size-4" />;

/** A large, slow band of your name between the hero and About. Decorative. */
export function NameMarquee() {
  const name = siteConfig.owner.name || siteConfig.brand.name;
  // The name alone, alternating solid, outlined and gradient.
  const words = [
    { key: "fill", text: name, style: "fill" },
    { key: "outline", text: name, style: "outline" },
    { key: "gradient", text: name, style: "gradient" },
  ] as const;

  return (
    <div className="relative border-y border-line py-7 sm:py-9">
      <Marquee
        separator={separator}
        items={words.map((word) => (
          <span
            key={word.key}
            className={
              word.style === "fill"
                ? "text-fg"
                : word.style === "gradient"
                  ? "text-gradient"
                  : "text-transparent [-webkit-text-stroke:1px_rgb(245_247_252/0.32)]"
            }
          >
            {word.text}
          </span>
        ))}
        trackClassName="text-[clamp(2.4rem,1.4rem+4.6vw,5.75rem)] leading-[1.1] font-semibold tracking-[-0.04em] whitespace-nowrap"
      />
    </div>
  );
}
