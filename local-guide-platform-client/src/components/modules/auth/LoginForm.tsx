"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/Password";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, with letters and numbers.",
      );
      return;
    }

    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        setSuccess(true);
        router.refresh();
        // router.push("/");
      }

      if (result?.error) {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {success && (
        <p className="bg-green-600 text-white py-1 px-1.5 rounded">
          Logged in successfully! wait a few seconds to redirect
        </p>
      )}
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
