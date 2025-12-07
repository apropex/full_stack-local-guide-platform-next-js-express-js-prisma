//

import { Button } from "@/components/ui/button";
import { getUserFromJwt } from "@/lib/jwt/jwt";
import Link from "next/link";
import PublicProfileMenu from "../PublicProfileMenu";

export default async function PublicNavbar() {
  const user = await getUserFromJwt();

  return (
    <nav className="bg-background/80 backdrop-blur-xs w-full max-w-6xl fixed top-2 left-[50%] -translate-x-[50%] z-999 rounded py-2 px-3 flex items-center justify-between">
      {/* LEFT SIDE */}
      <div>
        <Link href={"/"} className="text-xl md:text-2xl font-bold uppercase">
          LASV Guides
        </Link>
      </div>

      {/* MIDDLE */}
      <div></div>

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
    </nav>
  );
}
