import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { botAnchor, bots, type BotId } from "@/lib/bots";
import { sectionNumber, whatsappLink } from "@/lib/site-config";
import { cn, revealDelay } from "@/lib/utils";
import { TelegramBotDemo } from "@/components/bots/TelegramBotDemo";
import { WhatsAppBotDemo } from "@/components/bots/WhatsAppBotDemo";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Each bot in its platform's colours: the icon, the light behind the demo and the ticks. */
const themes: Record<BotId, { icon: ComponentType<{ className?: string }>; Demo: ComponentType; accent: string; tile: string; stage: string; dot: string }> = {
  whatsapp: {
    icon: WhatsAppIcon,
    Demo: WhatsAppBotDemo,
    accent: "text-[#25d366]",
    tile: "bg-[#25d366]/12 ring-[#25d366]/30",
    stage: "bg-[radial-gradient(75%_60%_at_50%_45%,rgb(37_211_102/0.2),transparent_70%),linear-gradient(160deg,#0b1712,#080b10)]",
    dot: "bg-[#25d366]",
  },
  telegram: {
    icon: TelegramIcon,
    Demo: TelegramBotDemo,
    accent: "text-[#2aabee]",
    tile: "bg-[#2aabee]/12 ring-[#2aabee]/30",
    stage: "bg-[radial-gradient(75%_60%_at_50%_45%,rgb(42_171_238/0.22),transparent_70%),linear-gradient(160deg,#0a1420,#080b10)]",
    dot: "bg-[#2aabee]",
  },
};

/** WhatsApp chatbots and Telegram bots, each beside a demo visitors can try. */
export function BotsSection() {
  return (
    <section id="bots" aria-labelledby="bots-title" className="relative py-16 sm:py-20">
      <Container>
        <SectionHeading
          index={sectionNumber("bots")}
          eyebrow="Bots I build"
          command="./bots --start"
          id="bots-title"
          title={
            <>
              Bots that work <span className="text-gradient">while you&apos;re away.</span>
            </>
          }
          description="WhatsApp chatbots that answer your customers day and night, and Telegram bots that open your website right inside Telegram. Try both demos — tap the buttons in each phone."
        />

        <div className="mt-12 flex flex-col gap-6 lg:gap-8">
          {bots.map((bot, index) => {
            const { icon: Icon, Demo, accent, tile, stage, dot } = themes[bot.id];
            const quote = whatsappLink(bot.quote);
            return (
              <article
                key={bot.id}
                id={botAnchor(bot.id).slice(1)}
                aria-labelledby={`bot-${bot.id}-title`}
                className="surface grid scroll-mt-28 overflow-hidden rounded-[2rem] lg:grid-cols-2"
                data-reveal=""
                style={revealDelay(80)}
              >
                <div className={cn("relative isolate flex items-center justify-center overflow-hidden px-4 pt-20 pb-12 sm:px-8", stage, index % 2 === 1 && "lg:order-last")}>
                  {/* A faint grid behind the phone, fading out at the edges. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_30%,transparent_80%)]"
                  />
                  <span className="absolute top-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-fg/85 uppercase ring-1 ring-white/10">
                    <span className="relative flex size-2">
                      <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", dot)} />
                      <span className={cn("relative size-2 rounded-full", dot)} />
                    </span>
                    Interactive demo
                  </span>

                  <div className="relative w-full max-w-[19.5rem]">
                    <Demo />
                    <FloatingChip className="-top-3 -left-16" delay="-2s" dot={dot}>
                      {bot.highlights[0]}
                    </FloatingChip>
                    <FloatingChip className="-right-14 -bottom-7" delay="-5s" dot={dot}>
                      {bot.highlights[1]}
                    </FloatingChip>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                  <p className={cn("text-eyebrow flex items-center gap-3", accent)}>
                    <span className={cn("grid size-10 place-items-center rounded-2xl ring-1 ring-inset", tile)}>
                      <Icon className="size-5" />
                    </span>
                    {bot.kind}
                  </p>
                  <h3 id={`bot-${bot.id}-title`} className="mt-6 text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-fg">
                    {bot.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{bot.summary}</p>
                  <ul className="mt-6 flex flex-col gap-2.5" aria-label={`${bot.kind}: what it does`}>
                    {bot.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/85">
                        <Check className={cn("mt-0.5 size-4 shrink-0", accent)} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {bot.note ? <p className="mt-5 text-xs leading-relaxed text-faint">{bot.note}</p> : null}

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {quote ? (
                      <a href={quote} target="_blank" rel="noopener noreferrer" className={buttonClasses({ size: "lg" })}>
                        <WhatsAppIcon className="size-4" />
                        Get a quote on WhatsApp
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <a href="#contact" data-prefill={bot.kind} className={buttonClasses({ size: "lg" })}>
                        Ask for a quote
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    )}
                    {bot.caseStudy ? (
                      <Link
                        href={bot.caseStudy.href}
                        className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                      >
                        {bot.caseStudy.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** A label floating over a corner of the phone, kept clear of the demo's buttons. Decorative. */
function FloatingChip({ children, className, delay, dot }: { children: string; className: string; delay: string; dot: string }) {
  return (
    <span aria-hidden="true" className={cn("animate-float pointer-events-none absolute z-10 hidden sm:block", className)} style={{ animationDelay: delay }}>
      <span className="glass inline-flex items-center gap-2 rounded-full bg-ink-950/60! px-3 py-1.5 font-mono text-[0.68rem] whitespace-nowrap text-fg/90">
        <span className={cn("size-1.5 rotate-45", dot)} />
        {children}
      </span>
    </span>
  );
}
