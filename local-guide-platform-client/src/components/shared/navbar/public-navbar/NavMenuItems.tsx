"use client";

import { cn } from "@/lib/utils";
import { join } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./PublicNavbar";

export default function NavMenuItems() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      {navItems.map((item) => (
        <Link
          key={join("nav_item_", item.name)}
          href={item.href}
          className={cn("px-2 py-0.5 border-b border-transparent", {
            "text-foreground border-primary": pathname === item.href,
          })}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
