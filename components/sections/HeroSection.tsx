import type { ComponentType } from "react";
import { ArrowRight, Bitcoin, Landmark, Newspaper, ShoppingBag, Truck } from "lucide-react";
import { revealDelay } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** The kinds of websites listed in the hero's right-hand panel. */
const websiteTypes: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Bitcoin Investment Websites", icon: Bitcoin },
  { label: "E-commerce Websites", icon: ShoppingBag },
  { label: "Blogging Websites", icon: Newspaper },
  { label: "Banking Websites", icon: Landmark },
  { label: "Logistics & Delivery Websites", icon: Truck },
  { label: "WhatsApp Checkout Stores", icon: WhatsAppIcon },
];

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      {/* Controlled lighting: one slow-drifting violet source behind the headline. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden">
        <div className="animate-drift h-[34rem] w-[min(64rem,140vw)] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.2),rgb(96_165_250/0.06)_55%,transparent)] blur-2xl" />
      </div>

      <Container>
        {/* Two halves from lg: the headline on the left, the website types on the right. Stacked below. */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <p
              className="glass animate-rise inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.56rem] leading-[1.2] tracking-[0.08em] whitespace-nowrap min-[360px]:text-[0.62rem] min-[360px]:tracking-[0.12em] text-fg/85 uppercase sm:gap-2.5 sm:text-[0.72rem] sm:tracking-[0.16em]"
              style={revealDelay(0)}
            >
              <span aria-hidden="true" className="size-1.5 rotate-45 bg-violet" />
              Innovative developer
              <span aria-hidden="true" className="text-violet-soft">
                •
              </span>
              <span className="sr-only">,</span>
              Digital builder
            </p>

            <h1 id="hero-title" className="text-display mt-7 font-semibold text-fg lg:text-[clamp(3.4rem,1rem+4vw,5.2rem)]">
              <span className="animate-rise block" style={revealDelay(90)}>
                I build the web experiences
              </span>
              <span className="animate-rise text-gradient block pb-[0.08em]" style={revealDelay(180)}>
                behind ambitious ideas.
              </span>
            </h1>

            <p className="animate-rise mx-auto mt-7 max-w-xl text-lg lg:mx-0 leading-relaxed text-muted" style={revealDelay(280)}>
              Websites, online stores and application prototypes — designed, built and taken all the way to a live domain.
            </p>

            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start" style={revealDelay(370)}>
              <ButtonLink href="#projects" size="lg">
                Explore My Work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                Let&apos;s Build Something
              </ButtonLink>
            </div>

          </div>

          <div className="animate-rise relative mx-auto w-full max-w-[32rem] lg:max-w-none" style={revealDelay(260)}>
            <span
              aria-hidden="true"
              className="absolute inset-[12%] -z-10 rounded-full bg-[linear-gradient(135deg,rgb(196_181_253/0.32),rgb(96_165_250/0.22))] blur-3xl"
            />
            <div className="glass rounded-3xl bg-ink-950/50! p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 id="hero-builds" className="text-eyebrow text-violet-soft">
                  Websites I build
                </h2>
                <span aria-hidden="true" className="font-mono text-[0.7rem] text-faint">
                  {String(websiteTypes.length).padStart(2, "0")} types
                </span>
              </div>
              <ul aria-labelledby="hero-builds" className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {websiteTypes.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3 text-[0.92rem] text-fg/90 ring-1 ring-white/[0.07] ring-inset transition-colors hover:bg-white/[0.07]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet-soft ring-1 ring-violet/25">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <FloatingLabel className="-top-4 -left-6" delay="-2s" dot="bg-violet">
              Development
            </FloatingLabel>
            <FloatingLabel className="-bottom-4 left-8" delay="-6s" dot="bg-blue">
              Experimentation
            </FloatingLabel>
            <FloatingLabel className="-right-2 -bottom-4" delay="-3.5s" dot="bg-status-planning">
              Problem-solving
            </FloatingLabel>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FloatingLabel({
  children,
  className,
  delay,
  dot,
}: {
  children: string;
  className: string;
  delay: string;
  dot: string;
}) {
  return (
    <span aria-hidden="true" className={`animate-float absolute z-10 hidden lg:block ${className}`} style={{ animationDelay: delay }}>
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] text-fg/85">
        <span className={`size-1.5 rotate-45 ${dot}`} />
        {children}
      </span>
    </span>
  );
}
