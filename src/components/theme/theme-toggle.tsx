"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

function subscribe() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover/button:rotate-12"
        />
      ) : (
        <Moon
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover/button:-rotate-12"
        />
      )}
    </Button>
  );
}
