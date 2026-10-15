import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";
import { revealDelay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Client FAQ built on native <details>, so it works without JavaScript and with the keyboard. */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="05"
            eyebrow="FAQ"
            command="man faq"
            id="faq-title"
            title="Questions clients often ask."
            description="Straight answers about how I work. If yours isn't here, ask me directly."
          />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-7" data-reveal="" style={revealDelay(100)}>
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              name="faq"
              className="group surface rounded-2xl transition-colors duration-300 open:bg-white/[0.04]"
              open={index === 0}
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium text-fg marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-violet-soft ring-1 ring-white/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 pl-12 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
