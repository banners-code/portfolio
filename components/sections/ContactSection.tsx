import { Mail } from "lucide-react";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
import { contactEmail, siteConfig } from "@/lib/site-config";
import { revealDelay } from "@/lib/utils";
import { ContactForm, type ContactMode } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const helpfulDetails = [
  "What you're building, and who it's for",
  "Any timeline or budget range you have in mind",
  "Links to existing sites, designs or references",
];

export function ContactSection() {
  const mode: ContactMode = isContactDeliveryConfigured() ? "online" : contactEmail ? "mailto" : "offline";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <Container>
        <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-32 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.22),transparent)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -bottom-48 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(96_165_250/0.16),transparent)] blur-2xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <SectionHeading
                index="06"
                eyebrow="Contact"
                command="./contact --send"
                id="contact-title"
                title="Have an idea worth building?"
                description="Whether you're hiring, planning a project or looking for a collaborator, I'd like to hear about it. Tell me what you're working on and what you need."
              />

              <div className="mt-10" data-reveal="" style={revealDelay(80)}>
                <h3 className="text-eyebrow text-faint">Helpful to include</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {helpfulDetails.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm text-muted">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-violet" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {contactEmail ? (
                <div className="mt-10 flex flex-col gap-2" data-reveal="" style={revealDelay(140)}>
                  <h3 className="text-eyebrow text-faint">Email</h3>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="group mt-2 inline-flex min-h-11 items-center gap-3 self-start text-fg transition-colors hover:text-violet-soft"
                  >
                    <Mail className="size-4 text-violet-soft" aria-hidden="true" />
                    {contactEmail}
                  </a>
                </div>
              ) : null}
            </div>

            <div data-reveal="" style={revealDelay(100)}>
              <ContactForm mode={mode} email={contactEmail} githubUrl={siteConfig.social.github} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
