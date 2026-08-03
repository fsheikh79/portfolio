import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { SceneBackground } from "@/components/3d/scene-background";
import { Avatar } from "./avatar";
import { RoleRotator } from "./role-rotator";

const socialByPlatform = Object.fromEntries(
  profile.socials.map((s) => [s.platform, s]),
);

export function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-24 pt-4 sm:pt-10">
      <SceneBackground />
      <Container>
        <div className="grid items-center gap-12 py-14 sm:py-20 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <Badge tone="success" className="animate-fade-in-up">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_10px_var(--color-success)]"
              />
              {profile.status}
            </Badge>

            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted animate-fade-in-up">
                {profile.title} · {profile.location}
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Hi, I&apos;m {profile.name}.</span>
                <span className="mt-2 block bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent">
                  I build cloud infrastructure.
                </span>
              </h1>
            </div>

            <RoleRotator className="animate-fade-in-up" />

            <p className="max-w-2xl text-balance text-base leading-relaxed text-foreground/80 sm:text-lg">
              {profile.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ButtonLink href="#projects" variant="primary" size="lg">
                View Projects
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </ButtonLink>
              <ButtonLink
                href={profile.resume}
                variant="outline"
                size="lg"
                download
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download Resume
              </ButtonLink>
              <span className="ml-1 hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:inline-flex">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                Available Q3 2026
              </span>
            </div>

            <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/80">
              {socialByPlatform.github && (
                <li>
                  <Link
                    href={socialByPlatform.github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex items-center gap-2 hover:text-primary"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </Link>
                </li>
              )}
              {socialByPlatform.linkedin && (
                <li>
                  <Link
                    href={socialByPlatform.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 hover:text-primary"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </Link>
                </li>
              )}
              {socialByPlatform.email && (
                <li>
                  <Link
                    href={socialByPlatform.email.href}
                    aria-label="Email"
                    className="inline-flex items-center gap-2 hover:text-primary"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                    <span>{profile.email}</span>
                  </Link>
                </li>
              )}
              {socialByPlatform.phone && (
                <li>
                  <Link
                    href={socialByPlatform.phone.href}
                    aria-label="Phone"
                    className="inline-flex items-center gap-2 hover:text-primary"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                    <span>{profile.phone}</span>
                  </Link>
                </li>
              )}
              {socialByPlatform.location && (
                <li className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4" strokeWidth={1.75} />
                  <span>{profile.location}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col items-center">
              <Avatar />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
