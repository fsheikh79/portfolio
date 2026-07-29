"use client";

import { useCallback, useState } from "react";

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      if (typeof navigator === "undefined") return false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          setCopied(value);
          window.setTimeout(() => {
            setCopied((current) => (current === value ? null : current));
          }, resetMs);
          return true;
        }
      } catch {
        // Fall through to the failure branch below.
      }
      return false;
    },
    [resetMs],
  );

  return { copied, copy };
}
