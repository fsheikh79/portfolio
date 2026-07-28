import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "sm" | "md" | "lg" | "xl";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const sizeClass: Record<NonNullable<ContainerProps<"div">["size"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "lg",
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizeClass[size],
        className,
      )}
      {...rest}
    />
  );
}
