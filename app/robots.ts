import type { MetadataRoute } from "next";
import { publicBaseUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = publicBaseUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // Only advertise a sitemap once the public address is known.
    sitemap: base ? new URL("/sitemap.xml", base).toString() : undefined,
  };
}
