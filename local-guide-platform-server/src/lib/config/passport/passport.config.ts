/* eslint-disable @typescript-eslint/no-explicit-any */

import passport from "passport";
import prisma from "../../prisma";
import { googleStrategy } from "./strategies/google.strategy";
import { localStrategy } from "./strategies/local.strategy";

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
