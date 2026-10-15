import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { caseStudyProjects, getProject, type CaseStudy, type Project } from "@/lib/projects";
import { configuredSiteUrl } from "@/lib/site-config";
import { revealDelay } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { StatusBadge } from "@/components/projects/StatusBadge";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const path = `/work/${project.slug}`;
  const hasCanonicalUrl = configuredSiteUrl() !== null;
  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.summary,
    alternates: hasCanonicalUrl ? { canonical: path } : undefined,
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.tagline}`,
      description: project.summary,
      url: hasCanonicalUrl ? path : undefined,
    },
  };
}

type Section = { id: string; title: string; content: ReactNode };

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="flex flex-col gap-3.5">
      {items.map((item, index) => (
        <li key={item} className="flex gap-4 leading-relaxed text-muted">
          {ordered ? (
            <span className="mt-0.5 font-mono text-xs text-violet-soft">{String(index + 1).padStart(2, "0")}</span>
          ) : (
            <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rotate-45 bg-violet" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

function buildSections(project: Project, study: CaseStudy): Section[] {
  const prose = (text: string) => <p className="max-w-3xl text-[1.05rem] leading-relaxed text-muted">{text}</p>;

  return [
    { id: "overview", title: "Overview", content: prose(study.overview) },
    { id: "purpose", title: "Project purpose", content: prose(study.purpose) },
    { id: "role", title: "My role", content: prose(study.role) },
    { id: "objective", title: "Problem or objective", content: prose(study.objective) },
    { id: "approach", title: study.approach.title, content: <List items={study.approach.items} /> },
    {
      id: "implementation",
      title: study.implementation.title,
      content: (
        <div className="flex flex-col gap-8">
          <List items={study.implementation.items} />
          {study.capabilities ? (
            <div className="surface rounded-2xl p-5">
              <p className="text-eyebrow text-status-planning">{study.capabilities.title}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.capabilities.items.map((item) => (
                  <li key={item}>
                    <Badge tone="outline">{item}</Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-faint">Proposed, not built.</p>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      id: "technologies",
      title: "Technologies used",
      content:
        project.tech.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge size="md">{tech}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="max-w-3xl leading-relaxed text-muted">
              No technology stack has been committed yet — this project is still at the planning stage. Its focus areas:
            </p>
            <ul className="flex flex-wrap gap-2">
              {(project.topics ?? []).map((topic) => (
                <li key={topic}>
                  <Badge tone="outline" size="md">
                    {topic}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ),
    },
    {
      id: "challenges",
      title: "Challenges encountered",
      content: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {study.challenges.map((challenge) => (
            <li key={challenge.title} className="surface rounded-2xl p-5">
              <p className="font-medium text-fg">{challenge.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.body}</p>
            </li>
          ))}
        </ul>
      ),
    },
    { id: "solutions", title: study.solutions.title, content: <List items={study.solutions.items} /> },
    {
      id: "status",
      title: "Current status",
      content: (
        <div className="glass flex flex-col gap-3 rounded-2xl p-5 sm:p-6">
          <p className="max-w-3xl leading-relaxed text-fg/90">{study.status}</p>
          {project.note ? <p className="max-w-3xl text-sm leading-relaxed text-faint">{project.note}</p> : null}
        </div>
      ),
    },
    { id: "learned", title: "What I learned", content: <List items={study.learned} /> },
    { id: "next", title: "Potential next steps", content: <List items={study.nextSteps} ordered /> },
  ];
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const sections = buildSections(project, project.caseStudy);
  const index = caseStudyProjects.findIndex((candidate) => candidate.slug === project.slug);
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];

  return (
    <article className="pt-32 sm:pt-40">
      <Container>
        <Link
          href="/#projects"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="animate-rise flex flex-wrap gap-2">
              {project.statuses.map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
            <p className="text-eyebrow animate-rise mt-6 text-faint" style={revealDelay(60)}>
              {project.category}
            </p>
            <h1 className="text-display animate-rise mt-4 font-semibold text-fg" style={revealDelay(120)}>
              {project.title}
            </h1>
            <p className="animate-rise text-gradient mt-4 text-xl font-medium sm:text-2xl" style={revealDelay(180)}>
              {project.tagline}
            </p>
            <p className="animate-rise mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted" style={revealDelay(240)}>
              {project.summary}
            </p>
          </div>

          <aside className="animate-rise lg:col-span-4 lg:pt-2" style={revealDelay(260)} aria-label="Project details">
            <dl className="surface divide-y divide-line rounded-3xl px-6">
              <div className="py-5">
                <dt className="text-eyebrow text-faint">Links</dt>
                <dd className="mt-2 flex flex-col items-start gap-1 text-sm">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-1.5 text-fg transition-colors hover:text-violet-soft"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                  {project.sourceNote ? (
                    <span className="inline-flex min-h-9 items-center gap-1.5 text-faint">
                      <Lock className="size-3.5" aria-hidden="true" />
                      {project.sourceNote}
                    </span>
                  ) : null}
                  {project.links.length === 0 && !project.sourceNote ? (
                    <span className="text-faint">No public links — nothing is published for this project yet.</span>
                  ) : null}
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <div className="animate-rise mt-12" style={revealDelay(320)}>
          <ProjectPreview
            project={project}
            className={project.preview.kind === "infrastructure" ? undefined : "aspect-[4/3] sm:aspect-[16/9]"}
          />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-eyebrow text-faint">On this page</p>
              <ol className="mt-4 flex flex-col">
                {sections.map((section, sectionIndex) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-9 items-center gap-3 rounded-lg text-sm text-muted transition-colors hover:text-fg"
                    >
                      <span className="font-mono text-[0.68rem] text-faint">{String(sectionIndex + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="flex flex-col">
            {sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="border-t border-line py-10 first:border-t-0 first:pt-0"
                data-reveal=""
              >
                <p className="text-eyebrow text-violet-soft">{String(sectionIndex + 1).padStart(2, "0")}</p>
                <h2 id={`${section.id}-title`} className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Link
            href={`/work/${next.slug}`}
            className="surface group flex flex-col justify-between gap-8 rounded-3xl p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/[0.04] sm:p-8"
          >
            <span className="text-eyebrow text-faint">Next case study</span>
            <span>
              <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-fg">
                {next.title}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-sm text-muted">{next.tagline}</span>
            </span>
          </Link>
          <div className="glass flex flex-col justify-between gap-8 rounded-3xl p-6 sm:p-8">
            <span className="text-eyebrow text-violet-soft">Working on something similar?</span>
            <div>
              <p className="text-2xl leading-snug font-semibold tracking-tight text-fg">Let&apos;s talk about what you&apos;re building.</p>
              <ButtonLink href="/#contact" className="mt-5">
                Get in touch
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
