"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { JwtPayload } from "jsonwebtoken";
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

export default function AppSidebarFooter({ user }: { user: JwtPayload }) {
  const { open } = useSidebar();

  return (
    <SidebarFooter
      className={cn("border-t transition-all duration-300", {
        "scale-0": !open,
      })}
    >
      <SidebarMenu>
        <SidebarMenuItem>{user.name}</SidebarMenuItem>
        <SidebarMenuItem>{user.email}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
