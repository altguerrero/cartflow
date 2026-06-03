"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ErrorState } from "@/components/ui/error-state";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ reset }: RootErrorProps) {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <ErrorState
        title="Something went wrong"
        description="CartFlow could not finish loading this view. Please try again."
        primaryAction={
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href="/">Back to catalog</Link>
          </Button>
        }
      />
    </Container>
  );
}
