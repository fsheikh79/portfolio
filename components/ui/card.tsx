import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "glass" | "outline";
  interactive?: boolean;
  children: ReactNode;
}

const variantClass = {
  solid:
    "bg-card border border-[color:var(--color-border)]",
  glass: "glass",
  outline:
    "bg-transparent border border-[color:var(--color-border)]",
} as const;

export function Card({
  variant = "solid",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-[var(--shadow-elevated)]",
        variantClass[variant],
        interactive &&
          "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
