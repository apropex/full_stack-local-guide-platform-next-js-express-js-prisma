"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  const pathname = usePathname();

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";
  // const isForgot = pathname === "/forgot-password";

  return (
    <div className="p-4 md:p-8 pb-0 md:pb-0">
      <h3 className="text-2xl md:text-4xl font-bold">
        {isLogin && "Welcome Back"}
        {isRegister && "Welcome to LASV Guides"}
        {!isLogin && !isRegister && "Forgot Your Password?"}
      </h3>
      <p className="text-xs md:text-sm mb-2 mt-1">
        {isLogin && "Enter your email and password to visit with us."}
        {isRegister && "Enter your valid information to create your account."}
      </p>

      {(isLogin || isRegister) && (
        <div className="flex items-center gap-5">
          <Link
            href={"/login"}
            className={cn("inline-block py-4", {
              "border-b-4 border-rose-500": isLogin,
            })}
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className={cn("inline-block py-4", {
              "border-b-4 border-rose-500": isRegister,
            })}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
