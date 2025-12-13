/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  verifyUserSetOtp,
  verifyUserVerifyOtp,
} from "@/services/auth.services";
import { AlarmClock, CheckCircle, SendHorizontal, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

// simulated loading function
const simulateApiCall = (duration = 1000) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export default function AccountVerification({ email }: { email: string }) {
  const [value, setValue] = useState("");
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [timer, setTimer] = useState(0); // 120 seconds for the initial timer
  const [infoMessage, setInfoMessage] = useState({ type: "", text: "" }); // { type: "success" | "error" | "info", text: "..." }

  const handleSendOtp = async () => {
    try {
      setSendOtpLoading(true);
      setInfoMessage({ type: "", text: "" }); // Clear previous message

      await simulateApiCall(1500);

      const result = await verifyUserSetOtp(email);

      if (result.success) {
        setTimer(120);
        setInfoMessage({
          type: "success",
          text: "We’ve sent a secure 6-digit verification code to your email.",
        });
      } else {
        setInfoMessage({
          type: "error",
          text: "Failed to send OTP. Please check your email and try again.",
        });
      }
    } catch {
      setInfoMessage({
        type: "error",
        text: "Failed to send OTP. Please check your email and try again.",
      });
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (value.length !== 6 || timer === 0) return;

    try {
      setVerifyOtpLoading(true);
      setInfoMessage({ type: "", text: "" });

      await simulateApiCall(1000);

      const result = await verifyUserVerifyOtp(email, value);

      if (result.success && (result.data as any)?.success) {
        setInfoMessage({
          type: "success",
          text: "Account successfully verified! Redirecting...",
        });
      } else {
        setInfoMessage({
          type: "error",
          text: "Invalid code or verification failed. Please try again.",
        });
      }
    } catch {
      // --- Error Scenario (Replace with actual logic) ---
      setInfoMessage({
        type: "error",
        text: "Invalid code or verification failed. Please try again.",
      });
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      // Don't clear OTP value here, as user might enter it just before timer hits 0.
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Helper for message styles
  const getMessageStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-600/10 text-green-400 border-green-600";
      case "error":
        return "bg-red-600/10 text-red-400 border-red-600";
      case "info":
      default:
        return "bg-primary/10 text-primary-foreground border-primary";
    }
  };

  const MessageIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "info":
      default:
        return <AlarmClock className="w-4 h-4 text-primary" />;
    }
  };

  return (
    // Outer container for dark mode
    <div className="shadow-xl border rounded-2xl border-t-4 border-primary/70 bg-card/70 backdrop-blur-md animate-fade-in-up p-10 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 md:p-10 rounded-3xl border border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ">
        {/* Header Section */}
        <div className="space-y-2 text-center">
          <p className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
            Secure Verification
          </p>
          <p className="text-sm text-gray-400">
            Enter the 6-digit code sent to your registered email address.
          </p>
        </div>

        {/* Email and Send OTP Button */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <p className="flex-1 bg-gray-700/50 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-700 truncate shadow-inner w-full md:w-auto">
            {email}
          </p>

          <LoadingButton
            onClick={handleSendOtp}
            isLoading={sendOtpLoading}
            loadingText="Sending..."
            icon={!(timer > 0) ? SendHorizontal : undefined}
            iconRight
            textclass="mt-0.5"
            disabled={sendOtpLoading || timer > 0}
            className="rounded-xl shadow-lg disabled:bg-teal-600 bg-teal-600 hover:bg-teal-700 transition-all w-full md:w-auto"
          >
            {timer > 0 ? `Wait ${formatTime(timer)}` : "Send Code"}
          </LoadingButton>
        </div>

        {/* Info/Alert Message */}
        {infoMessage.text && (
          <div
            className={`flex items-center gap-3 text-sm px-4 py-3 rounded-xl border transition-all duration-300 ${getMessageStyles(
              infoMessage.type,
            )}`}
          >
            <MessageIcon type={infoMessage.type} />
            <p className="font-medium">{infoMessage.text}</p>
          </div>
        )}

        {/* OTP SECTION */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={setValue}
              disabled={timer === 0 || verifyOtpLoading}
              className="mx-auto"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
                <InputOTPSlot
                  index={1}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
                <InputOTPSlot
                  index={2}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 ml-4">
                <InputOTPSlot
                  index={3}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
                <InputOTPSlot
                  index={4}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
                <InputOTPSlot
                  index={5}
                  className="size-10 text-lg border border-gray-600 bg-gray-700/50 focus:border-teal-500"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* OTP Information */}
          <div className="text-center">
            {value.length === 6 ? (
              <p className="text-sm text-gray-300">
                Ready to verify. Code: <b>{value}</b>
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                Enter the remaining {6 - value.length} digits.
              </p>
            )}
          </div>

          {/* Timer Display */}
          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-400">
                New code request available in{" "}
                <b className="text-teal-400">{formatTime(timer)}</b>.
              </p>
            ) : (
              <p className="text-orange-400 font-medium">
                Verification code expired. Please resend the code.
              </p>
            )}
          </div>

          {/* Verify Button */}
          <LoadingButton
            onClick={handleVerifyOtp}
            isLoading={verifyOtpLoading}
            loadingText="Verifying..."
            icon={SendHorizontal}
            iconRight
            disabled={verifyOtpLoading || value.length !== 6 || timer === 0}
            className="w-full rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 transition-all mt-4"
          >
            Verify Account
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
