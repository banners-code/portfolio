import { Briefcase, FlaskConical, Hammer, Network, PackageCheck, PencilRuler, type LucideIcon } from "lucide-react";
import { statusMeta, type ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

const statusStyle: Record<ProjectStatus, { icon: LucideIcon; className: string }> = {
  built: { icon: PackageCheck, className: "text-status-built bg-status-built/[0.08] ring-status-built/25" },
  client: { icon: Briefcase, className: "text-status-client bg-status-client/[0.08] ring-status-client/25" },
  "in-development": { icon: Hammer, className: "text-status-dev bg-status-dev/[0.08] ring-status-dev/25" },
  prototype: { icon: FlaskConical, className: "text-status-prototype bg-status-prototype/[0.09] ring-status-prototype/25" },
  planning: { icon: PencilRuler, className: "text-status-planning bg-status-planning/[0.08] ring-status-planning/25" },
  "case-study": { icon: Network, className: "text-status-case bg-status-case/[0.08] ring-status-case/25" },
};

/** Project status: always an icon plus a text label, never colour alone. */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const { icon: Icon, className: tone } = statusStyle[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.68rem] leading-none font-medium tracking-[0.08em] uppercase ring-1 ring-inset whitespace-nowrap",
        tone,
        className,
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {statusMeta[status].label}
    </span>
  );
}
