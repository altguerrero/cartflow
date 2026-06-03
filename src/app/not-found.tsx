import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested CartFlow page could not be found.",
};

export default function NotFound() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <EmptyState
        title="Page not found"
        description="This page does not exist or may have moved."
        action={
          <Button asChild variant="outline">
            <Link href="/">Back to catalog</Link>
          </Button>
        }
      />
    </Container>
  );
}
