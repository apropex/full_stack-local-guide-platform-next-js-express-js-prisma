"use client";

import { cn } from "@/lib/utils";
import { join } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsMenu = [
  { href: "/settings", name: "My Details" },
  { href: "/settings/profile", name: "Profile" },
  { href: "/settings/security", name: "Security" },
  { href: "/settings/preferences", name: "Preferences" },
  { href: "/settings/billings", name: "Billings" },
  { href: "/settings/notifications", name: "Notifications" },
];

export default function SettingsNav() {
  const pathname = usePathname();

  //
  return (
    <div className="w-full max-w-3xl mx-auto border-b border-r border-l rounded-xl overflow-hidden flex flex-wrap items-center">
      {settingsMenu.map((menu, i) => (
        <Link
          href={menu.href}
          key={join("settings-menu-", i)}
          className={cn(
            "block flex-1 bg-gray-200/70 dark:bg-gray-950/50 text-center text-sm md:text-base md:font-medium py-1 md:py-2 whitespace-nowrap",
            {
              "bg-background dark:bg-background border-b border-foreground/60 dark:border-foreground":
                menu.href === pathname,
            },
          )}
        >
          <span className="inline-block mx-3">{menu.name}</span>
        </Link>
      ))}
    </div>
  );
}
