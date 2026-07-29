import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users, BookMarked, Radio, CircleOff } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { getGitHubData, languageColor } from "@/lib/github";
import { RepoCard } from "./repo-card";

export async function GitHubDashboard() {
  const { profile, repos, source } = await getGitHubData();

  const languageSet = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    languageSet.set(repo.language, (languageSet.get(repo.language) ?? 0) + 1);
  }
  const languages = Array.from(languageSet.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => name);

  return (
    <Section
      id="github"
      eyebrow="Open Source"
      title="Live from GitHub"
      description="A pulled-in look at recent public activity. If GitHub is rate-limited, this section quietly falls back to cached data — never a broken tile."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
        <Card variant="glass" className="flex flex-col items-start gap-5">
          <div className="flex w-full items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[color:var(--color-border)] bg-background">
                <Image
                  src={profile.avatar_url}
                  alt={`GitHub avatar of ${profile.login}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  {profile.name || profile.login}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  @{profile.login}
                </p>
              </div>
            </div>
            {source === "live" ? (
              <Badge tone="success" title="Fetched from api.github.com">
                <Radio className="h-3 w-3" strokeWidth={2} />
                Live
              </Badge>
            ) : (
              <Badge tone="warning" title="Falling back to cached data">
                <CircleOff className="h-3 w-3" strokeWidth={2} />
                Cached
              </Badge>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm leading-relaxed text-muted">{profile.bio}</p>
          )}

          <div className="grid w-full grid-cols-2 gap-3">
            <div className="rounded-xl border border-[color:var(--color-border)] bg-background/40 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <Users className="mr-1 inline h-3 w-3" strokeWidth={2} />
                Followers
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {profile.followers}
              </p>
            </div>
            <div className="rounded-xl border border-[color:var(--color-border)] bg-background/40 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <BookMarked className="mr-1 inline h-3 w-3" strokeWidth={2} />
                Public repos
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {profile.public_repos}
              </p>
            </div>
          </div>

          {languages.length > 0 && (
            <div className="w-full">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Recent languages
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-background/40 px-2.5 py-1 text-xs"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: languageColor(lang) }}
                    />
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ButtonLink
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="w-full"
          >
            <GitHubIcon className="h-4 w-4" />
            Open @{profile.login}
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </ButtonLink>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              Recent repositories
            </h3>
            <Link
              href={`${profile.html_url}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-primary"
            >
              All repos ↗
            </Link>
          </div>

          {repos.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <RepoCard repo={repo} />
                </li>
              ))}
            </ul>
          ) : (
            <Card variant="outline" className="flex flex-col items-start gap-3">
              <Badge tone="warning">
                <CircleOff className="h-3 w-3" strokeWidth={2} />
                Repo list unavailable
              </Badge>
              <p className="text-sm text-muted">
                GitHub&apos;s API is unreachable or rate-limited right now. Head
                over to{" "}
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/{profile.login}
                </a>{" "}
                to see the full list.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Section>
  );
}
