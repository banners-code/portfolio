import { siteConfig } from "@/lib/site-config";
import { revealDelay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Portrait } from "@/components/ui/Portrait";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TypingCode, type CodeSnippet } from "@/components/ui/TypingCode";

/**
 * Background code for the About heading: the kind of code behind my projects (components, data,
 * commerce logic). Decorative only, and deliberately not a restatement of the text on the page.
 */
const codeSnippets: CodeSnippet[] = [
  [
    [["comment", "// components/ProjectCard.tsx"]],
    [["keyword", "export function "], ["fn", "ProjectCard"], ["plain", "({ project }: "], ["name", "Props"], ["plain", ") {"]],
    [["keyword", "  return "], ["plain", "("]],
    [["plain", "    <"], ["name", "article"], ["key", " className"], ["plain", "="], ["string", '"card"'], ["plain", ">"]],
    [["plain", "      <"], ["name", "h3"], ["plain", ">{project.title}</"], ["name", "h3"], ["plain", ">"]],
    [["plain", "      <"], ["fn", "StatusBadge"], ["key", " status"], ["plain", "={project.status} />"]],
    [["plain", "    </"], ["name", "article"], ["plain", ">"]],
  ],
  [
    [["comment", "// lib/products.ts"]],
    [["keyword", "export async function "], ["fn", "getProducts"], ["plain", "(category: "], ["name", "string"], ["plain", ") {"]],
    [["keyword", "  const "], ["plain", "{ data, error } = "], ["keyword", "await "], ["name", "supabase"]],
    [["plain", "    ."], ["fn", "from"], ["plain", "("], ["string", '"products"'], ["plain", ")"]],
    [["plain", "    ."], ["fn", "select"], ["plain", "("], ["string", '"id, name, price, images"'], ["plain", ")"]],
    [["plain", "    ."], ["fn", "eq"], ["plain", "("], ["string", '"category"'], ["plain", ", category);"]],
    [["keyword", "  return "], ["plain", "error ? [] : data;"]],
  ],
  [
    [["comment", "// lib/cart.ts"]],
    [["keyword", "export function "], ["fn", "cartTotal"], ["plain", "(lines: "], ["name", "CartLine"], ["plain", "[]) {"]],
    [["keyword", "  return "], ["plain", "lines."], ["fn", "reduce"], ["plain", "("]],
    [["plain", "    (sum, line) => sum + line.price * line.quantity,"]],
    [["plain", "    0,"]],
    [["plain", "  );"]],
    [["plain", "}"]],
  ],
];

export function AboutSection() {
  const { name, role, university, country, photo } = siteConfig.owner;
  const intro = name ? `I'm ${name} — a ${role.toLowerCase()}` : `I'm a ${role.toLowerCase()}`;

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 sm:py-28">
      <Container className="relative isolate grid items-center gap-14 lg:grid-cols-12 lg:gap-14">
        {/* Typing code that starts above the heading and runs behind it. */}
        <TypingCode
          snippets={codeSnippets}
          className="pointer-events-none absolute -top-[4.5rem] right-4 left-4 -z-10 overflow-hidden text-[0.8rem] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_34%,transparent_52%)] sm:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_62%,transparent_100%)] sm:-top-20 sm:right-6 sm:left-[10.5rem] sm:text-[1rem] lg:right-8 lg:left-[11rem] lg:text-[1.05rem]"
        />
        <div className="lg:col-span-7">
          <SectionHeading
            index="01"
            eyebrow="About"
            id="about-title"
            // A thin dark halo (inherited by the label and heading) keeps text crisp over the typing code.
            className="[text-shadow:0_0_6px_rgb(8_9_13/0.85)]"
            title={
              <>
                I don&apos;t just explore ideas. <span className="text-muted">I work to turn them into digital experiences.</span>
              </>
            }
          />
          <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-muted" data-reveal="" style={revealDelay(80)}>
            <p>
              {intro} and Computer Science student at {university} in {country}. I learn by building: taking an idea, giving it
              structure, and working through the details until it holds together as something people can actually use.
            </p>
            <p>
              That approach has taken me from client work — I have worked with{" "}
              <span className="text-fg">CENT Originals</span>, a clothing brand — to my own e-commerce platform built with
              Next.js and Supabase, and to experiments such as a Telegram Mini App prototype.
            </p>
            <p>
              Along the way I&apos;ve learned that a website is more than its interface. Domains, DNS, hosting and SSL
              certificates all have to work before anyone sees a page, so investigating deployment problems has become part of
              how I work.
            </p>
            <p>
              I&apos;m still growing as a developer, and I&apos;m deliberate about it: every project leaves me with sharper
              skills and better questions for the next one.
            </p>
          </div>
        </div>

        {photo ? (
          <div className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none" data-reveal="" style={revealDelay(120)}>
            <Portrait
              src={photo.src}
              width={photo.width}
              height={photo.height}
              name={name || siteConfig.brand.name}
              fileLabel="~/about/anthony.jpg"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
