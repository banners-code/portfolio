import { ArrowRight } from "lucide-react";
import { revealDelay } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** The kinds of websites shown under the hero buttons. */
const websiteTypes = [
  "Bitcoin Investment Websites",
  "E-commerce Websites",
  "Blogging Websites",
  "Banking Websites",
  "Logistics & Delivery Websites",
  "Shipping Websites",
];

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      {/* Controlled lighting: one slow-drifting violet source behind the headline. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden">
        <div className="animate-drift h-[34rem] w-[min(64rem,140vw)] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.2),rgb(96_165_250/0.06)_55%,transparent)] blur-2xl" />
      </div>

      <Container>
        {/* The whoami terminal now plays as the intro; the hero is a centred headline. */}
        <div className="relative mx-auto max-w-4xl text-center">
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

          <h1 id="hero-title" className="text-display mt-7 font-semibold text-fg">
            <span className="animate-rise block" style={revealDelay(90)}>
              I build the web experiences
            </span>
            <span className="animate-rise text-gradient block pb-[0.08em]" style={revealDelay(180)}>
              behind ambitious ideas.
            </span>
          </h1>

          <p className="animate-rise mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted" style={revealDelay(280)}>
            Websites, online stores and application prototypes — designed, built and taken all the way to a live domain.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center" style={revealDelay(370)}>
            <ButtonLink href="#projects" size="lg">
              Explore My Work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Let&apos;s Build Something
            </ButtonLink>
          </div>

          <div className="animate-rise mx-auto mt-10 max-w-2xl" style={revealDelay(460)}>
            <p id="hero-builds" className="text-eyebrow text-faint">
              Websites I build
            </p>
            <ul aria-labelledby="hero-builds" className="mt-4 flex flex-wrap justify-center gap-2">
              {websiteTypes.map((type) => (
                <li
                  key={type}
                  className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8rem] text-fg/85 sm:text-sm"
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-[linear-gradient(135deg,#c4b5fd,#60a5fa)]" />
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <FloatingLabel className="top-2 -left-24" delay="-2s" dot="bg-violet">
            Development
          </FloatingLabel>
          <FloatingLabel className="top-[44%] -right-28" delay="-6s" dot="bg-blue">
            Experimentation
          </FloatingLabel>
          <FloatingLabel className="bottom-2 -left-16" delay="-3.5s" dot="bg-status-planning">
            Problem-solving
          </FloatingLabel>
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
    <span aria-hidden="true" className={`animate-float absolute z-10 hidden xl:block ${className}`} style={{ animationDelay: delay }}>
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] text-fg/85">
        <span className={`size-1.5 rotate-45 ${dot}`} />
        {children}
      </span>
    </span>
  );
}
