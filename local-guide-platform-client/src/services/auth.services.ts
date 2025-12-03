/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { otpOptions } from "@/constants";
import { setCookies, setTempToken } from "@/helper/cookie";
import { errorResponse } from "@/helper/errorResponse";
import { iResponse } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import { ENV } from "@/lib/config/env";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { LoginPayload, ResetPasswordPayload } from "@/zod/auth.schema";
import { headers } from "next/headers";

export const login = async ({ email, password }: LoginPayload): Promise<iResponse<iUser>> => {
  try {
    const res = await fetch(join(ENV.BASE_URL, "/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({ message: `HTTP error ${res.status}: ${errorText} | api: /login` });
    }

    await setCookies(res);

    return (await res.json()) as iResponse<iUser>;
  } catch (error) {
    return errorResponse(error);
  }
};

export const resetPassword = async ({ oldPassword, newPassword }: ResetPasswordPayload) => {
  try {
    return await _fetch.post("/reset-password", {}, { oldPassword, newPassword });
  } catch (error) {
    return errorResponse(error);
  }
};

export const verifyUser = {
  setOtp: async (email: string) => {
    try {
      const { success, message, data } = await _fetch.post(
        "/auth/verify",
        {},
        {
          email,
          option: otpOptions.setOtp,
        }
      );

      const otp = (data as any).otp; // TODO: set opt by resend

      return { success, message };
    } catch (error) {
      return errorResponse(error);
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      return await _fetch.post("/auth/verify", {}, { email, option: otpOptions.verifyOtp, otp });
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const forgotPassword = {
  setOtp: async (email: string) => {
    try {
      const { success, message, data } = await _fetch.post(
        "/auth/verify",
        {},
        {
          email,
          option: otpOptions.setOtp,
        }
      );

      const otp = (data as any).otp; // TODO: set opt by resend

      return { success, message };
    } catch (error) {
      return errorResponse(error);
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      const res = await fetch(join(ENV.BASE_URL, "/auth/verify"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, option: otpOptions.verifyOtp, otp }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return errorResponse({ message: `HTTP error ${res.status}: ${errorText} | api: /auth/verify` });
      }

      await setTempToken(res);

      return await res.json();
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const resetForgotPassword = async (newPassword: string) => {
  try {
    const tokens = (await headers()).get("cookie") ?? "";
    const tempToken = tokens.split(";").find((c) => c.trim().startsWith("temp_token=")) ?? "";

    const res = await fetch(join(ENV.BASE_URL, "/auth/reset-forgot-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: tempToken },
      body: JSON.stringify({ newPassword }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({ message: `HTTP error ${res.status}: ${errorText} | api: /auth/reset-forgot-password` });
    }

    return await res.json();
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAccessTokenByRefreshToken = async () => {
  try {
    const tokens = (await headers()).get("cookie") ?? "";
    const refreshToken = tokens.split(";").find((c) => c.trim().startsWith("refreshToken=")) ?? "";

    const res = await fetch(join(ENV.BASE_URL, "/auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: refreshToken },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({ message: `HTTP error ${res.status}: ${errorText} | api: /refresh` });
    }

    await setCookies(res);

    return await res.json();
  } catch (error) {
    return errorResponse(error);
  }
};
