import AppSidebar from "@/components/dashboard/AppSidebar";
import SidebarNavbar from "@/components/dashboard/SidebarNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCookie } from "@/helper/cookie";
import { iChildren } from "@/interfaces";

export default async function DashboardLayout({
  children,
}: Readonly<iChildren>) {
  const defaultOpen = (await getCookie("sidebar_state")) === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <SidebarNavbar />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
