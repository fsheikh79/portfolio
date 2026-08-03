import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "That page doesn't exist. Head back to the portfolio home.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const quickLinks = NAV_ITEMS.filter((item) =>
    ["about", "projects", "experience", "contact"].includes(item.section),
  );

  return (
    <Container>
      <div className="flex min-h-[70vh] flex-col items-start justify-center gap-8 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
          Error · 404
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">This route doesn&apos;t exist.</span>
            <span className="mt-2 block bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent">
              Let&apos;s get you back on track.
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            The page you asked for was moved, retired, or never existed. Try
            one of the quick links, hit{" "}
            <kbd className="rounded border border-[color:var(--color-border)] bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>{" "}
            to open the command palette, or head back home.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/" variant="primary" size="md">
            <Home className="h-4 w-4" strokeWidth={2} />
            Back home
          </ButtonLink>
          <ButtonLink href="/#projects" variant="outline" size="md">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            See projects
          </ButtonLink>
        </div>

        <nav aria-label="Quick links" className="mt-6 flex flex-col gap-2">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <Search className="h-3 w-3" strokeWidth={2} />
            Quick links
          </p>
          <ul className="flex flex-wrap gap-2">
            {quickLinks.map((item) => (
              <li key={item.section}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-[color:var(--color-border)] px-3 py-1.5 text-xs text-foreground/80 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
