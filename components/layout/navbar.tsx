"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { useActiveSection } from "@/hooks/use-active-section";
import { openCommandPalette } from "@/components/palette/command-palette";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = NAV_ITEMS.map((item) => item.section);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div
            className={cn(
              "flex flex-1 items-center justify-between gap-3 rounded-full border border-transparent px-3 py-2 transition-all duration-300",
              scrolled &&
                "glass border-[color:var(--color-border)] shadow-[var(--shadow-elevated)]",
            )}
          >
            <Link
              href="/#hero"
              className="flex items-center gap-2 px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary via-secondary to-highlight text-[11px] font-bold text-black shadow-[var(--shadow-glow-primary)]"
              >
                FS
              </span>
              <span className="hidden text-sm font-semibold tracking-tight sm:inline">
                {SITE.shortName}
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 md:flex"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.section;
                return (
                  <Link
                    key={item.section}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive && "text-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-primary/70"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Open command palette"
                title="Command palette · ⌘K"
                onClick={openCommandPalette}
                className="hidden h-8 items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-transparent px-2.5 text-xs text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Search</span>
                <kbd className="rounded border border-[color:var(--color-border)] bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>
              <ThemeToggle className="hidden md:inline-flex" />
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/80 transition-colors hover:text-primary md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {open ? (
                  <X className="h-4 w-4" strokeWidth={1.75} />
                ) : (
                  <Menu className="h-4 w-4" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-4 top-20 rounded-2xl glass p-4 shadow-[var(--shadow-elevated)] transition-all duration-300",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item.section;
              return (
                <Link
                  key={item.section}
                  ref={i === 0 ? firstMobileLink : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive && "bg-primary/10 text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
