import { Admin, Guide, User, UserAvatar } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { sCode } from "../utils";
import ApiError from "./ApiError";
import env from "./config/env";

export type iJwtPayloadMaker = Partial<
  Partial<User> & {
    avatar: UserAvatar;
    guide?: Guide;
    admin?: Admin;
  }
>;

const payloadMaker = (user: iJwtPayloadMaker) => {
  const payload = {} as Partial<User> & {
    avatar: string;
    guideId?: string;
    adminId?: string;
  };

  if (user.guide) payload.guideId = user.guide.id;
  if (user.admin) payload.adminId = user.admin.id;

  if (user.id) payload.id = user.id;
  if (user.name) payload.name = user.name;
  if (user.email) payload.email = user.email;
  if (user.phone) payload.phone = user.phone;
  if (user.gender) payload.gender = user.gender;
  if (user.language) payload.language = user.language;
  if (user.country) payload.country = user.country;
  if (user.nationality) payload.nationality = user.nationality;

  if (user.status) payload.status = user.status;
  if (user.socialImageUrl) payload.avatar = user.socialImageUrl;
  if (user.avatar?.url) payload.avatar = user.avatar.url;
  if ("isVerified" in user) payload.isVerified = user.isVerified;
  if ("isDeleted" in user) payload.isDeleted = user.isDeleted;

  return payload;
};

//* GENERATE ACCESS TOKEN
export const generateAccessToken = (
  userPayload: Partial<User>,
  { secretKey, period }: { secretKey?: string; period?: string } = {},
) => {
  //

  const payload = payloadMaker(userPayload);
  const secret = secretKey || env.jwt.access_token_secret;
  const options = {
    expiresIn: period || env.jwt.access_token_expire_time,
  } as jwt.SignOptions;

  const access_token = jwt.sign(payload, secret, options);

  if (!access_token)
    throw new ApiError(
      sCode.EXPECTATION_FAILED,
      "Failed to generate access token",
    );

  return access_token;
};

//* GENERATE REFRESH TOKEN
export const generateRefreshToken = (
  userPayload: Partial<User>,
  { secretKey, period }: { secretKey?: string; period?: string } = {},
) => {
  //

  const payload = payloadMaker(userPayload);
  const secret = secretKey || env.jwt.refresh_token_secret;
  const options = {
    expiresIn: period || env.jwt.refresh_token_expire_time,
  } as jwt.SignOptions;

  const refresh_token = jwt.sign(payload, secret, options);

  if (!refresh_token)
    throw new ApiError(
      sCode.EXPECTATION_FAILED,
      "Failed to generate refresh token",
    );

  return refresh_token;
};

//* VERIFY ACCESS TOKEN
export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  const accessToken = jwt.verify(token, env.jwt.access_token_secret);
  if (!accessToken || typeof accessToken === "string")
    throw new ApiError(sCode.UNAUTHORIZED, "Token is not valid");
  return accessToken;
};

//* VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token: string): jwt.JwtPayload => {
  const refreshToken = jwt.verify(token, env.jwt.refresh_token_secret);
  if (!refreshToken || typeof refreshToken === "string")
    throw new ApiError(sCode.UNAUTHORIZED, "Token is not valid");
  return refreshToken;
};
