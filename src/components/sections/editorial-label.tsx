import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function EditorialLabel({
  children,
  light = false,
}: PropsWithChildren<{ light?: boolean }>) {
  return (
    <p className={cn("editorial-label", light && "editorial-label--light")}>
      {children}
    </p>
  );
}
