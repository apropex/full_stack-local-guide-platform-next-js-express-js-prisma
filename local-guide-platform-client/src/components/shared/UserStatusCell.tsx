import { tUserStatus } from "@/constants";
import { cn } from "@/lib/utils";

// ACTIVE INACTIVE DELETED

export default function UserStatusCell({ status }: { status: tUserStatus }) {
  return (
    <span
      className={cn("text-white py-1 px-1.5 text-sm rounded-xs", {
        "bg-green-600": status === "ACTIVE",
        "bg-amber-600": status === "INACTIVE",
        "bg-red-600": status === "BANNED",
      })}
    >
      {status}
    </span>
  );
}
