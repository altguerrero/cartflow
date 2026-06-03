import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

type ButtonVariant = ComponentProps<typeof Button>["variant"];

const buttonExamples: Array<{ label: string; variant: ButtonVariant }> = [
  { label: "Default", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Outline", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
];

export default function Home() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-5">
            <Badge>Design System: Ready</Badge>
            <div className="space-y-3">
              <h1 className="text-primary text-4xl font-semibold tracking-normal md:text-5xl">
                CartFlow
              </h1>
              <p className="text-secondary max-w-2xl text-sm leading-7 md:text-base">
                Modern E-Commerce Experience
              </p>
            </div>
            <p className="text-muted max-w-2xl text-sm leading-7 md:text-base">
              Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. The
              reusable layout shell and base UI primitives are ready for future
              storefront features.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interface Foundation</CardTitle>
              <CardDescription>
                Core primitives are rendering with CartFlow semantic tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {buttonExamples.map(({ label, variant }) => (
                  <Button key={label} type="button" variant={variant}>
                    {label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Badge variant="secondary">Storefront</Badge>
                <Badge variant="outline">Responsive</Badge>
                <Badge variant="secondary">Accessible</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skeleton Preview</CardTitle>
              <CardDescription>
                Reusable loading state foundation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>

          <EmptyState
            title="Reusable Empty State"
            description="A neutral foundation for future empty, error, and recovery states."
            action={
              <Button type="button" variant="outline">
                Placeholder Action
              </Button>
            }
          />
        </div>
      </section>
    </Container>
  );
}
