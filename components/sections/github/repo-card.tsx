import { GitFork, Star } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";
import { languageColor, relativeTimeFrom } from "@/lib/github";
import { Badge } from "@/components/ui/badge";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${repo.full_name} on GitHub`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-card p-5 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground group-hover:text-primary">
            {repo.name}
          </p>
          <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {repo.full_name}
          </p>
        </div>
      </header>

      <p className="line-clamp-3 min-h-[3.2em] text-sm leading-relaxed text-muted">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      )}

      <footer className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-xs text-muted">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3" strokeWidth={2} />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3 w-3" strokeWidth={2} />
            {repo.forks_count}
          </span>
        )}
        <span className="ml-auto">Updated {relativeTimeFrom(repo.pushed_at)}</span>
      </footer>
    </a>
  );
}
