import { iChildren } from "@/interfaces";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends iChildren {
  className?: string;
  containerClass?: string;
}

interface iProps {
  title: string;
  highlight?: string;
  titleClass?: string;
  description?: string;
  descClass?: string;
  className?: string;
}

export function SectionTitle({
  title,
  highlight,
  titleClass,
  description,
  descClass,
  className,
}: iProps) {
  return (
    <div className={className}>
      <h2
        className={cn(
          "text-3xl md:text-5xl font-bold tracking-tight mb-4",
          titleClass,
        )}
      >
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {description && (
        <p className={cn("text-lg text-muted-foreground", descClass)}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function SectionContainer({
  children,
  className,
  containerClass,
}: SectionContainerProps) {
  return (
    <section className={cn("py-24 md:py-36 px-4 sm:px-6 lg:px-8", className)}>
      <div className={cn("container mx-auto", containerClass)}>{children}</div>
    </section>
  );
}
