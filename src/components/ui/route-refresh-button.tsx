"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RouteRefreshButtonProps {
  children: string;
  variant?: "default" | "outline";
}

export function RouteRefreshButton({
  children,
  variant = "default",
}: RouteRefreshButtonProps) {
  const router = useRouter();

  return (
    <Button type="button" variant={variant} onClick={() => router.refresh()}>
      {children}
    </Button>
  );
}
