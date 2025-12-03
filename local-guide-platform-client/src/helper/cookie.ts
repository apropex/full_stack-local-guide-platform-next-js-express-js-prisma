"use server";

import { getDuration } from "@/utils/time_unit";
import { parse } from "cookie";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// === Constants ===
const CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
  // domain: process.env.COOKIE_DOMAIN, // e.g., .example.com
  maxAge: getDuration("1d"),
};

const threeDays = getDuration("3d");
const thirtyDays = getDuration("1M");

//* =======================================================
//* SET COOKIE *\\
/*
 * The `refresh` parameter (default: `true`) controls whether a refresh token is required
 * in the response. When `refresh = false`, the function skips validation for the refresh
 */

export const setCookies = async (response: Response, refresh = true) => {
  const setCookieHeaders = response.headers.getSetCookie();
  if (!setCookieHeaders || setCookieHeaders.length === 0) {
    return {
      success: false,
      message: "Authentication failed: No cookies received",
      user: null,
    };
  }

  const cookieStore = await cookies();
  let accessTokenSet = false;
  let refreshTokenSet = false;
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  for (const header of setCookieHeaders) {
    const parsed = parse(header);

    if (parsed.accessToken) {
      CookieOptions.maxAge = parseInt(parsed["Max-Age"] || `${threeDays}`);
      cookieStore.set("accessToken", parsed.accessToken, CookieOptions);
      accessTokenSet = true;
      accessToken = parsed.accessToken;
    }

    if (parsed.refreshToken) {
      CookieOptions.maxAge = parseInt(parsed["Max-Age"] || `${thirtyDays}`);
      cookieStore.set("refreshToken", parsed.refreshToken, CookieOptions);
      refreshTokenSet = true;
      refreshToken = parsed.refreshToken;
    }
  }

  if (!refresh) refreshTokenSet = true;

  if (!accessTokenSet || !refreshTokenSet) {
    return {
      success: false,
      message: "Authentication failed: Missing access or refresh token",
      user: null,
    };
  }

  return { success: true, accessToken, refreshToken };
};

//* =======================================================
//* SET TEMP TOKEN *\\
export const setTempToken = async (response: Response) => {
  const setCookieHeaders = response.headers.getSetCookie();
  if (!setCookieHeaders || setCookieHeaders.length === 0) {
    return {
      success: false,
      message: "Authentication failed: No cookies received",
      user: null,
    };
  }

  const cookieStore = await cookies();
  let temp_tokenSet = false;
  let temp_token: string | null = null;

  for (const header of setCookieHeaders) {
    const parsed = parse(header);

    if (parsed.temp_token) {
      cookieStore.set("temp_token", parsed.temp_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        path: "/api/v1/auth/reset-forgot-password",
        maxAge: getDuration("5m"),
      });
      temp_tokenSet = true;
      temp_token = parsed.temp_token;
    }
  }

  if (!temp_tokenSet) {
    return {
      success: false,
      message: "Authentication failed: Missing token",
      user: null,
    };
  }

  return { success: true, temp_token };
};

//* =======================================================
//* GET COOKIE *\\
type Key = "all" | "accessToken" | "refreshToken" | "sidebar_state";

export async function getCookie(key?: Key): Promise<string> {
  if (!key) return (await headers()).get("cookie") ?? "";
  return (await cookies())?.get(key)?.value ?? "";
}

//* =======================================================
//* DELETE COOKIE *\\

/*
`isRedirect` (default: `true`) controls auto-redirect to `/login` after clearing all cookies. Set `false` to delete cookies silently (e.g., token refresh, API logout) and handle navigation manually.
*/
export async function deleteCookie(key: Key, isRedirect = true): Promise<void> {
  try {
    const cookieStore = await cookies();

    // Runtime check: only allow in server context
    if (typeof window !== "undefined") {
      throw new Error("deleteCookie can only be called in a Server Action or Route Handler.");
    }

    if (key === "all") {
      cookieStore.getAll().forEach((c) => cookieStore.delete(c.name));
      if (isRedirect) redirect("/login");
    } else {
      const isExist = cookieStore.get(key);
      if (isExist) cookieStore.delete(key);
    }
  } catch (error) {
    throw error;
  }
}
