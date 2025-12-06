"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { forgotPassword } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPassOTPForm({ email }: { email: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const storedEmail = email;

  // ---- Timer State ----
  const INITIAL_TIME = 150; // 150 seconds
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const timerRunning = seconds > 0;

  // ---- Start timer when component loads ----
  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  // Format function for UI
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmitOtp = async () => {
    if (value.length < 6) {
      setError("Enter valid OTP, OTP must be 6 digits");
      return;
    }

    setError(null);
    setLoading(true);

    const result = await forgotPassword.verifyOtp(value);

    if (result.success) {
      router.push("/forgot-password/new-password");
    } else setError(result.message);

    setLoading(false);
  };

  const handleResend = async () => {
    setSeconds(INITIAL_TIME); // restart timer
    await forgotPassword.setOtp(storedEmail);
  };

  return (
    <div className="mt-5">
      {error && (
        <p className="px-1 pb-0.5 rounded-xs bg-red-200/30 text-red-600 mb-3">
          {error}
        </p>
      )}

      <div className="flex text-center justify-between gap-3 flex-wrap pb-3">
        <p>Your Email: {storedEmail}</p>
        <Link className="text-blue-600 text-sm mr-2" href={"/forgot-password"}>
          Edit
        </Link>
      </div>

      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="text-sm mt-0.5">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>

      {/* Timer UI */}
      <div className="text-xs mt-2 text-gray-500">
        {timerRunning ? (
          <>Resend OTP in {formatTime(seconds)}</>
        ) : (
          <>You can resend OTP again</>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-3">
        <button
          type="submit"
          onClick={handleSubmitOtp}
          disabled={loading || value.length < 6}
          className={cn(
            "bg-rose-500 text-white hover:bg-rose-600 py-2 w-44 rounded-xs flex justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-default",
            {
              "animate-pulse": loading,
            },
          )}
        >
          {loading ? (
            <>
              <span>
                <Spinner className="size-5 text-white-500" />
              </span>
              Submitting...
            </>
          ) : (
            "Submit OTP"
          )}
        </button>

        <button
          onClick={handleResend}
          disabled={timerRunning}
          className="text-sm text-blue-600 cursor-pointer disabled:opacity-60 disabled:cursor-default"
        >
          Resend
        </button>
      </div>
    </div>
  );
}
