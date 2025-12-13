"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/Password";
import { useState } from "react";

export default function Security() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPhone, setRecoveryPhone] = useState("");

  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold">Security & Privacy</h2>
      <p className="text-base text-muted-foreground">
        Manage your account security with these settings
      </p>

      <div className="mt-10 flex flex-col md:flex-row">
        {/* Update Password */}
        <div className="flex-1 pb-7 border-b mb-7 md:pb-0 md:border-b-0 md:mb-0 md:pr-5 md:border-r">
          <div className="flex justify-between">
            <h3 className="text-lg md:text-xl font-semibold">
              Update Password
            </h3>
            <Button>Update</Button>
          </div>
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-5">
            <div className="lg:col-span-2">
              <Label className="mb-1">Old Password</Label>
              <Password
                value={oldPassword}
                onChange={({ target }) => setOldPassword(target.value)}
              />
            </div>
            <div>
              <Label className="mb-1">New Password</Label>
              <Password
                value={newPassword}
                onChange={({ target }) => setNewPassword(target.value)}
              />
            </div>
            <div>
              <Label className="mb-1">Confirm Password</Label>
              <Password
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </div>
          </div>
        </div>

        {/* Recovery Settings */}
        <div className="flex-1 md:pl-5">
          <h3 className="text-lg md:text-xl font-semibold">
            Recovery Settings
          </h3>

          <div className="mt-4 space-y-5">
            <div>
              <Label className="mb-1">Recovery email</Label>
              <Input
                placeholder="example@domain.com"
                value={recoveryEmail}
                onChange={({ target }) => setRecoveryEmail(target.value)}
              />
            </div>
            <div>
              <Label className="mb-1">Recovery Phone</Label>
              <Input
                placeholder="46578932151"
                value={recoveryPhone}
                onChange={({ target }) => setRecoveryPhone(target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
