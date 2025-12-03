/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookies } from "@/helper/cookie";
import { iUser } from "@/interfaces/user.interfaces";
import { ENV } from "@/lib/config/env";
import { join } from "@/utils";
import { getDuration } from "@/utils/time_unit";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    // ❗ NextAuth will NOT handle tokens
    strategy: "jwt",
    maxAge: getDuration("1d"),
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      try {
        const payload = {
          name: profile?.name || user.name,
          email: profile?.email || user.email,
          socialImageUrl: (profile as any)?.picture,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          isVerified: true,
        };

        const res = await fetch(join(ENV.BASE_URL, "/auth/social-login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Backend social login failed");
          return false;
        }

        const newUser = (await res.json())?.iUser as iUser;

        if (newUser?.id || newUser?.email) {
          // Save access + refresh token cookies
          await setCookies(res);
          return true;
        }

        return false;
      } catch (err) {
        console.error("Social login error:", err);
        return false;
      }
    },

    async jwt({ token }) {
      return token;
    },

    async session({ session }) {
      return session;
    },
  },

  secret: ENV.NEXT_AUTH_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
