import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "border-default bg-elevated motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 flex flex-col items-center rounded-2xl border px-6 py-10 text-center shadow-sm motion-safe:duration-200",
        className,
      )}
    >
      <div className="bg-accent-primary-soft text-brand flex size-10 items-center justify-center rounded-xl text-sm font-semibold">
        CF
      </div>
      <div className="mt-5 max-w-md space-y-2">
        <h2 className="text-primary text-base font-semibold">{title}</h2>
        {description ? (
          <p className="text-muted text-sm leading-6">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
