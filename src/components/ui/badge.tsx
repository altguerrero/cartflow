import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-[var(--accent-primary)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-primary-soft)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-[var(--state-error)] aria-invalid:ring-[var(--state-error)]/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)] [a]:hover:bg-[var(--accent-primary-hover)]",
        secondary:
          "bg-subtle text-primary [a]:hover:bg-[var(--border-default)]",
        destructive:
          "bg-[var(--state-error)]/10 text-[var(--state-error)] focus-visible:ring-[var(--state-error)]/20 [a]:hover:bg-[var(--state-error)]/20",
        outline: "border-default bg-elevated text-primary [a]:hover:bg-subtle",
        ghost: "text-muted hover:bg-subtle hover:text-primary",
        link: "text-brand underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
