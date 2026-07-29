import Link from "next/link";
import { Calendar, Download, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { profile } from "@/lib/data";
import { ContactForm } from "./contact-form";
import { ContactCopyButtons } from "./contact-copy-buttons";

const social = (p: string) =>
  profile.socials.find((s) => s.platform === p);

export function Contact() {
  const github = social("github");
  const linkedin = social("linkedin");

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let&apos;s build something reliable."
      description="Open to full-time cloud & DevOps roles and internships across Canada and remote-friendly companies. The fastest way to reach me is email — the form below sends there directly."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
        <Card variant="solid" className="flex flex-col gap-6">
          <ContactForm />
        </Card>

        <div className="flex flex-col gap-4">
          <Card variant="glass" className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-success/10 text-success ring-1 ring-success/20">
                <Calendar className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  Availability
                </p>
                <p className="text-xs text-muted">Open to opportunities</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">
              Currently exploring full-time Cloud & DevOps Engineer roles and
              internships. Toronto-based, comfortable with hybrid or remote,
              open to relocation across Canada.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              {profile.location}
            </div>
          </Card>

          <Card variant="solid" className="flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Reach out directly
            </p>
            <ContactCopyButtons />
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {github && (
                <Link
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <GitHubIcon className="h-4 w-4" />
                </Link>
              )}
              {linkedin && (
                <Link
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </Link>
              )}
              <ButtonLink
                href={profile.resume}
                variant="outline"
                size="sm"
                download
                className="ml-auto"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={2} />
                Resume
              </ButtonLink>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
