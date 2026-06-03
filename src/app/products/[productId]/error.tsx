"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ErrorState } from "@/components/ui/error-state";

interface ProductDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductDetailError({ reset }: ProductDetailErrorProps) {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <ErrorState
        title="Product view could not load"
        description="CartFlow could not finish loading this product page. Please try again or return to the catalog."
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
