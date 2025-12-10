//

import { Button } from "@/components/ui/button";
import { getUserFromJwt } from "@/lib/jwt/jwt";
import Link from "next/link";
import PublicProfileMenu from "../PublicProfileMenu";
import NavMenuItems from "./NavMenuItems";

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
      <div className="rounded bg-background/80 backdrop-blur-xs w-full py-2 px-3 flex items-center justify-between">
        {/* LEFT SIDE */}
        <div>
          <Link href={"/"} className="text-lg font-bold uppercase">
            LASV Guides
          </Link>
        </div>

        {/* MIDDLE */}
        <NavMenuItems />

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
    </nav>
  );
}
