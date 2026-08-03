"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/utils/cn";

const ROTATE_MS = 2400;

export function RoleRotator({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!mounted || profile.roles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % profile.roles.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [mounted]);

  const role = profile.roles[index];
  const widest = profile.roles.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-glass px-3 py-1.5 font-mono text-xs sm:text-sm",
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
      />
      <span className="text-muted">Currently:</span>
      <span className="relative inline-block">
        <span aria-hidden="true" className="invisible whitespace-pre">
          {widest}
        </span>
        <span className="absolute inset-0 flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={role}
              className="whitespace-nowrap text-primary"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {role}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </div>
  );
}
