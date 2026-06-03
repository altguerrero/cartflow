import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Product not found | CartFlow",
  description: "The requested CartFlow product could not be found.",
};

export default function ProductNotFound() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <EmptyState
        title="Product not found"
        description="This product does not exist or is no longer available in the CartFlow catalog."
        action={
          <Button asChild variant="outline">
            <Link href="/">Back to catalog</Link>
          </Button>
        }
      />
    </Container>
  );
}
