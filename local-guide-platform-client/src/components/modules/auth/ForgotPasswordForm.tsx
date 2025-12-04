"use client";

import { Label } from "@/components/ui/label";
import Password from "@/components/ui/Password";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { PASSWORD_REGEX } from "@/zod/common-zod-schema";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!PASSWORD_REGEX.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number, and a special character, and must not contain spaces",
      );
      return;
    }

    setError(null);
    setLoading(true);

    //

    setLoading(false);
  };

  return (
    <div>
      {error && (
        <p className="px-1 pb-0.5 rounded-xs bg-red-200/30 text-red-600 mb-3">
          {error}
        </p>
      )}

      <div>
        <Label className="mb-1">Password</Label>
        <Password
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
        />
      </div>

      <div className="mt-3">
        <Label className="mb-1">Confirm Password</Label>
        <Password
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
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
                <span>
                  <Spinner className="size-5 text-white-500" />
                </span>
              </span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
