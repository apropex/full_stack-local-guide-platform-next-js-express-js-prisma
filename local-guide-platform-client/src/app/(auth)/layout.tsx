import { iChildren } from "@/interfaces";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import AuthNavbar from "../../components/shared/auth-navbar/AuthNavbar";

export default function AuthLayout({ children }: iChildren) {
  return (
    <div className="bg-gray-50 w-full min-h-screen flex items-center justify-center p-4">
      <div className="min-h-[350px] relative bg-white text-[#4B4458] border border-[#4B4458]/20 w-full max-w-xl md:flex rounded-2xl overflow-hidden">
        {/* Left-Side bar */}
        <div className="relative bg-[#4B4458] md:w-14 flex items-center justify-center">
          <div className="md:absolute text-white uppercase text-2xl font-bold md:-rotate-90 whitespace-nowrap h-14 flex items-center justify-center">
            <p>LAS Visiting Guides</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <AuthNavbar />
          <div className="border-b border-[#4B4458]/20" />
          <div className="p-4 md:p-8">{children}</div>
        </div>

        <Link
          href={"/"}
          className="absolute right-4 top-4 text-white md:text-[#4B4458]"
        >
          <HomeIcon className="size-4 md:size-5" />
        </Link>
      </div>
    </div>
  );
}
