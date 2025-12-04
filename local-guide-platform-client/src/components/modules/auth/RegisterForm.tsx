"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/Password";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRegistration = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

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

    // const data = await createUser({ name, email, password });

    // if (data.success) {
    //   router.push("/login");
    //   return;
    // }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 overflow-y-auto max-h-[52vh] custom_scrollbar pr-2">
        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>

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

        <div>
          <Label className="mb-1">Confirm Password</Label>
          <Password
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30"
          />
        </div>
      </div>

      {error && <p className="text-xs sm:text-sm text-red-600/90">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleRegistration}
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
