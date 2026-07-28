import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

const toneClass: Record<BadgeTone, string> = {
  neutral:
    "bg-foreground/5 text-foreground/80 border-[color:var(--color-border)]",
  primary:
    "bg-primary/10 text-primary border-primary/30",
  secondary:
    "bg-secondary/10 text-secondary border-secondary/30",
  success:
    "bg-success/10 text-success border-success/30",
  warning:
    "bg-warning/10 text-warning border-warning/30",
  error:
    "bg-error/10 text-error border-error/30",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children: ReactNode;
}

export function Badge({
  tone = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-tight",
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
