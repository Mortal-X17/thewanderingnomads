import type { ReactNode } from "react";

export function EmptyBlock({
  label,
  title,
  hint,
  icon,
  className = "",
}: {
  label: string;
  title: string;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-ink/12 bg-ink/[0.015] p-6 sm:p-8 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 0%, color-mix(in oklab, var(--forest) 10%, transparent), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {icon ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 text-ink/60">
              {icon}
            </span>
          ) : null}
          <span className="eyebrow">{label}</span>
        </div>
        <p className="display text-xl sm:text-2xl text-ink/85">{title}</p>
        {hint ? (
          <p className="text-sm text-muted-foreground max-w-md">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
