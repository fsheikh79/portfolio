"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ExperienceItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
  defaultOpen?: boolean;
}

export function ExperienceCard({
  item,
  index,
  defaultOpen = false,
}: ExperienceCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();
  const detailsId = `experience-details-${index}`;

  return (
    <article className="relative pl-10 sm:pl-14">
      <span
        aria-hidden="true"
        className="absolute left-2 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_0_3px_rgba(34,211,238,0.18)] sm:left-4"
      />

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-card p-5 shadow-[var(--shadow-elevated)] transition-colors hover:border-primary/40">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full flex-col gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-foreground/80">{item.company}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {item.period}
              </span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={2}
                className={cn(
                  "h-4 w-4 text-muted transition-transform duration-300",
                  open && "rotate-180 text-primary",
                )}
              />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              key="details"
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-4">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Highlights
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-foreground/85">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <Badge key={s} tone="neutral">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
