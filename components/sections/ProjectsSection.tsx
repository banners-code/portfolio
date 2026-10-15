import { additionalWork, projectFilters, projects, statusMeta, type ProjectStatus } from "@/lib/projects";
import { revealDelay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGrid, type GridEntry } from "@/components/projects/ProjectGrid";
import { StatusBadge } from "@/components/projects/StatusBadge";

export function ProjectsSection() {
  const entries: GridEntry[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    filters: project.filters,
    layout: project.layout,
    card: <ProjectCard project={project} />,
  }));

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          command="ls ./projects"
          id="projects-title"
          title="Real projects, honestly labelled."
          description="Client work, personal builds and experiments. Every project carries its actual status — from client project to concept — so you can see exactly where each one stands."
        />

        {/* Phones: one row of badges (descriptions stay available to screen readers). Larger screens: badge + description. */}
        <dl className="mt-10 flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-5" data-reveal="" style={revealDelay(80)}>
          {(Object.keys(statusMeta) as ProjectStatus[]).map((status) => (
            <div key={status} className="flex flex-col items-start gap-2">
              <dt>
                <StatusBadge status={status} />
              </dt>
              <dd className="sr-only text-xs leading-relaxed text-faint sm:not-sr-only">{statusMeta[status].description}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12" data-reveal="" style={revealDelay(120)}>
          <ProjectGrid entries={entries} filters={projectFilters} />
        </div>

        <div className="surface mt-5 rounded-3xl p-6 sm:p-9" data-reveal="">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow text-violet-soft">Additional technical work</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">Smaller pieces, real practice.</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Work that doesn&apos;t need a case study of its own, but has shaped how I build.
            </p>
          </div>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
            {additionalWork.map((item) => (
              <li key={item.title} className="bg-ink-900/95 p-5">
                <p className="flex items-center gap-2.5 text-[0.95rem] font-medium text-fg">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-violet" />
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
