import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { TypingCode, type CodeSnippet } from "./TypingCode";

/**
 * The intro's `whoami` boot sequence: it types once and leaves the caret blinking.
 * Decorative (the page's headings and About section say the same things in plain text).
 */
export function WhoamiTerminal({ className, onComplete }: { className?: string; onComplete?: () => void }) {
  const handle = (siteConfig.owner.name || siteConfig.brand.name).toLowerCase().replace(/\s+/g, "_");
  const role = `${siteConfig.owner.role} · ${siteConfig.brand.name}`.toLowerCase();

  const session: CodeSnippet = [
    [["keyword", "$ "], ["name", "./init.sh"]],
    [["comment", "loading profile... "], ["string", "done"]],
    [["keyword", "$ "], ["name", "whoami"]],
    [["key", "user  "], ["plain", handle]],
    [["key", "role  "], ["plain", role]],
    [["fn", "welcome."]],
    [["keyword", "$ "]],
  ];

  return (
    <div aria-hidden="true" className={cn("glass overflow-hidden rounded-3xl bg-ink-950/55!", className)}>
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[0.72rem] text-faint">bash — init.sh</span>
      </div>
      <div className="overflow-hidden px-5 py-5 sm:px-7 sm:py-6">
        <TypingCode
          snippets={[session]}
          variant="terminal"
          loop={false}
          startHidden
          speed={2.2}
          onComplete={onComplete}
          className="text-[0.78rem] sm:text-[0.92rem] lg:text-[1rem]"
        />
      </div>
    </div>
  );
}
