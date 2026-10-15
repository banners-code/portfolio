import { ArrowRight, Check, CodeXml, FlaskConical, LayoutTemplate, Network, ShoppingBag, type LucideIcon } from "lucide-react";
import { projectProcess, services, type ServiceIcon } from "@/lib/services";
import { cn, revealDelay } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  website: LayoutTemplate,
  ecommerce: ShoppingBag,
  frontend: CodeXml,
  deployment: Network,
  prototype: FlaskConical,
};

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Services"
          command="./services --list"
          id="services-title"
          title="How I can help."
          description="Practical services for businesses, founders and teams — each one scoped around what your project actually needs."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                key={service.id}
                className={cn(
                  "group relative flex flex-col rounded-3xl p-6 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-7",
                  // The featured card is lit in the accent gradient; the rest use the quiet surface.
                  service.featured
                    ? "bg-[linear-gradient(160deg,rgb(167_139_250/0.16),rgb(96_165_250/0.05)_55%,rgb(255_255_255/0.02))] shadow-[0_24px_70px_-32px_rgb(167_139_250/0.75)] ring-1 ring-violet/45 ring-inset hover:shadow-[0_28px_80px_-30px_rgb(167_139_250/0.9)]"
                    : "surface hover:bg-white/[0.035]",
                )}
                data-reveal=""
                style={revealDelay((index % 3) * 80)}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(167_139_250/0.18),rgb(96_165_250/0.12))] text-violet-soft ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-[0_0_24px_-4px_rgb(167_139_250/0.6)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {service.featured ? (
                    <span className="rounded-full bg-violet/15 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.08em] text-violet-soft uppercase ring-1 ring-violet/30 ring-inset">
                      {service.featured}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-faint" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <ul className="mt-5 flex flex-col gap-2.5" aria-label={`${service.title}: typical deliverables`}>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2.5 text-sm text-fg/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-violet-soft" aria-hidden="true" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
                {service.note ? <p className="mt-5 text-xs leading-relaxed text-faint">{service.note}</p> : null}
                <a
                  href="#contact"
                  data-prefill={service.title}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-6 text-sm font-medium text-fg transition-colors hover:text-violet-soft"
                >
                  Discuss your project
                  <span className="sr-only">: {service.title}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </article>
            );
          })}

          <div
            className="glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7"
            data-reveal=""
            style={revealDelay(160)}
          >
            <span aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.35),transparent)] blur-xl" />
            <div className="relative">
              <p className="text-eyebrow text-violet-soft">Not sure which fits?</p>
              <h3 className="mt-4 text-2xl leading-snug font-semibold tracking-tight text-fg">
                Describe the problem instead.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                You don&apos;t need to know the solution yet. We&apos;ll work out the right scope together — including whether I&apos;m the right fit.
              </p>
            </div>
            <ButtonLink href="#contact" className="relative mt-8 self-start">
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16" data-reveal="">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-eyebrow text-violet-soft">How a project runs</h3>
            <p className="text-sm text-muted">Three stages, agreed with you up front.</p>
          </div>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line md:grid-cols-3">
            {projectProcess.map((step, index) => (
              <li key={step.title} className="group relative bg-ink-900/95 p-7 sm:p-8">
                <span
                  aria-hidden="true"
                  className="text-gradient block text-[clamp(3rem,2.2rem+2.6vw,4.75rem)] leading-none font-semibold tracking-[-0.05em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 text-xl font-semibold tracking-tight text-fg">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${step.title}: focus`}>
                  {step.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[0.68rem] text-fg/70 ring-1 ring-white/[0.07] ring-inset">
                      {tag}
                    </li>
                  ))}
                </ul>
                {index < projectProcess.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-ink-950 text-violet-soft ring-1 ring-line md:grid">
                    <ArrowRight className="size-3.5" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
