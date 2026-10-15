import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brand.name,
    short_name: siteConfig.brand.name,
    description: siteConfig.brand.description,
    start_url: "/",
    display: "browser",
    background_color: "#08090d",
    theme_color: "#08090d",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
