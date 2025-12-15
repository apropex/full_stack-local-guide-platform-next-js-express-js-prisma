"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./PublicNavbar";

export default function NavMobileMenu() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-4" align="start">
        <DropdownMenuGroup>
          {navItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              asChild
              className={cn({
                "text-primary": pathname === item.href,
              })}
            >
              <Link href={item.href}>{item.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
