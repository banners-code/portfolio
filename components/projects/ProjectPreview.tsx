import type { ReactNode } from "react";
import { Globe, MonitorSmartphone, Server, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Original, CSS-only previews drawn for this portfolio. They illustrate each project's
 * interface or idea — they are not screenshots, and each one is captioned as such.
 */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  const { kind, label } = project.preview;

  if (kind === "infrastructure") return <InfrastructureDiagram className={className} label={label} />;

  const Mockup = mockups[kind];
  return (
    <div
      role="img"
      aria-label={`${label}: ${descriptions[kind]}`}
      className={cn("@container relative isolate overflow-hidden rounded-2xl ring-1 ring-white/[0.08]", className)}
    >
      <Mockup />
      <span className="absolute bottom-3 left-3 z-10 rounded-full bg-ink-950/75 px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.08em] text-fg/80 uppercase ring-1 ring-white/10 backdrop-blur-md">
        {label}
      </span>
    </div>
  );
}

const descriptions: Record<Exclude<Project["preview"]["kind"], "infrastructure">, string> = {
  cent: "a dark burgundy-and-gold clothing storefront with the CENT emblem and a row of product cards.",
  beauty: "a soft pink beauty storefront with product cards and a bank-transfer payment status panel.",
  whatsapp: "a glass-style footwear store with a cart beside a WhatsApp chat that holds the complete order.",
  gramearner: "a Telegram bot chat with a Launch app button beside the Gram Earner Mini App on a phone.",
  school: "a school management dashboard with a school switcher, role badge and permissions matrix.",
};

const TEE = "polygon(32% 0,40% 7%,60% 7%,68% 0,100% 17%,90% 39%,78% 33%,78% 100%,22% 100%,22% 33%,10% 39%,0 17%)";

function WindowChrome({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dot = tone === "dark" ? "bg-white/15" : "bg-black/10";
  return (
    <div className={cn("flex items-center gap-[1.2cqw] px-[3cqw] py-[2cqw]", tone === "dark" ? "border-b border-white/5" : "border-b border-black/5")}>
      <span className={cn("size-[1.4cqw] rounded-full", dot)} />
      <span className={cn("size-[1.4cqw] rounded-full", dot)} />
      <span className={cn("size-[1.4cqw] rounded-full", dot)} />
      <span className={cn("ml-[2cqw] h-[1.6cqw] w-1/3 rounded-full", tone === "dark" ? "bg-white/[0.06]" : "bg-black/[0.05]")} />
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-[1.1cqw] rounded-full", className)} />;
}

function CentMockup() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_0%,#5b1a26_0%,#2a0c13_45%,#10060a_100%)]">
      <div className="absolute inset-x-[6%] top-[9%] -bottom-[8%] overflow-hidden rounded-t-[2cqw] border border-[#d4af7a]/20 bg-[#140709]/90 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
        <WindowChrome />
        <div className="flex items-center justify-between px-[5cqw] py-[3cqw]">
          <div className="flex items-center gap-[1.6cqw]">
            <span className="grid size-[4cqw] place-items-center rounded-full border border-[#d4af7a]/80 font-serif text-[2.4cqw] leading-none text-[#e7c891]">
              C
            </span>
            <span className="font-serif text-[2cqw] tracking-[0.32em] text-[#e7c891]">CENT ORIGINALS</span>
          </div>
          <div className="flex gap-[2cqw]">
            <Bar className="w-[6cqw] bg-white/15" />
            <Bar className="w-[6cqw] bg-white/15" />
            <Bar className="w-[6cqw] bg-white/15" />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-[4cqw] px-[5cqw]">
          <div className="flex flex-col gap-[1.6cqw]">
            <Bar className="w-[12cqw] bg-[#d4af7a]/60" />
            <span className="block h-[3.6cqw] w-[85%] rounded-[1cqw] bg-[#f3e3c3]/85" />
            <span className="block h-[3.6cqw] w-[62%] rounded-[1cqw] bg-[#f3e3c3]/85" />
            <Bar className="mt-[1cqw] w-[70%] bg-white/15" />
            <Bar className="w-[52%] bg-white/15" />
            <span className="mt-[1.5cqw] block h-[4.4cqw] w-[18cqw] rounded-full bg-[#d4af7a]" />
          </div>
          <div className="relative mr-[4cqw] grid aspect-square w-[27cqw] place-items-center rounded-full border border-[#d4af7a]/35 bg-[radial-gradient(circle,#3d111b_0%,transparent_70%)]">
            <span className="absolute inset-[9%] rounded-full border border-dashed border-[#d4af7a]/25" />
            <span className="font-serif text-[12cqw] leading-none text-[#e7c891] drop-shadow-[0_0_2cqw_rgb(231_200_145/0.35)]">C</span>
          </div>
        </div>
        <div className="mt-[5cqw] grid grid-cols-4 gap-[2.4cqw] px-[5cqw]">
          {["#f4efe8", "#1d1c1f", "#7a2232", "#efe6d6"].map((color, index) => (
            <div key={index} className="rounded-[1.2cqw] bg-white/[0.04] p-[1.6cqw] ring-1 ring-white/5">
              <div className="grid aspect-square place-items-center rounded-[0.8cqw] bg-white/[0.035]">
                <span className="block h-[68%] w-[68%]" style={{ background: color, clipPath: TEE }} />
              </div>
              <Bar className="mt-[1.4cqw] w-3/4 bg-white/20" />
              <Bar className="mt-[0.8cqw] w-1/3 bg-[#d4af7a]/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tube({ cap, body }: { cap: string; body: string }) {
  return (
    <span className="flex h-[70%] w-[26%] flex-col items-center">
      <span className="block h-[38%] w-full rounded-t-[1.2cqw] rounded-b-[0.3cqw]" style={{ background: cap }} />
      <span className="mt-[3%] block h-[59%] w-[112%] rounded-[0.6cqw]" style={{ background: body }} />
    </span>
  );
}

function BeautyMockup() {
  const products = [
    { cap: "#f9a8c4", body: "#fce7f0" },
    { cap: "#be185d", body: "#fbcfe1" },
    { cap: "#fda4af", body: "#ffe4e6" },
  ];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,#4a1f3d_0%,#1c0f1e_55%,#0d0a12_100%)]">
      <div className="absolute top-[9%] right-[16%] -bottom-[8%] left-[6%] overflow-hidden rounded-t-[2cqw] bg-[linear-gradient(180deg,#fff7f9,#fdeef3)] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
        <WindowChrome tone="light" />
        <div className="flex items-center justify-between px-[4cqw] py-[2.6cqw]">
          <span className="font-serif text-[2.6cqw] text-[#6b2147] italic">Blush &amp; Balm</span>
          <div className="flex items-center gap-[1.6cqw]">
            <Bar className="w-[5cqw] bg-[#6b2147]/20" />
            <Bar className="w-[5cqw] bg-[#6b2147]/20" />
            <span className="grid size-[3.6cqw] place-items-center rounded-full bg-[#6b2147] text-[1.8cqw] font-semibold text-white">2</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-[1.4cqw] px-[4cqw]">
          {["Balms", "Glosses", "Tints", "Care"].map((category, index) => (
            <span
              key={category}
              className={cn(
                "rounded-full px-[2cqw] py-[0.8cqw] text-[1.7cqw] leading-none",
                index === 0 ? "bg-[#6b2147] text-white" : "bg-white text-[#6b2147] ring-1 ring-[#6b2147]/15",
              )}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="mt-[3cqw] grid grid-cols-3 gap-[2.4cqw] px-[4cqw]">
          {products.map((product, index) => (
            <div key={index} className="rounded-[1.4cqw] bg-white p-[1.6cqw] shadow-[0_8px_24px_-12px_rgb(107_33_71/0.35)]">
              <div className="grid aspect-[4/3.4] place-items-center rounded-[1cqw] bg-[#fdf0f4]">
                <Tube cap={product.cap} body={product.body} />
              </div>
              <Bar className="mt-[1.6cqw] w-4/5 bg-[#6b2147]/25" />
              <div className="mt-[1.2cqw] flex items-center justify-between">
                <Bar className="w-1/3 bg-[#be185d]/45" />
                <span className="grid size-[3.4cqw] place-items-center rounded-full bg-[#6b2147] text-[2cqw] leading-none text-white">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[4%] bottom-[12%] w-[42%] rounded-[1.8cqw] border border-white/70 bg-white/85 p-[2.6cqw] text-[#3b1530] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] backdrop-blur-md">
        <p className="text-[1.6cqw] font-semibold tracking-[0.14em] text-[#6b2147] uppercase">Bank transfer</p>
        <ol className="mt-[1.8cqw] flex flex-col gap-[1.4cqw]">
          {[
            { label: "Order placed", state: "done" },
            { label: "Receipt uploaded", state: "done" },
            { label: "Staff verification", state: "current" },
          ].map((step) => (
            <li key={step.label} className="flex items-center gap-[1.4cqw] text-[1.9cqw] leading-none">
              <span
                className={cn(
                  "grid size-[2.6cqw] shrink-0 place-items-center rounded-full",
                  step.state === "done" ? "bg-[#be185d] text-white" : "border-[0.3cqw] border-[#be185d] bg-white",
                )}
              >
                {step.state === "done" ? <span className="text-[1.5cqw] leading-none">✓</span> : null}
              </span>
              {step.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** A simple trainer silhouette: sole, upper and collar. */
function Shoe({ upper, sole }: { upper: string; sole: string }) {
  return (
    <span className="relative block h-[46%] w-[78%]">
      <span
        className="absolute inset-x-0 top-0 bottom-[18%]"
        style={{ background: upper, clipPath: "polygon(0 45%,38% 30%,52% 0,70% 6%,74% 40%,100% 62%,100% 100%,0 100%)" }}
      />
      <span className="absolute inset-x-0 bottom-0 h-[24%] rounded-[0.6cqw]" style={{ background: sole }} />
    </span>
  );
}

function WhatsAppStoreMockup() {
  const shoes = [
    { upper: "#f5f5f4", sole: "#a8a29e" },
    { upper: "#1f2937", sole: "#e5e7eb" },
    { upper: "#c2410c", sole: "#fef3c7" },
    { upper: "#0f766e", sole: "#f5f5f4" },
  ];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(110%_100%_at_20%_0%,#1f3b2f_0%,#0e1a17_55%,#080b0d_100%)]">
      {/* Storefront */}
      <div className="absolute top-[9%] left-[6%] -bottom-[8%] w-[56%] overflow-hidden rounded-t-[2cqw] border border-white/15 bg-white/[0.07] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md">
        <WindowChrome />
        <div className="flex items-center justify-between px-[3.6cqw] py-[2.4cqw]">
          <span className="text-[2.2cqw] font-semibold tracking-[0.18em] text-white/90 uppercase">Footwear</span>
          <span className="relative grid size-[3.8cqw] place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
            <span className="block size-[1.6cqw] rounded-[0.4cqw] border-[0.3cqw] border-white/70" />
            <span className="absolute -top-[0.8cqw] -right-[0.8cqw] grid size-[2.4cqw] place-items-center rounded-full bg-[#25d366] text-[1.4cqw] leading-none font-semibold text-[#06281a]">
              2
            </span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-[2cqw] px-[3.6cqw]">
          {shoes.map((shoe, index) => (
            <div key={index} className="rounded-[1.4cqw] bg-white/[0.06] p-[1.4cqw] ring-1 ring-white/10">
              <div className="grid aspect-[4/2.6] place-items-center rounded-[1cqw] bg-white/[0.05]">
                <Shoe {...shoe} />
              </div>
              <Bar className="mt-[1.4cqw] w-3/4 bg-white/25" />
              <div className="mt-[1cqw] flex items-center justify-between">
                <Bar className="w-1/3 bg-[#25d366]/50" />
                <span className="grid size-[2.8cqw] place-items-center rounded-full bg-white/15 text-[1.8cqw] leading-none text-white">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp chat with the complete order */}
      <div className="absolute top-[7%] right-[5%] -bottom-[14%] w-[34%] overflow-hidden rounded-[4cqw] border-[0.6cqw] border-[#1c2a26] bg-[#0b141a] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-[1.4cqw] bg-[#1f2c33] px-[2.4cqw] pt-[3cqw] pb-[1.8cqw]">
          <span className="size-[3.6cqw] shrink-0 rounded-full bg-[#25d366]/80" />
          <span className="flex flex-col gap-[0.6cqw]">
            <span className="text-[1.8cqw] leading-none font-semibold text-white">The store</span>
            <span className="text-[1.3cqw] leading-none text-white/50">WhatsApp</span>
          </span>
        </div>
        <div className="flex flex-col gap-[1.8cqw] p-[2.2cqw]">
          <div className="self-end rounded-[1.6cqw] rounded-tr-[0.4cqw] bg-[#005c4b] p-[1.8cqw] text-white">
            <p className="text-[1.5cqw] leading-none font-semibold">New order</p>
            <span className="mt-[1.4cqw] flex flex-col gap-[1cqw]">
              <Bar className="w-[16cqw] bg-white/45" />
              <Bar className="w-[12cqw] bg-white/45" />
              <span className="my-[0.4cqw] block h-px bg-white/20" />
              <Bar className="w-[9cqw] bg-white/70" />
            </span>
            <p className="mt-[1.2cqw] text-right text-[1.1cqw] leading-none text-white/60">✓✓</p>
          </div>
          <div className="self-start rounded-[1.6cqw] rounded-tl-[0.4cqw] bg-[#1f2c33] p-[1.8cqw]">
            <Bar className="w-[14cqw] bg-white/30" />
            <Bar className="mt-[1cqw] w-[9cqw] bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GramEarnerMockup() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_75%_5%,#163a63_0%,#0b1628_55%,#080b12_100%)]">
      {/* Bot conversation: the launch flow */}
      <div className="absolute top-[12%] left-[6%] flex w-[44%] flex-col gap-[2.4cqw]">
        <div className="flex items-end gap-[1.6cqw]">
          <span className="size-[5cqw] shrink-0 rounded-full bg-[linear-gradient(135deg,#38bdf8,#2563eb)]" />
          <div className="flex-1 rounded-[2cqw] rounded-bl-[0.6cqw] bg-white/[0.08] p-[2cqw]">
            <span className="block aspect-[16/8] rounded-[1.2cqw] bg-[linear-gradient(135deg,#1e3a8a,#0ea5e9)] opacity-80" />
            <Bar className="mt-[1.6cqw] w-11/12 bg-white/25" />
            <Bar className="mt-[1cqw] w-2/3 bg-white/25" />
            <span className="mt-[1.8cqw] block rounded-[1cqw] bg-white/10 py-[1.4cqw] text-center text-[2cqw] leading-none font-medium text-sky-200">
              Get started
            </span>
          </div>
        </div>
        <span className="self-end rounded-[2cqw] rounded-br-[0.6cqw] bg-[#2563eb] px-[2.4cqw] py-[1.4cqw] font-mono text-[2cqw] leading-none text-white">
          /start
        </span>
        <span className="mt-[1cqw] self-start rounded-full bg-[#2aabee] px-[3cqw] py-[1.5cqw] text-[2cqw] leading-none font-semibold text-white shadow-[0_8px_24px_-8px_#2aabee]">
          Launch app
        </span>
      </div>

      {/* The Mini App */}
      <div className="absolute top-[7%] right-[6%] -bottom-[14%] w-[40%] overflow-hidden rounded-[4cqw] border-[0.6cqw] border-[#1e2638] bg-[#0d1424] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]">
        <div className="flex items-center justify-between px-[3cqw] pt-[3.2cqw] pb-[2cqw]">
          <span className="text-[2.2cqw] font-semibold text-white">Gram Earner</span>
          <span className="rounded-full bg-white/10 px-[1.4cqw] py-[0.6cqw] font-mono text-[1.4cqw] leading-none text-sky-200">mini app</span>
        </div>
        <div className="mx-[3cqw] rounded-[2.4cqw] bg-[linear-gradient(135deg,#2563eb,#0ea5e9)] p-[2.6cqw]">
          <span className="rounded-full bg-black/25 px-[1.4cqw] py-[0.5cqw] font-mono text-[1.3cqw] leading-none tracking-wider text-white/90 uppercase">
            Illustrative
          </span>
          <span className="mt-[2.4cqw] block h-[3.2cqw] w-3/5 rounded-[0.8cqw] bg-white/85" />
          <Bar className="mt-[1.6cqw] w-2/5 bg-white/50" />
        </div>
        <div className="mx-[3cqw] mt-[2.6cqw] grid grid-cols-4 gap-[1.6cqw]">
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className="flex flex-col items-center gap-[1cqw]">
              <span className={cn("size-[5.2cqw] rounded-[1.6cqw]", index === 0 ? "bg-sky-400/30 ring-1 ring-sky-300/40" : "bg-white/[0.07]")} />
              <Bar className="w-full bg-white/15" />
            </span>
          ))}
        </div>
        <div className="mx-[3cqw] mt-[2.8cqw] flex flex-col gap-[1.6cqw]">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-center gap-[1.6cqw] rounded-[1.6cqw] bg-white/[0.05] p-[1.6cqw]">
              <span className="size-[4cqw] shrink-0 rounded-full bg-white/10" />
              <span className="flex flex-1 flex-col gap-[0.8cqw]">
                <Bar className="w-4/5 bg-white/20" />
                <Bar className="w-1/2 bg-white/10" />
              </span>
              <span className="rounded-full bg-amber-300/15 px-[1.2cqw] py-[0.5cqw] font-mono text-[1.1cqw] leading-none text-amber-200">SIMULATED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolMockup() {
  const roles = ["Admin", "Teacher", "Student"];
  const permissions = [
    [true, true, true, true],
    [true, true, false, false],
    [true, false, false, false],
  ];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(110%_100%_at_80%_0%,#134e4a_0%,#0c1b22_50%,#080b12_100%)]">
      <div className="absolute inset-x-[6%] top-[9%] -bottom-[8%] grid grid-cols-[27%_1fr] overflow-hidden rounded-t-[2cqw] border border-dashed border-teal-200/25 bg-[#0b111c]/90 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
        <aside className="flex flex-col gap-[1.6cqw] border-r border-white/5 p-[2.4cqw]">
          <span className="font-mono text-[1.4cqw] tracking-[0.14em] text-teal-200/70 uppercase">Schools</span>
          <span className="flex items-center gap-[1.2cqw] rounded-[1.2cqw] bg-teal-300/10 px-[1.4cqw] py-[1.2cqw] text-[1.8cqw] leading-none text-teal-100 ring-1 ring-teal-200/30">
            <span className="size-[2.2cqw] rounded-[0.6cqw] bg-teal-300/60" />
            School A
          </span>
          <span className="flex items-center gap-[1.2cqw] rounded-[1.2cqw] px-[1.4cqw] py-[1.2cqw] text-[1.8cqw] leading-none text-white/40">
            <span className="size-[2.2cqw] rounded-[0.6cqw] bg-white/15" />
            School B
          </span>
          <span className="mt-[1.4cqw] h-px bg-white/5" />
          {[70, 55, 62, 48, 58].map((width, index) => (
            <span key={index} className="flex items-center gap-[1.2cqw]">
              <span className="size-[2cqw] rounded-[0.5cqw] bg-white/10" />
              <span className="block h-[1.1cqw] rounded-full bg-white/10" style={{ width: `${width}%` }} />
            </span>
          ))}
        </aside>
        <div className="flex flex-col gap-[2.6cqw] p-[3cqw]">
          <div className="flex items-center justify-between">
            <span className="block h-[2.6cqw] w-[30%] rounded-[0.8cqw] bg-white/70" />
            <span className="rounded-full bg-violet-300/10 px-[1.8cqw] py-[0.9cqw] font-mono text-[1.5cqw] leading-none text-violet-200 ring-1 ring-violet-200/25">
              Role: Admin
            </span>
          </div>
          <div className="grid grid-cols-3 gap-[2cqw]">
            {["Students", "Staff", "Classes"].map((label) => (
              <div key={label} className="rounded-[1.4cqw] bg-white/[0.04] p-[2cqw] ring-1 ring-white/5">
                <span className="text-[1.6cqw] leading-none text-white/50">{label}</span>
                <span className="mt-[1.6cqw] block h-[2.8cqw] w-1/2 rounded-[0.8cqw] bg-teal-200/30" />
                <Bar className="mt-[1.4cqw] w-4/5 bg-white/10" />
              </div>
            ))}
          </div>
          <div className="rounded-[1.4cqw] bg-white/[0.03] p-[2cqw] ring-1 ring-white/5">
            <span className="text-[1.6cqw] leading-none text-white/50">Access by role</span>
            <div className="mt-[1.8cqw] flex flex-col gap-[1.4cqw]">
              {roles.map((role, row) => (
                <div key={role} className="grid grid-cols-[22%_repeat(4,1fr)] items-center gap-[1cqw]">
                  <span className="text-[1.6cqw] leading-none text-white/70">{role}</span>
                  {permissions[row].map((allowed, column) => (
                    <span
                      key={column}
                      className={cn(
                        "mx-auto size-[2.2cqw] rounded-full",
                        allowed ? "bg-teal-300/70" : "border-[0.25cqw] border-white/15",
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups: Record<Exclude<Project["preview"]["kind"], "infrastructure">, () => ReactNode> = {
  cent: CentMockup,
  beauty: BeautyMockup,
  whatsapp: WhatsAppStoreMockup,
  gramearner: GramEarnerMockup,
  school: SchoolMockup,
};

const chain: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: Globe, label: "Domain", detail: "Registrar" },
  { icon: Waypoints, label: "DNS", detail: "Records" },
  { icon: Server, label: "Hosting", detail: "Server" },
  { icon: ShieldCheck, label: "SSL", detail: "HTTPS" },
  { icon: MonitorSmartphone, label: "Website", detail: "Visitors" },
];

/** The request path from domain to website, as an ordered list (semantic, not a picture). */
function InfrastructureDiagram({ className, label }: { className?: string; label: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-[radial-gradient(100%_120%_at_50%_0%,rgb(110_231_183/0.08),transparent_60%)] p-5 ring-1 ring-white/[0.08] sm:p-6", className)}>
      <p className="text-eyebrow text-status-case/90">{label}</p>
      <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {chain.map(({ icon: Icon, label: step, detail }, index) => (
          <li key={step} className="flex flex-col items-stretch sm:flex-1 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.08] sm:flex-1 sm:flex-col sm:gap-2 sm:px-2 sm:py-3.5 sm:text-center">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-status-case/10 text-status-case ring-1 ring-status-case/25">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-fg">{step}</span>
                <span className="font-mono text-[0.68rem] text-faint">{detail}</span>
              </span>
            </div>
            {index < chain.length - 1 ? (
              <span aria-hidden="true" className="relative mx-auto h-4 w-px bg-gradient-to-b from-status-case/50 to-status-case/10 sm:mx-0 sm:h-px sm:w-4 sm:shrink-0 sm:bg-gradient-to-r lg:w-3 xl:w-5">
                <span className="motion-safe-only animate-pulse-travel absolute top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-status-case shadow-[0_0_8px_#6ee7b7] sm:block" style={{ animationDelay: `${index * 0.6}s` }} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
