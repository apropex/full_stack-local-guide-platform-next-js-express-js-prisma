import { tUserStatus } from "@/constants";
import { cn } from "@/lib/utils";

// ACTIVE INACTIVE DELETED

export default function UserStatusCell({ status }: { status: tUserStatus }) {
  return (
    <span
      className={cn("text-white py-1 px-1.5 text-sm rounded-xs", {
        "bg-green-500": status === "ACTIVE",
        "bg-amber-500": status === "INACTIVE",
        "bg-red-500": status === "BANNED",
      })}
    >
      {status}
    </span>
  );
}
