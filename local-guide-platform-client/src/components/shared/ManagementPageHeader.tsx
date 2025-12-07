import * as React from "react";
import { Button } from "../ui/button";

interface iProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    icon?: React.ComponentType;
    label: string;
    onclick: () => void;
  };
}

export default function ManagementPageHeader({
  children,
  title,
  description,
  action,
}: iProps) {
  return (
    <div className="flex items-center flex-wrap gap-3">
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onclick}>
          {action.icon && <action.icon />}
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}
