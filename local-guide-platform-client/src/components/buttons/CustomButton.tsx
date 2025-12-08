import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ButtonTypes } from "./button.type";

export default function CustomButton({
  children = "",
  variant,
  size,
  asChild = false,
  className,
  textClass,
  icon: Icon,
  iconClass,
  iconRight = false,
  ...props
}: ButtonTypes) {
  return (
    <Button
      className={cn("hover:translate-y-0.5 active:scale-95", className)}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {Icon && !iconRight && <Icon className={iconClass} />}
      {children && (
        <span className={cn("inline-block", textClass)}>{children}</span>
      )}
      {Icon && iconRight && <Icon className={iconClass} />}
    </Button>
  );
}
