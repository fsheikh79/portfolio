import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-[#04121a] hover:bg-primary/90 shadow-[0_10px_30px_-15px_rgba(34,211,238,0.7)] hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.7)]",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 shadow-[0_10px_30px_-15px_rgba(139,92,246,0.7)]",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5",
  outline:
    "border border-[color:var(--color-border)] bg-transparent text-foreground hover:bg-foreground/5",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: NativeButtonProps) {
  return (
    <button
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: AnchorProps) {
  return (
    <a
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
