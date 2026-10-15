import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const ogSize = { width: 1200, height: 630 };

/** The logo file as a data URL, for embedding in generated images (read at build time). */
async function logoDataUrl(): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", siteConfig.brand.logo.src));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/** Shared social preview: the Banner Tech logo, an eyebrow, a large title and a supporting line. */
export async function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const logo = await logoDataUrl();
  const logoHeight = 44;
  const logoWidth = Math.round((siteConfig.brand.logo.width / siteConfig.brand.logo.height) * logoHeight);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#08090D",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(167,139,250,0.30), transparent 45%), radial-gradient(circle at 95% 10%, rgba(96,165,250,0.22), transparent 40%)",
          color: "#F5F7FC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logo} width={logoWidth} height={logoHeight} alt="" />
          <span style={{ fontSize: 22, color: "#C4B5FD", letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 76, lineHeight: 1.04, fontWeight: 700, letterSpacing: -2, maxWidth: 1000 }}>{title}</span>
          <span style={{ fontSize: 30, lineHeight: 1.35, color: "#9CA3B5", maxWidth: 940 }}>{subtitle}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#9CA3B5" }}>
          <div style={{ width: 44, height: 2, backgroundImage: "linear-gradient(90deg, #A78BFA, #60A5FA)" }} />
          {siteConfig.owner.name ? `${siteConfig.owner.name} · ` : ""}
          {siteConfig.social.github.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    ogSize,
  );
}
