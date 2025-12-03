import { UserRoles } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: UserRoles;
    name: string;
    avatar: string | null;
    isVerified: boolean;
    provider?: string;
    phone: string | null;
    address?: string | null;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: UserRoles;
    name: string;
    avatar: string | null;
    isVerified: boolean;
    provider?: string;
    phone: string | null;
    address?: string | null;
  }
}
