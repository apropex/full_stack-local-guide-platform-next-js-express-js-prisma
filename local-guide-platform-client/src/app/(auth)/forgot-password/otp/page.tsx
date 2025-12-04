//

import ForgotPassOTPForm from "@/components/modules/auth/ForgotPassOTPForm";
import { cookies } from "next/headers";

export default async function OTPPage() {
  const email = (await cookies()).get("reset_email")?.value;

  return (
    <div className="">
      <p className="bg-[#4B4458] text-white rounded-xs px-1.5 pb-0.5 mb-2">
        Check your email address, we sent an otp of 6 digits.
      </p>

      <ForgotPassOTPForm email={email} />
    </div>
  );
}
