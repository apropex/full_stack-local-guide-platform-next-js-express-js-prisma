"use client";

import { cn } from "@/lib/utils";
import { join } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./PublicNavbar";

export default function NavMenuItems() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-300">
      {navItems.map((item) => (
        <Link
          key={join("nav_item_", item.name)}
          href={item.href}
          className={cn("px-2 py-1 border-b border-transparent", {
            "text-primary border-primary bg-black/50 rounded":
              pathname === item.href,
          })}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
