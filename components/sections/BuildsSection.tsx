import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildAnchor, builds, type BuildId } from "@/lib/builds";
import { sectionNumber, whatsappLink } from "@/lib/site-config";
import { cn, revealDelay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** What each kind of website usually includes, with a quote on WhatsApp (or the contact form). */
export function BuildsSection() {
  return (
    <section id="builds" aria-labelledby="builds-title" className="relative py-16 sm:py-20">
      <Container>
        <SectionHeading
          index={sectionNumber("builds")}
          eyebrow="What I can build"
          command="./build"
          id="builds-title"
          title="Websites for your kind of business."
          description="What each type of website usually includes. Two have case studies of my own work; the previews for the others illustrate the features — they aren't client sites."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {builds.map((build, index) => {
            const quote = whatsappLink(`Hi, I'd like a quote for a ${build.short}.`);
            return (
              <li
                key={build.id}
                id={buildAnchor(build.id).slice(1)}
                className="surface flex scroll-mt-28 flex-col rounded-3xl p-2 target:ring-2 target:ring-violet-soft/60"
                data-reveal=""
                style={revealDelay((index % 3) * 70)}
              >
                <BuildPreview id={build.id} />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{build.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{build.summary}</p>
                  <ul className="mt-5 flex flex-col gap-2" aria-label={`${build.title}: typical features`}>
                    {build.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-violet-soft" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {build.note ? <p className="mt-4 text-xs leading-relaxed text-faint">{build.note}</p> : null}

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                    {quote ? (
                      <a
                        href={quote}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-violet-soft"
                      >
                        <WhatsAppIcon className="size-4 text-[#25d366]" />
                        Get a quote on WhatsApp
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        data-prefill={build.title}
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-violet-soft"
                      >
                        Ask for a quote
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    )}
                    {build.caseStudy ? (
                      <Link
                        href={build.caseStudy.href}
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                      >
                        {build.caseStudy.label}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

const previewLabel: Record<BuildId, string> = {
  investment: "an investment dashboard with a rising portfolio chart and plan options.",
  ecommerce: "a storefront with a row of product cards and a cart badge.",
  blogging: "a blog with a featured article and a list of posts.",
  banking: "a banking dashboard with an account balance card and recent transactions.",
  logistics: "a shipment tracker with a tracking number and a delivery timeline.",
  whatsapp: "a cart beside a WhatsApp chat holding the complete order.",
};

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full", className)} />;
}

/** Small CSS illustrations of each type of site. Decorative and captioned as illustrative. */
function BuildPreview({ id }: { id: BuildId }) {
  return (
    <div
      role="img"
      aria-label={`Illustrative preview: ${previewLabel[id]}`}
      className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[radial-gradient(120%_100%_at_80%_0%,rgb(167_139_250/0.16),transparent_60%),#0b0e17] ring-1 ring-white/[0.08]"
    >
      <div className="absolute inset-x-4 top-4 bottom-10 flex flex-col gap-3">{previews[id]}</div>
      <span className="absolute right-3 bottom-3 rounded-full bg-ink-950/75 px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.08em] text-fg/70 uppercase ring-1 ring-white/10">
        Illustrative
      </span>
    </div>
  );
}

const previews: Record<BuildId, ReactNode> = {
  investment: (
    <>
      <div className="flex items-center justify-between">
        <Bar className="w-16 bg-white/25" />
        <span className="rounded-full bg-amber-300/15 px-2 py-0.5 font-mono text-[0.6rem] text-amber-200">₿ BTC</span>
      </div>
      <svg viewBox="0 0 200 60" className="h-full w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="build-chart" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.45" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 50 L25 44 L50 46 L75 33 L100 36 L125 24 L150 27 L175 14 L200 9 L200 60 L0 60Z" fill="url(#build-chart)" />
        <path d="M0 50 L25 44 L50 46 L75 33 L100 36 L125 24 L150 27 L175 14 L200 9" fill="none" stroke="#c4b5fd" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {["Starter", "Growth", "Premium"].map((plan, index) => (
          <span key={plan} className={cn("rounded-lg px-2 py-1.5 text-center text-[0.62rem]", index === 1 ? "bg-violet/25 text-fg" : "bg-white/[0.05] text-fg/60")}>
            {plan}
          </span>
        ))}
      </div>
    </>
  ),
  ecommerce: (
    <>
      <div className="flex items-center justify-between">
        <Bar className="w-14 bg-white/25" />
        <span className="grid size-5 place-items-center rounded-full bg-violet text-[0.6rem] font-semibold text-ink-950">3</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {["#f9a8d4", "#93c5fd", "#fcd34d"].map((color) => (
          <div key={color} className="flex flex-col gap-1.5 rounded-lg bg-white/[0.05] p-1.5">
            <span className="block flex-1 rounded-md" style={{ background: `${color}33` }}>
              <span className="mx-auto mt-[22%] block size-1/2 rounded-full" style={{ background: color }} />
            </span>
            <Bar className="w-3/4 bg-white/25" />
            <Bar className="w-1/3 bg-violet-soft/50" />
          </div>
        ))}
      </div>
    </>
  ),
  blogging: (
    <>
      <div className="flex gap-3">
        <span className="block aspect-[4/3] w-2/5 rounded-lg bg-[linear-gradient(135deg,#60a5fa55,#a78bfa55)]" />
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <span className="font-mono text-[0.55rem] tracking-[0.1em] text-violet-soft uppercase">Featured</span>
          <span className="block h-2.5 w-11/12 rounded bg-white/70" />
          <span className="block h-2.5 w-2/3 rounded bg-white/70" />
          <Bar className="mt-1 w-4/5 bg-white/15" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {[0, 1].map((row) => (
          <div key={row} className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-1.5">
            <span className="size-5 shrink-0 rounded bg-white/10" />
            <Bar className="w-3/5 bg-white/25" />
            <span className="ml-auto rounded-full bg-white/[0.06] px-1.5 font-mono text-[0.55rem] text-faint">5 min</span>
          </div>
        ))}
      </div>
    </>
  ),
  banking: (
    <>
      <div className="rounded-xl bg-[linear-gradient(135deg,#4c1d95,#1e40af)] p-3">
        <span className="font-mono text-[0.55rem] tracking-[0.1em] text-white/70 uppercase">Available balance</span>
        <span className="mt-1.5 block h-3 w-1/2 rounded bg-white/85" />
        <div className="mt-2 flex gap-1.5">
          {["Transfer", "Pay", "Cards"].map((action) => (
            <span key={action} className="rounded-full bg-white/15 px-2 py-0.5 text-[0.55rem] text-white">
              {action}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {[
          ["bg-emerald-300/70", "w-2/5"],
          ["bg-rose-300/70", "w-1/2"],
        ].map(([dot, width], row) => (
          <div key={row} className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", dot)} />
            <Bar className={cn(width, "bg-white/20")} />
            <Bar className="ml-auto w-8 bg-white/30" />
          </div>
        ))}
      </div>
    </>
  ),
  logistics: (
    <>
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5 ring-1 ring-white/10">
        <span className="flex-1 font-mono text-[0.62rem] text-fg/70">TRK-20481</span>
        <span className="rounded-md bg-violet px-2 py-0.5 text-[0.58rem] font-semibold text-ink-950">Track</span>
      </div>
      <ol className="flex flex-1 items-center">
        {["Picked up", "In transit", "Out for delivery", "Delivered"].map((step, index) => (
          <li key={step} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <span className="flex w-full items-center">
              <span className={cn("h-px flex-1", index === 0 ? "bg-transparent" : index <= 2 ? "bg-violet-soft/70" : "bg-white/15")} />
              <span
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  index < 2 ? "bg-violet-soft" : index === 2 ? "border-2 border-violet-soft bg-ink-950" : "border border-white/25",
                )}
              />
              <span className={cn("h-px flex-1", index === 3 ? "bg-transparent" : index < 2 ? "bg-violet-soft/70" : "bg-white/15")} />
            </span>
            <span className="text-[0.52rem] leading-tight text-fg/60">{step}</span>
          </li>
        ))}
      </ol>
    </>
  ),
  whatsapp: (
    <div className="grid flex-1 grid-cols-[1fr_0.9fr] gap-3">
      <div className="flex flex-col gap-1.5 rounded-lg bg-white/[0.05] p-2">
        {[0, 1].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="size-5 shrink-0 rounded bg-white/10" />
            <Bar className="w-1/2 bg-white/25" />
          </div>
        ))}
        <span className="mt-auto rounded-md bg-[#25d366] py-1 text-center text-[0.55rem] font-semibold text-[#06281a]">Checkout on WhatsApp</span>
      </div>
      <div className="flex flex-col gap-1.5 rounded-lg bg-[#0b141a] p-2 ring-1 ring-white/[0.06]">
        <div className="ml-auto w-11/12 rounded-md bg-[#005c4b] p-1.5">
          <span className="text-[0.52rem] font-semibold text-white">New order</span>
          <Bar className="mt-1 w-4/5 bg-white/40" />
          <Bar className="mt-1 w-3/5 bg-white/40" />
        </div>
        <div className="w-3/4 rounded-md bg-[#1f2c33] p-1.5">
          <Bar className="w-4/5 bg-white/30" />
        </div>
      </div>
    </div>
  ),
};
