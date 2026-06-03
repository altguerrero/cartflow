import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  description?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}

export function ErrorState({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: ErrorStateProps) {
  const titleId = useId();

  return (
    <section
      className={cn(
        "border-default bg-elevated motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 flex flex-col items-center rounded-2xl border px-6 py-10 text-center shadow-sm motion-safe:duration-200",
        className,
      )}
      aria-labelledby={titleId}
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--state-error)]/10 text-sm font-semibold text-[var(--state-error)]">
        CF
      </div>
      <div className="mt-5 max-w-md space-y-2">
        <h2 id={titleId} className="text-primary text-base font-semibold">
          {title}
        </h2>
        {description ? (
          <p className="text-muted text-sm leading-6">{description}</p>
        ) : null}
      </div>
      {primaryAction || secondaryAction ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          {primaryAction}
          {secondaryAction}
        </div>
      ) : null}
    </section>
  );
}
