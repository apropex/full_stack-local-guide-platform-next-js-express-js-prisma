import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { getUserFromJwt } from "@/lib/jwt/jwt";
import AppSidebarFooter from "./AppSidebarFooter";
import AppSidebarHeader from "./AppSidebarHeader";
import SidebarMenuComponent from "./SidebarMenu";

export default async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getUserFromJwt();

  if (!user) return <div></div>;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b relative">
        <SidebarMenu>
          <AppSidebarHeader />
        </SidebarMenu>

        <div className="absolute right-0 md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenuComponent role={user.role} />
      </SidebarContent>

      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}
