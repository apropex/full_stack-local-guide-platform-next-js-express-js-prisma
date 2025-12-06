import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";
import { ENV } from "@/lib/config/env";
import * as jwt from "jsonwebtoken";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewPasswordPage() {
  const tokens = (await headers()).get("cookie") ?? "";
  const tempToken = (
    tokens.split(";").find((c) => c.trim().startsWith("temp_token=")) ?? ""
  ).split("=")?.[1];

  const decoded = tempToken
    ? jwt.verify(tempToken, ENV.TEMP_TOKEN_SECRET)
    : null;

  if (!decoded || typeof decoded === "string") {
    redirect("/login");
  }

  return (
    <div className="">
      <p className="bg-[#4B4458] text-white rounded-xs px-1.5 pb-0.5 mb-2">
        Enter your new password and submit.
      </p>

      <ForgotPasswordForm />
    </div>
  );
}
