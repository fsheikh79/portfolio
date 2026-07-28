import type { ReactNode } from "react";
import { Container } from "./container";
import { cn } from "@/utils/cn";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerSize = "lg",
  align = "left",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-28",
        className,
      )}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <Container size={containerSize}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-10 flex flex-col gap-3 sm:mb-14",
              align === "center" && "items-center text-center",
            )}
          >
            {eyebrow && (
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                id={`${id}-heading`}
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
