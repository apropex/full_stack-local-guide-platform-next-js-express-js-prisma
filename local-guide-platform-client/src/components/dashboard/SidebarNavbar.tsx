import { BellDot } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "./nav-user";
import { SidebarSearchForm } from "./sidebar-search-form";

export default function SidebarNavbar() {
  return (
    <header className="flex items-center justify-between flex-wrap gap-3 p-4 border-b">
      <div className="flex-1 flex items-center gap-3">
        <SidebarTrigger />
        <SidebarSearchForm />
      </div>

      <div className="flex items-center gap-3 md:gap-x-5">
        <button className="size-10 flex items-center justify-center overflow-hidden">
          <BellDot />
        </button>
        <NavUser />
      </div>
    </header>
  );
}
