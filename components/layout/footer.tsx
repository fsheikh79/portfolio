import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";

const social = (platform: string) =>
  profile.socials.find((s) => s.platform === platform);

export function Footer() {
  const year = new Date().getFullYear();
  const github = social("github");
  const linkedin = social("linkedin");

  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary via-secondary to-highlight text-[11px] font-bold text-black shadow-[var(--shadow-glow-primary)]"
              >
                FS
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted">
              {profile.title} · {profile.location}
            </p>
            <div className="mt-1 flex items-center gap-2">
              {github && (
                <Link
                  href={github.href}
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <GitHubIcon className="h-4 w-4" />
                </Link>
              )}
              {linkedin && (
                <Link
                  href={linkedin.href}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/80">
              {NAV_ITEMS.map((item) => (
                <li key={item.section}>
                  <Link
                    href={item.href}
                    className="hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Contact
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-primary"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[color:var(--color-border)] pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>Designed &amp; Developed by Faizan Sheikh · © {year}</p>
          <p className="font-mono">Built with Next.js, Tailwind, and Terraform-flavoured discipline.</p>
        </div>
      </Container>
    </footer>
  );
}
