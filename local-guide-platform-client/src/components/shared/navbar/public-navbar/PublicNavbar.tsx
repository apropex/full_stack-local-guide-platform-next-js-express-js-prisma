//

import { Button } from "@/components/ui/button";
import { getUserFromJwt } from "@/lib/jwt/jwt";
import Link from "next/link";
import PublicProfileMenu from "../PublicProfileMenu";
import NavMenuItems from "./NavMenuItems";
import NavMobileMenu from "./NavMobileMenu";

export const navItems = [
  { href: "/", name: "Home" },
  { href: "/tours", name: "Tours" },
  { href: "/about", name: "About" },
  { href: "/support", name: "Support" },
  { href: "/blogs", name: "Blogs" },
  { href: "/dashboard", name: "Dashboard" },
];

export default async function PublicNavbar() {
  const user = await getUserFromJwt();

  return (
    <nav className="w-full max-w-6xl fixed top-2 left-[50%] -translate-x-[50%] z-999 overflow-hidden px-4">
      <div className="rounded-lg bg-background/80">
        <div className="w-full py-2 px-3 rounded-lg bg-primary/8 backdrop-blur-xs border-b-2 border-primary flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-x-2">
            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <NavMobileMenu />
            </div>

            <div className="flex items-center">
              <Link href={"/"} className="text-lg font-bold uppercase">
                LASV Guides
              </Link>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="hidden md:block">
            <NavMenuItems />
          </div>

          {/* RIGHT SIDE */}
          <div>
            {!user ? (
              <Link href={"/login"}>
                <Button className="border border-green-700 dark:border-none">
                  Login
                </Button>
              </Link>
            ) : (
              <PublicProfileMenu user={user} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
