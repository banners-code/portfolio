import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info, Lock } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/Badge";
import { ProjectPreview } from "./ProjectPreview";
import { StatusBadge } from "./StatusBadge";

/**
 * A project card. It lays itself out by its own width (container query): stacked in narrow
 * grid cells, side by side when it spans the full row. The title is the card's only link to
 * the case study; it's stretched over the card so the whole surface is clickable.
 */
export function ProjectCard({ project }: { project: Project }) {
  const caseStudyHref = project.caseStudy ? `/work/${project.slug}` : null;
  const tags = project.tech.length > 0 ? project.tech : (project.topics ?? []);

  return (
    <article data-glow="" className="group/card glow-card surface @container/card h-full rounded-3xl transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
      <div className="grid h-full @4xl/card:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] @4xl/card:items-center">
        <div className="p-2 pb-0 @4xl/card:order-last @4xl/card:p-3">
          <ProjectPreview
            project={project}
            className={project.preview.kind === "infrastructure" ? undefined : "aspect-[16/10.5]"}
          />
        </div>

        <div className="flex flex-col p-6 sm:p-7 @4xl/card:p-9">
          <div className="flex flex-wrap items-center gap-2">
            {project.statuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
          <p className="text-eyebrow mt-5 text-faint">{project.category}</p>
          <h3 className="mt-2.5 text-[1.6rem] leading-tight font-semibold tracking-tight text-fg">
            {caseStudyHref ? (
              <Link
                href={caseStudyHref}
                className="rounded-md after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-offset-4"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-1 text-sm text-violet-soft/90">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

          {project.note ? (
            <p className="mt-5 flex gap-2.5 rounded-2xl bg-status-client/[0.05] p-3.5 text-[0.8rem] leading-relaxed text-amber-100/85 ring-1 ring-status-client/15 ring-inset">
              <Info className="mt-0.5 size-3.5 shrink-0 text-status-client" aria-hidden="true" />
              {project.note}
            </p>
          ) : null}

          {tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={project.tech.length > 0 ? "Technologies" : "Focus areas"}>
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge tone={project.tech.length > 0 ? "default" : "outline"}>{tag}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
            {caseStudyHref ? (
              <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                Read case study
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/card:translate-x-1" />
              </span>
            ) : null}
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            {project.sourceNote ? (
              <span className="relative z-10 inline-flex items-center gap-1.5 text-xs text-faint">
                <Lock className="size-3" aria-hidden="true" />
                {project.sourceNote}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
