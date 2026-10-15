import { ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand.name} — I build the web experiences behind ambitious ideas`;
export const size = ogSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Innovative developer · Digital builder",
    title: "I build the web experiences behind ambitious ideas.",
    subtitle: "Websites, e-commerce platforms and application prototypes — from interface to deployment.",
  });
}
