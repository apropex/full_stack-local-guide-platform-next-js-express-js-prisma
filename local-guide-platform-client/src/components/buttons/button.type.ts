//

import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

export interface ButtonTypes extends React.ComponentProps<"button"> {
  icon?: ComponentType<LucideProps>;
  iconRight?: boolean;
  className?: string;
  iconClass?: string;
  textClass?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
}
