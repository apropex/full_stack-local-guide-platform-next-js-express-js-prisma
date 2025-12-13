"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useMemo(() => !!theme, [theme]);
  if (!mounted) return null;

  const light = theme === "light";
  const dark = theme === "dark";
  const system = theme === "system";

  return (
    <div className="lg:col-span-2 flex gap-3 md:gap-4">
      <button
        onClick={() => setTheme("light")}
        className={cn("relative rounded-lg overflow-hidden p-1.5", {
          "border-2 border-primary": light,
        })}
      >
        <Image
          src={"/theme/light.png"}
          alt=""
          width={250}
          height={250}
          className="size-20 md:size-40 object-cover rounded"
        />
        <p className="text-left mt-2">Light</p>
        <div
          className={cn(
            "absolute size-3 rounded-full bottom-12 left-3 bg-rose-500/40 ",
            {
              "bg-rose-500": light,
            },
          )}
        />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn("relative rounded-lg overflow-hidden p-1.5", {
          "border-2 border-primary": dark,
        })}
      >
        <Image
          src={"/theme/dark.png"}
          alt=""
          width={250}
          height={250}
          className="size-20 md:size-40 object-cover rounded"
        />
        <p className="text-left mt-2">Dark</p>
        <div
          className={cn(
            "absolute size-3 rounded-full bottom-12 left-3 bg-rose-500/40 ",
            {
              "bg-rose-500": dark,
            },
          )}
        />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn("relative rounded-lg overflow-hidden p-1.5", {
          "border-2 border-primary": system,
        })}
      >
        <Image
          src={"/theme/system.png"}
          alt=""
          width={250}
          height={250}
          className="size-20 md:size-40 object-cover rounded"
        />
        <p className="text-left mt-2">System preference</p>
        <div
          className={cn(
            "absolute size-3 rounded-full bottom-12 left-3 bg-rose-500/40 ",
            {
              "bg-rose-500": system,
            },
          )}
        />
      </button>
    </div>
  );
}
