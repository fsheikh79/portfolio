"use client";

import { Check, Copy, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/utils/cn";

interface Row {
  label: string;
  value: string;
  href: string;
  Icon: typeof Mail;
}

const ROWS: Row[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    Icon: Phone,
  },
];

export function ContactCopyButtons() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <ul className="flex flex-col gap-3">
      {ROWS.map((row) => {
        const isCopied = copied === row.value;
        const Icon = row.Icon;
        return (
          <li
            key={row.label}
            className="group flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-background/40 p-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {row.label}
              </p>
              <a
                href={row.href}
                className="truncate text-sm text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {row.value}
              </a>
            </div>
            <button
              type="button"
              onClick={() => copy(row.value)}
              aria-label={`Copy ${row.label.toLowerCase()} to clipboard`}
              title={isCopied ? "Copied!" : `Copy ${row.label.toLowerCase()}`}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border)] text-muted transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isCopied && "border-success/40 text-success",
              )}
            >
              {isCopied ? (
                <Check className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
