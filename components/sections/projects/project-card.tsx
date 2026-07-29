import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/icons/brand-icons";

interface ProjectCardProps {
  project: Project;
}

const MAX_STACK = 8;

export function ProjectCard({ project }: ProjectCardProps) {
  const live = project.links.find((l) => l.kind === "live");
  const repo = project.links.find((l) => l.kind === "repo");
  const extra = Math.max(0, project.stack.length - MAX_STACK);
  const stack = project.stack.slice(0, MAX_STACK);

  return (
    <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-card p-6 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      />

      <header className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {project.context}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
        </div>
        <Badge tone="primary">{project.role}</Badge>
      </header>

      <p className="relative text-sm leading-relaxed text-foreground/80">
        {project.tagline}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <Badge key={s} tone="neutral">
            {s}
          </Badge>
        ))}
        {extra > 0 && (
          <Badge tone="neutral" className="text-muted">
            +{extra} more
          </Badge>
        )}
      </div>

      <footer className="relative mt-auto flex flex-wrap items-center gap-3 pt-2">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label={`Read the full case study for ${project.name}`}
        >
          Read case study
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
        {live && !live.isPlaceholder && (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            Live demo
          </a>
        )}
        {repo && !repo.isPlaceholder && (
          <a
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <GitHubIcon className="h-4 w-4" />
            Code
          </a>
        )}
      </footer>
    </article>
  );
}
