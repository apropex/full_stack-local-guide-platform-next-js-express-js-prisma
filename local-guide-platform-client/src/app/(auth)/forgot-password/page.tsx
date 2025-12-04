"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter the valid email address.");
      return;
    }
  };

  return (
    <div className="">
      <div>
        <Label className="mb-1">Email</Label>
        <Input
          placeholder="john@example.com"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
        />
      </div>

      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-600/90">{error}</p>
      )}

      <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-3">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={cn(
            "bg-rose-500 text-white hover:bg-rose-600 py-2 w-44 rounded-xs flex justify-center gap-2",
            {
              "animate-pulse": loading,
            },
          )}
        >
          {loading ? (
            <>
              <span>
                <span>
                  <Spinner className="size-5 text-white-500" />
                </span>
              </span>
              Sending...
            </>
          ) : (
            "Send OTP"
          )}
        </button>

        <Link
          href={"/login"}
          className="text-sky-600 underline hover:text-sky-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
