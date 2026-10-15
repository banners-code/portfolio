import { ArrowRight } from "lucide-react";
import { revealDelay } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhoamiTerminal } from "@/components/ui/WhoamiTerminal";

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      {/* Controlled lighting: one slow-drifting violet source behind the headline. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden">
        <div className="animate-drift h-[34rem] w-[min(64rem,140vw)] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.2),rgb(96_165_250/0.06)_55%,transparent)] blur-2xl" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div>
          <p
            className="glass animate-rise inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.62rem] leading-[1.2] tracking-[0.12em] whitespace-nowrap text-fg/85 uppercase sm:gap-2.5 sm:text-[0.72rem] sm:tracking-[0.16em]"
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

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={revealDelay(280)}>
            Websites, online stores and application prototypes — designed, built and taken all the way to a live domain.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={revealDelay(370)}>
            <ButtonLink href="#projects" size="lg">
              Explore My Work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Let&apos;s Build Something
            </ButtonLink>
          </div>
        </div>

        <HeroTerminal />
      </Container>
    </section>
  );
}

/** The whoami terminal, framed by the brand's corner brackets, with three labels floating around it. */
function HeroTerminal() {
  return (
    <div className="animate-rise relative mx-auto w-full max-w-[34rem] px-3 py-9 sm:px-6" style={revealDelay(260)}>
      <span aria-hidden="true" className="absolute top-0 left-0 size-14 rounded-tl-[1.75rem] border-t-2 border-l-2 border-white/25" />
      <span aria-hidden="true" className="absolute right-0 bottom-0 size-14 rounded-br-[1.75rem] border-r-2 border-b-2 border-white/25" />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-[60%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[18%] bg-[linear-gradient(135deg,rgb(196_181_253/0.5),rgb(96_165_250/0.35))] blur-3xl"
      />

      <div className="animate-float">
        <WhoamiTerminal />
      </div>

      <FloatingLabel className="top-1 left-[16%]" delay="-2s" dot="bg-violet">
        Development
      </FloatingLabel>
      <FloatingLabel className="top-[46%] -right-2 hidden sm:block" delay="-6s" dot="bg-blue">
        Experimentation
      </FloatingLabel>
      <FloatingLabel className="right-[14%] bottom-1" delay="-3.5s" dot="bg-status-planning">
        Problem-solving
      </FloatingLabel>
    </div>
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
    <span aria-hidden="true" className={`animate-float absolute z-10 ${className}`} style={{ animationDelay: delay }}>
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] text-fg/85">
        <span className={`size-1.5 rotate-45 ${dot}`} />
        {children}
      </span>
    </span>
  );
}
