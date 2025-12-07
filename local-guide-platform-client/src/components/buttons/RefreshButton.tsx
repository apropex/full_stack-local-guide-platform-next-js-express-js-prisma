"use client";

import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ButtonTypes } from "./button.type";

export default function RefreshButton({
  children,
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  // ...props
  iconClass,
}: ButtonTypes) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      asChild={asChild}
      onClick={handleRefresh}
      disabled={isPending}
      // {...props}
    >
      <span>
        {Icon ? (
          <Icon
            className={cn(
              {
                "animate-spin": isPending,
              },
              iconClass,
            )}
          />
        ) : (
          <RefreshCcw
            className={cn(
              {
                "animate-spin": isPending,
              },
              iconClass,
            )}
          />
        )}
      </span>
      {children && <span className="inline-block mt-1">{children}</span>}
    </Button>
  );
}
