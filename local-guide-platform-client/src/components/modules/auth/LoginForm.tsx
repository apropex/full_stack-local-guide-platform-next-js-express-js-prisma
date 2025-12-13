"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/Password";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { login } from "@/services/auth.services";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ dest }: { dest?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password, password is required.");
      return;
    }

    _alert.loading("Trying to logging in", { id: email });

    setError(null);
    setLoading(true);

    const result = await login({ email, password });

    _alert.dismiss(email);

    if (result.success) {
      _alert.success(
        "Welcome back to LASV Guides",
        "You've logged in successfully",
      );
      if (result.data?.isVerified === false) router.push("/settings/profile");
      else router.push(dest ?? "/");
    } else {
      _alert.error(
        "We are sorry to say that, an error occurred during login",
        "Try again later or contact to support",
      );
      console.log(error);
      setError(
        result.message ??
          "We are sorry to say that, an error occurred during login. Try again later or contact to support",
      );
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
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

      <div>
        <Label className="mb-1">Password</Label>
        <Password
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
        />
      </div>

      {error && <p className="text-xs sm:text-sm text-red-600/90">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-3">
        <button
          type="submit"
          onClick={handleLogin}
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
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>

        <Link
          href={"/forgot-password"}
          className="text-sky-600 underline hover:text-sky-500"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
