import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/lib/projects";
import { publicBaseUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicBaseUrl();
  // Without a known public address there is nothing truthful to list (and localhost must never be published).
  if (!base) return [];

  return [
    { url: new URL("/", base).toString(), changeFrequency: "monthly", priority: 1 },
    ...caseStudyProjects.map((project) => ({
      url: new URL(`/work/${project.slug}`, base).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
