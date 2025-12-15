/*//

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
          {/* LEFT SIDE *\/}
          <div className="flex items-center gap-x-2">
            {/* MOBILE MENU *\/}
            <div className="md:hidden flex items-center">
              <NavMobileMenu />
            </div>

            {/* LEFT SIDE LOGO *\/}
            <div className="flex items-center">
              <Link href={"/"} className="text-lg font-bold uppercase">
                LASV Guides
              </Link>
            </div>
          </div>

          {/* MIDDLE PART *\/}
          <div className="hidden md:block">
            <NavMenuItems />
          </div>

          {/* RIGHT SIDE *\/}
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
*/

// PublicNavbar.tsx

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
    // ⭐ Outer container for fixed positioning and max width
    <nav className="w-full max-w-6xl fixed top-4 left-[50%] -translate-x-[50%] z-999 px-4">
      {/* Glass Morphism effect*/}
      <div className="rounded-lg bg-background/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 dark:shadow-black/50 border-b-[3px] border-b-primary">
        {/* ⭐ Content Wrapper with Bottom Border */}
        <div className="w-full py-3 px-6 rounded-t-xl transition-all duration-300 flex items-center justify-between">
          {/* LEFT SIDE: Mobile Menu & Logo */}
          <div className="flex items-center gap-x-4">
            {/* MOBILE MENU */}
            <div className="lg:hidden flex items-center">
              <NavMobileMenu />
            </div>

            {/* LEFT SIDE LOGO (Premium Styling) */}
            <div className="flex items-center">
              <Link
                href={"/"}
                className="text-xl font-extrabold uppercase text-primary  transition-colors duration-200 tracking-wider"
              >
                LASV Guides
              </Link>
            </div>
          </div>

          {/* MIDDLE PART: Desktop Navigation Links */}
          <div className="hidden lg:block">
            {/* NavMenuItems should render the links with the new premium color scheme
              (e.g., primary color for active/hover states).
            */}
            <NavMenuItems />
          </div>

          {/* RIGHT SIDE: Auth/Profile Menu */}
          <div>
            {!user ? (
              <Link href={"/login"}>
                <Button className="bg-primary hover:bg-primary/90 text-white dark:text-background font-semibold shadow-lg shadow-primary/30 transition-all duration-300">
                  Login / Register
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
