import { sectionNumber } from "@/lib/site-config";
import { CodeXml, Database, GitBranch, Layers, Network, type LucideIcon } from "lucide-react";
import { skillGroups, skillLevels, type SkillGroupIcon, type SkillLevel } from "@/lib/skills";
import { cn, revealDelay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const groupIcons: Record<SkillGroupIcon, LucideIcon> = {
  frontend: CodeXml,
  data: Database,
  workflow: GitBranch,
  infrastructure: Network,
  product: Layers,
};

/** Editorial rhythm for the five groups on large screens. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];

/** Each level has its own shape as well as colour, so the legend never relies on colour alone. */
function LevelGlyph({ level }: { level: SkillLevel }) {
  return (
    <span aria-hidden="true" className="grid size-3 shrink-0 place-items-center">
      {level === "hands-on" ? <span className="size-2.5 rounded-full bg-violet shadow-[0_0_10px_rgb(167_139_250/0.7)]" /> : null}
      {level === "project" ? (
        <span className="size-2.5 rounded-full bg-[linear-gradient(90deg,var(--color-blue)_50%,transparent_50%)] ring-1 ring-blue" />
      ) : null}
      {level === "developing" ? <span className="size-2.5 rounded-full border-[1.5px] border-dotted border-status-planning" /> : null}
      {level === "planning" ? <span className="size-2 rotate-45 border-[1.5px] border-status-client" /> : null}
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-16 sm:py-20">
      <Container>
        <SectionHeading
          index={sectionNumber("skills")}
          eyebrow="Skills"
          command="scan --skills"
          id="skills-title"
          title="Skills, grouped by the work behind them."
          description="No percentage bars. Each skill is labelled with how I've actually used it — and where I'm still learning."
        />

        <dl className="mt-10 flex flex-wrap gap-x-7 gap-y-3" data-reveal="" style={revealDelay(80)}>
          {(Object.keys(skillLevels) as SkillLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-2.5">
              <dt className="flex items-center gap-2 text-sm text-fg">
                <LevelGlyph level={level} />
                {skillLevels[level].label}
              </dt>
              <dd className="hidden text-xs text-faint xl:block">— {skillLevels[level].description}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {skillGroups.map((group, index) => {
            const Icon = groupIcons[group.icon];
            return (
              <article
                key={group.id}
                className={cn("surface flex flex-col rounded-3xl p-6 sm:p-8", spans[index] ?? "lg:col-span-6")}
                data-reveal=""
                style={revealDelay((index % 2) * 90)}
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(167_139_250/0.18),rgb(96_165_250/0.12))] text-violet-soft ring-1 ring-white/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg">{group.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{group.summary}</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-fg/90 ring-1 ring-white/[0.07] ring-inset"
                    >
                      <LevelGlyph level={skill.level} />
                      {skill.name}
                      <span className="sr-only"> — {skillLevels[skill.level].label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 font-mono text-[0.7rem] leading-relaxed tracking-wide text-faint">
                  <span className="text-muted">Used in:</span> {group.usedIn.join(" · ")}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
