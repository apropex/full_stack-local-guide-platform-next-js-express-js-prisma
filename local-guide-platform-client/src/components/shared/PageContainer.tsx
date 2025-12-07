//

import { iChildren } from "@/interfaces";
import { cn } from "@/lib/utils";

interface iProps extends iChildren {
  style?: Record<string, string>;
  className?: string;
  sectionClass?: string;
}

export default function PageContainer({
  children,
  style,
  className,
  sectionClass,
}: iProps) {
  return (
    <div className={cn("pt-24 px-4 md:px-6 lg:px-8", className)} style={style}>
      <div className={cn("container mx-auto", sectionClass)}>{children}</div>
    </div>
  );
}
