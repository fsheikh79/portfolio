import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Info,
  KeyRound,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import type { Project } from "@/types";
import { projects } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ArchitecturePlaceholder } from "./architecture-placeholder";

interface ProjectDetailProps {
  project: Project;
}

interface SectionProps {
  id: string;
  title: string;
  eyebrow: string;
  Icon: typeof Sparkles;
  children: React.ReactNode;
}

function DetailSection({ id, title, eyebrow, Icon, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/85">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const live = project.links.find((l) => l.kind === "live");
  const repo = project.links.find((l) => l.kind === "repo");

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <article className="pb-16">
      <div className="relative overflow-hidden border-b border-[color:var(--color-border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_-20%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(700px_360px_at_90%_0%,rgba(139,92,246,0.14),transparent_60%)]"
        />
        <Container>
          <div className="relative flex flex-col gap-6 py-12 sm:py-16">
            <Link
              href="/#projects"
              className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              All projects
            </Link>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary">{project.context}</Badge>
                <Badge tone="neutral">{project.role}</Badge>
              </div>
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {project.name}
              </h1>
              <p className="max-w-3xl text-balance text-base leading-relaxed text-foreground/80 sm:text-lg">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Badge key={s} tone="neutral">
                  {s}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {live && (
                <ButtonLink
                  href={live.href}
                  variant="primary"
                  size="md"
                  target={live.isPlaceholder ? undefined : "_blank"}
                  rel={live.isPlaceholder ? undefined : "noopener noreferrer"}
                  aria-disabled={live.isPlaceholder}
                  className={live.isPlaceholder ? "opacity-70" : undefined}
                >
                  
                  <ExternalLink className="h-4 w-4" strokeWidth={2} />
                  Live Demo
                  {live.isPlaceholder && (
                    <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                      placeholder
                    </span>
                  )}
                </ButtonLink>
              )}
              {repo && (
                <ButtonLink
                  href={repo.href}
                  variant="outline"
                  size="md"
                  target={repo.isPlaceholder ? undefined : "_blank"}
                  rel={repo.isPlaceholder ? undefined : "noopener noreferrer"}
                  
                  aria-disabled={repo.isPlaceholder}
                  className={repo.isPlaceholder ? "opacity-70" : undefined}
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub 
                  {repo.isPlaceholder && (
                    <span className="ml-1 rounded-full bg-foreground/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      placeholder
                    </span>
                  )}
                </ButtonLink>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-16">
          <div className="flex flex-col gap-16">
            <DetailSection
              id="overview"
              eyebrow="Overview"
              title="What it is"
              Icon={Info}
            >
              <p className="max-w-3xl text-base leading-relaxed text-foreground/85">
                {project.summary}
              </p>
              <div className="mt-6">
                <Bullets items={project.highlights} />
              </div>
            </DetailSection>

            <DetailSection
              id="architecture"
              eyebrow="Architecture"
              title="How it&apos;s wired"
              Icon={Workflow}
            >
              <ArchitecturePlaceholder project={project} />
            </DetailSection>

            <DetailSection
              id="challenges"
              eyebrow="Challenges"
              title="Problems worth solving"
              Icon={Lightbulb}
            >
              <ol className="flex flex-col gap-4">
                {project.challenges.map((c) => (
                  <li key={c.challenge}>
                    <Card variant="solid" className="flex flex-col gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warning">
                        Challenge
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {c.challenge}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-success">
                        Solution
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {c.solution}
                      </p>
                    </Card>
                  </li>
                ))}
              </ol>
            </DetailSection>

            <DetailSection
              id="decisions"
              eyebrow="Engineering"
              title="Decisions I made"
              Icon={Sparkles}
            >
              <Bullets items={project.decisions} />
            </DetailSection>

            <DetailSection
              id="security"
              eyebrow="Security"
              title="How it stays safe"
              Icon={ShieldCheck}
            >
              <Bullets items={project.security} />
            </DetailSection>

            <DetailSection
              id="cicd"
              eyebrow="CI/CD"
              title="How it ships"
              Icon={TerminalSquare}
            >
              <Bullets items={project.cicd} />
            </DetailSection>

            <DetailSection
              id="lessons"
              eyebrow="Retro"
              title="What I&apos;d tell myself in week one"
              Icon={KeyRound}
            >
              <Bullets items={project.lessons} />
            </DetailSection>

            <DetailSection
              id="future"
              eyebrow="Next"
              title="Future improvements"
              Icon={Rocket}
            >
              <Bullets items={project.future} />
            </DetailSection>
          </div>

          <aside
            aria-label="On this page"
            className="hidden lg:sticky lg:top-24 lg:block lg:h-fit"
          >
            <Card variant="glass" className="flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                On this page
              </p>
              <nav aria-label="Case study sections">
                <ul className="flex flex-col gap-1.5 text-sm">
                  {[
                    ["overview", "Overview"],
                    ["architecture", "Architecture"],
                    ["challenges", "Challenges"],
                    ["decisions", "Decisions"],
                    ["security", "Security"],
                    ["cicd", "CI/CD"],
                    ["lessons", "Lessons"],
                    ["future", "Future"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded px-2 py-1 text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>
          </aside>
        </div>

        <nav
          aria-label="Project pagination"
          className="mt-4 grid gap-3 border-t border-[color:var(--color-border)] pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-[color:var(--color-border)] bg-card p-4 transition-colors hover:border-primary/40"
            >
              <ArrowLeft
                className="h-4 w-4 text-muted transition-colors group-hover:text-primary"
                strokeWidth={2}
              />
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Previous
                </span>
                <span className="text-sm font-medium text-foreground">
                  {prev.name}
                </span>
              </div>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-[color:var(--color-border)] bg-card p-4 transition-colors hover:border-primary/40 sm:col-start-2"
            >
              <div className="flex flex-col text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Next
                </span>
                <span className="text-sm font-medium text-foreground">
                  {next.name}
                </span>
              </div>
              <ArrowRight
                className="h-4 w-4 text-muted transition-colors group-hover:text-primary"
                strokeWidth={2}
              />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </Container>
    </article>
  );
}
