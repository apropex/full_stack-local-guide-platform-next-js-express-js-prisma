"use client";

import { tUserRole } from "@/constants";
import join from "@/utility/joinText";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import SidebarRoutes from "./SidebarRoutes";

export default function SidebarMenuComponent({ role }: { role: tUserRole }) {
  const pathname = usePathname();
  const routes = SidebarRoutes(role);

  const isActive = (url: string): boolean => {
    if (pathname === url) return true;
    return url !== "/admin/dashboard" && pathname.startsWith(url);
  };

  return (
    <>
      {routes.items && (
        <SidebarGroup>
          <SidebarGroupLabel>{role} ROUTES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {routes?.group?.map((group, i) => (
        <Collapsible
          key={join("collapsible-", i)}
          defaultOpen
          className="group/collapsible border-b"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {group.title}
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, i) => (
                    <SidebarMenuItem key={join("collapsible-item-", i)}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link href={item.url}>
                          <item.icon /> {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
