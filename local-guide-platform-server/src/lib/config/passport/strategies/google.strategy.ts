import { Role, UserStatus } from "@prisma/client";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import prisma from "../../../prisma";
import env from "../../env";

const google = env.google;

export const googleStrategy = new GoogleStrategy(
  {
    clientID: google.client_id,
    clientSecret: google.client_secret,
    callbackURL: google.callback_url,
  },
  async (
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) => {
    try {
      const email = profile.emails?.[0].value;

      if (!email) return done(null, false, { message: "Email not found" });

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        if (user.isDeleted)
          return done(null, false, { message: "User is deleted" });
        if (!user.isVerified)
          return done(null, false, { message: "User is not verified" });
        if (user.status === UserStatus.BANNED)
          return done(null, false, { message: "User was banned" });
      }

      if (!user) {
        user = await prisma.$transaction(async (trx) => {
          const newUser = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              socialImageUrl: profile.photos?.[0].value || null,
              role: Role.TOURIST,
              isVerified: true,
              hasPassword: false,
            },
          });

          await prisma.account.create({
            data: {
              provider: profile.provider,
              providerAccountId: profile.id,
              userId: newUser.id,
            },
          });

          return newUser;
        });

        //

        return done(null, user, { message: "User created successfully!" });
      }

      done(null, user, { message: "User logged in successfully!" });
    } catch (error) {
      return done(error);
    }
  },
);
