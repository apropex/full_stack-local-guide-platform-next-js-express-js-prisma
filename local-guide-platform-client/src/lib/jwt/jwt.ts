/* eslint-disable @typescript-eslint/no-explicit-any */

import { routes } from "@/constants/routes";
import { deleteCookie, getCookie, setCookies } from "@/helper/cookie";
import mergeApi from "@/utils/merge-api";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

export const accessTokenSecret = ENV.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = ENV.REFRESH_TOKEN_SECRET;

export const checkToken = async (
  token: string,
  secret: "access" | "refresh",
  isRedirect = false,
): Promise<JwtPayload | null> => {
  if (!accessTokenSecret || !refreshTokenSecret) return null;

  const tokenSecret =
    secret === "access" ? accessTokenSecret : refreshTokenSecret;

  try {
    const decoded = jwt.verify(token, tokenSecret);
    if (!decoded || typeof decoded === "string") return null;
    return decoded as JwtPayload;
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      await deleteCookie("accessToken", isRedirect);
      if (secret === "refresh") await deleteCookie("refreshToken", isRedirect);
    }
    return null;
  }
};

export async function setAccessTokenByRefreshToken(
  refreshToken: string,
  isRedirect = false,
): Promise<{
  success: boolean;
  accessToken?: string;
  refreshToken?: string | null;
}> {
  try {
    const response = await fetch(mergeApi(routes.auth("refresh")), {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!response.ok) {
      await deleteCookie("all", isRedirect);
      return { success: false };
    }

    const result = await setCookies(response);

    if (!result.success || !result.accessToken) {
      await deleteCookie("all", isRedirect);
      return { success: false };
    }

    return {
      success: true,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  } catch {
    await deleteCookie("all", isRedirect);
    return { success: false };
  }
}

// Function overload signatures:
export function getUserFromJwt(): Promise<JwtPayload | null>;
export function getUserFromJwt<K extends keyof JwtPayload>(
  key: K,
): Promise<JwtPayload[K] | null>;

// Actual implementation:
export async function getUserFromJwt<K extends keyof JwtPayload>(
  key?: K,
): Promise<JwtPayload | JwtPayload[K] | null> {
  const accessToken = await getCookie("accessToken");
  const decoded = await checkToken(accessToken, "access");
  if (!decoded) return null;
  return key ? decoded[key] : decoded;
}
