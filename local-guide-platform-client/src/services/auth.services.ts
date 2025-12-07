/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { otpOptions } from "@/constants";
import { routes } from "@/constants/routes";
import { deleteCookie, setCookies, setTempToken } from "@/helper/cookie";
import { errorResponse } from "@/helper/errorResponse";
import { iResponse } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import { ENV } from "@/lib/config/env";
import { _fetch } from "@/lib/custom-fetch";
import { sendEmail } from "@/lib/email/sendEmail";
import { join } from "@/utils";
import { LoginPayload, ResetPasswordPayload } from "@/zod/auth.schema";
import { cookies, headers } from "next/headers";

export const login = async ({
  email,
  password,
}: LoginPayload): Promise<iResponse<iUser>> => {
  try {
    const res = await fetch(join(ENV.BASE_URL, routes.auth("login")), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({
        message: `HTTP error ${res.status}: ${errorText} | api: /login`,
      });
    }

    await setCookies(res);

    return (await res.json()) as iResponse<iUser>;
  } catch (error) {
    return errorResponse(error);
  }
};

export const logout = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await deleteCookie("all", false);
    return { success: true };
  } catch (error) {
    return errorResponse(error);
  }
};

export const resetPassword = async ({
  oldPassword,
  newPassword,
}: ResetPasswordPayload) => {
  try {
    return await _fetch.post(routes.auth("reset-password"), {
      data: { oldPassword, newPassword },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const verifyUserSetOtp = async (email: string) => {
  try {
    const { success, message, data } = await _fetch.post(
      routes.auth("verify"),
      {
        data: {
          email,
          option: otpOptions.setOtp,
        },
      },
    );

    if (success) {
      const otp = (data as any).otp; // TODO: set opt by resend

      await sendEmail({
        to: email,
        subject: "Verify OTP | LASV Guides",
        templateName: "verify_otp",
        templateData: { otp },
      });
    }

    return { success, message };
  } catch (error) {
    return errorResponse(error);
  }
};

export const verifyUserVerifyOtp = async (email: string, otp: string) => {
  try {
    return await _fetch.post(routes.auth("verify"), {
      data: { email, option: otpOptions.verifyOtp, otp },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const forgotPasswordSetOtp = async (email: string) => {
  try {
    const { success, message, data } = await _fetch.post(
      routes.auth("forgot-password"),
      {
        data: { email, option: otpOptions.setOtp },
      },
    );

    if (success) {
      const otp = (data as any).otp;

      await sendEmail({
        to: email,
        subject: "Reset Password OTP | LASV Guides",
        templateName: "passwordReset",
        templateData: { otp },
      });

      (await cookies()).set("reset_email", email, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 300, // 5 min
      });
    }

    return { success, message };
  } catch (error) {
    return errorResponse(error);
  }
};

export const forgotPasswordVerifyOtp = async (otp: string) => {
  try {
    const email = (await cookies()).get("reset_email")?.value;
    const res = await fetch(
      join(ENV.BASE_URL, routes.auth("forgot-password")),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, option: otpOptions.verifyOtp, otp }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({
        message: `HTTP error ${res.status}: ${errorText} | api: /auth/verify`,
      });
    }

    await setTempToken(res);

    return await res.json();
  } catch (error) {
    return errorResponse(error);
  }
};

export const resetForgotPassword = async (newPassword: string) => {
  try {
    const tokens = (await headers()).get("cookie") ?? "";
    const tempToken =
      tokens.split(";").find((c) => c.trim().startsWith("temp_token=")) ?? "";

    const res = await fetch(
      join(ENV.BASE_URL, routes.auth("reset-forgot-password")),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", cookie: tempToken },
        body: JSON.stringify({ newPassword }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({
        message: `HTTP error ${res.status}: ${errorText} | api: /auth/reset-forgot-password`,
      });
    }

    const result = await res.json();

    if (result.success) {
      await deleteCookie("temp_token");
      await deleteCookie("reset_email");
    }

    return { success: result?.success, message: result?.message };
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAccessTokenByRefreshToken = async () => {
  try {
    const tokens = (await headers()).get("cookie") ?? "";
    const refreshToken =
      tokens.split(";").find((c) => c.trim().startsWith("refreshToken=")) ?? "";

    const res = await fetch(join(ENV.BASE_URL, routes.auth("refresh")), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: refreshToken },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return errorResponse({
        message: `HTTP error ${res.status}: ${errorText} | api: /refresh`,
      });
    }

    await setCookies(res);

    return await res.json();
  } catch (error) {
    return errorResponse(error);
  }
};
