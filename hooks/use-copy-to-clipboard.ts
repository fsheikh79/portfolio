"use client";

import { useCallback, useState } from "react";
import { copyToClipboard } from "@/utils/clipboard";

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      const ok = await copyToClipboard(value);
      if (ok) {
        setCopied(value);
        window.setTimeout(() => {
          setCopied((current) => (current === value ? null : current));
        }, resetMs);
      }
      return ok;
    },
    [resetMs],
  );

  return { copied, copy };
}
