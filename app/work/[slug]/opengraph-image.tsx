import { caseStudyProjects, getProject, statusMeta } from "@/lib/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? project.statuses.map((status) => statusMeta[status].label).join(" · ") : "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.tagline ?? "",
  });
}
