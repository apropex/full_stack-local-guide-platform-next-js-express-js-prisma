"use client";

import { cn } from "@/lib/utils";
import { join } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsMenu = [
  { href: "/settings", name: "My Details" },
  { href: "/settings/profile", name: "Profile" },
  { href: "/settings/password", name: "Password" },
  { href: "/settings/preferences", name: "Preferences" },
  { href: "/settings/billings", name: "Billings" },
  { href: "/settings/notifications", name: "Notifications" },
];

export default function SettingsNav() {
  const pathname = usePathname();

  //
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center">
      {settingsMenu.map((menu, i) => (
        <Link
          href={menu.href}
          key={join("settings-menu-", i)}
          className={cn(
            "flex-1 bg-accent text-center text-sm md:text-base md:font-medium p-1 md:p-2 whitespace-nowrap",
            {
              "bg-background border-b border-foreground/60 dark:border-foreground":
                menu.href === pathname,
            },
          )}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
}
