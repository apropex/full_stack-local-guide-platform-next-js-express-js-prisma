"use client";

import { Role, tRole } from "@/constants";
import { join } from "@/utils";
import { ChevronDown, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CreateAdminForm from "../modules/Admin/adminManagement/CreateAdminForm";
import CreateGuideForm from "../modules/Admin/guideManagement/CreateGuideForm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import SidebarRoutes from "./SidebarRoutes";

export default function SidebarMenuComponent({ role }: { role: tRole }) {
  const [guideFormDialog, setGuideFormDialog] = useState(false);
  const pathname = usePathname();
  const routes = SidebarRoutes(role);

  const isActive = (url: string): boolean => {
    if (pathname === url) return true;
    return (
      !["/dashboard/admin", "/dashboard/guide", "/dashboard/tourist"].includes(
        url,
      ) && pathname.startsWith(url)
    );
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

      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {(role === Role.GUIDE || role === Role.TOURIST) && (
              <CreateAdminForm />
            )}
            {role === Role.TOURIST && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setGuideFormDialog(true)}>
                    <Map />
                    <span>Apply For Guide</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <CreateGuideForm
                  guideFormDialog={guideFormDialog}
                  setGuideFormDialog={setGuideFormDialog}
                />
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
