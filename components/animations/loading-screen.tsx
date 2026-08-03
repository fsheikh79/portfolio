"use client";

import { useEffect, useState } from "react";
import { LOADING_STEPS } from "@/lib/constants";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/utils/cn";

const STEP_MS = 280;
const HOLD_MS = 320;
const FADE_MS = 450;
const SESSION_KEY = "fs-portfolio-loading-shown";

function readShown(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function writeShown() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sessionStorage may be blocked (private mode, storage quota); safe to ignore.
  }
}

export function LoadingScreen() {
  const mounted = useMounted();
  const [alreadyShown] = useState<boolean>(() => readShown());
  const [stepIndex, setStepIndex] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!mounted || alreadyShown) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = (i: number) => {
      if (i >= LOADING_STEPS.length - 1) {
        timers.push(
          setTimeout(() => {
            setFadingOut(true);
            timers.push(
              setTimeout(() => {
                writeShown();
                setGone(true);
              }, FADE_MS),
            );
          }, HOLD_MS),
        );
        return;
      }
      timers.push(
        setTimeout(() => {
          setStepIndex(i + 1);
          tick(i + 1);
        }, STEP_MS),
      );
    };

    tick(0);

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [mounted, alreadyShown]);

  if (!mounted || alreadyShown || gone) return null;

  const total = LOADING_STEPS.length;
  const progress = Math.min(1, (stepIndex + 1) / total);
  const current = LOADING_STEPS[stepIndex];
  const isReady = stepIndex === total - 1;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ease-out",
        fadingOut && "opacity-0 pointer-events-none",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_40%,rgba(34,211,238,0.14),transparent_70%)]" />

      <div className="relative flex w-full max-w-md flex-col items-center gap-6 px-6 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-highlight text-lg font-bold text-black shadow-[var(--shadow-glow-primary)]">
          FS
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Faizan Sheikh · Portfolio
          </p>
          <p
            className={cn(
              "font-mono text-sm text-foreground/90 transition-colors",
              isReady && "text-primary",
            )}
          >
            {current}
          </p>
        </div>

        <div className="w-full">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-foreground/8">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-highlight transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Step {Math.min(stepIndex + 1, total)} / {total}
          </p>
        </div>
      </div>
    </div>
  );
}
