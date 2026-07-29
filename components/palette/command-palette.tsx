"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Check, CornerDownLeft, Search } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/utils/cn";
import {
  buildActions,
  filterActions,
  type CommandAction,
  type CommandContext,
} from "./actions";

export const OPEN_PALETTE_EVENT = "portfolio:open-command-palette";

interface Toast {
  message: string;
  timestamp: number;
}

async function safeCopy(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }
  return false;
}

export function CommandPalette() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const actions = useMemo(() => buildActions(), []);
  const filtered = useMemo(
    () => filterActions(actions, query),
    [actions, query],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, CommandAction[]>();
    for (const action of filtered) {
      const list = map.get(action.group) ?? [];
      list.push(action);
      map.set(action.group, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap(([, list]) => list), [grouped]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      const isMac =
        typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      if (modifier && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    const handleOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", handleKey as EventListener);
    window.addEventListener(OPEN_PALETTE_EVENT, handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKey as EventListener);
      window.removeEventListener(OPEN_PALETTE_EVENT, handleOpenEvent);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
      lastFocused.current?.focus?.();
      setQuery("");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  const runAction = async (action: CommandAction) => {
    const ctx: CommandContext = {
      copy: async (text, label) => {
        const ok = await safeCopy(text);
        setToast({
          message: ok
            ? `${label ?? "Value"} copied to clipboard`
            : `Copy failed — value: ${text}`,
          timestamp: Date.now(),
        });
      },
      navigate: (href) => {
        if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
          window.location.href = href;
          return;
        }
        if (href.startsWith("/#")) {
          const [, hash] = href.split("#");
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${hash}`);
            return;
          }
        }
        if (href.startsWith("#")) {
          const hash = href.slice(1);
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", href);
            return;
          }
        }
        window.location.assign(href);
      },
    };
    setOpen(false);
    try {
      await action.perform(ctx);
    } catch {
      setToast({
        message: `Failed to run "${action.label}".`,
        timestamp: Date.now(),
      });
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (flat.length === 0 ? 0 : (i + 1) % flat.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        flat.length === 0 ? 0 : (i - 1 + flat.length) % flat.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = flat[activeIndex];
      if (action) void runAction(action);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  if (!mounted) return null;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh]"
        >
          <button
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-card shadow-[var(--shadow-elevated)]">
            <div className="flex items-center gap-2 border-b border-[color:var(--color-border)] px-4 py-3">
              <Search className="h-4 w-4 text-muted" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Command"
                placeholder="Type a command or search…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-[color:var(--color-border)] bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <ul
              ref={listRef}
              role="listbox"
              aria-label="Available commands"
              className="max-h-[60vh] overflow-y-auto py-1"
            >
              {flat.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted">
                  No matches. Try “projects”, “email”, or “philosophy”.
                </li>
              )}
              {grouped.map(([group, items]) => (
                <li key={group}>
                  <p className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                    {group}
                  </p>
                  <ul>
                    {items.map((action) => {
                      const index = flat.indexOf(action);
                      const active = index === activeIndex;
                      const Icon = action.Icon;
                      return (
                        <li key={action.id}>
                          <button
                            type="button"
                            data-index={index}
                            role="option"
                            aria-selected={active}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => void runAction(action)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                              active
                                ? "bg-primary/10 text-foreground"
                                : "text-foreground/85 hover:bg-foreground/5",
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0",
                                active ? "text-primary" : "text-muted",
                              )}
                              strokeWidth={1.75}
                            />
                            <span className="flex-1 truncate">
                              {action.label}
                            </span>
                            {action.hint && (
                              <span className="hidden truncate text-[11px] text-muted sm:inline">
                                {action.hint}
                              </span>
                            )}
                            {active && (
                              <CornerDownLeft
                                className="h-3.5 w-3.5 text-primary"
                                strokeWidth={2}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-[color:var(--color-border)] bg-background/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[color:var(--color-border)] px-1.5 py-0.5">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[color:var(--color-border)] px-1.5 py-0.5">↵</kbd>
                Run
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[color:var(--color-border)] px-1.5 py-0.5">
                  ⌘K
                </kbd>
                Toggle
              </span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 z-[85] -translate-x-1/2 rounded-full border border-[color:var(--color-border)] bg-card px-4 py-2 text-sm text-foreground shadow-[var(--shadow-elevated)] animate-fade-in-up"
        >
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-success" strokeWidth={2} />
            {toast.message}
          </span>
        </div>
      )}
    </>
  );
}

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}
