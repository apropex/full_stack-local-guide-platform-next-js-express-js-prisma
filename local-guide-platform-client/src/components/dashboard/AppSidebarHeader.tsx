"use client";

import { cn } from "@/lib/utils";
import { HeartPulse } from "lucide-react";
import Link from "next/link";
import { SidebarMenuItem, useSidebar } from "../ui/sidebar";

export default function AppSidebarHeader() {
  const { open } = useSidebar();

  return (
    <SidebarMenuItem>
      <Link
        href="/"
        className="w-full flex items-center gap-x-2 text-primary ml-1"
      >
        <HeartPulse className="size-5" />
        <span
          className={cn("text-base font-semibold inline-block mt-1", {
            "sr-only": !open,
          })}
        >
          LASV Guides
        </span>
      </Link>
    </SidebarMenuItem>
  );
}
