import { githubFallback } from "@/lib/data";

const GITHUB_USER = "fsheikh79";
const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;
const FETCH_TIMEOUT_MS = 3500;

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics: string[];
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  source: "live" | "fallback";
  fetchedAt: string;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

function fallbackProfile(): GitHubProfile {
  return {
    login: githubFallback.login,
    name: githubFallback.name,
    avatar_url: githubFallback.avatar_url,
    html_url: githubFallback.html_url,
    bio: githubFallback.bio,
    followers: githubFallback.followers,
    following: 0,
    public_repos: githubFallback.public_repos,
    location: githubFallback.location,
    updated_at: githubFallback.updated_at,
  };
}

export async function getGitHubData(): Promise<GitHubData> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetchWithTimeout(`${API}/users/${GITHUB_USER}`),
      fetchWithTimeout(
        `${API}/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=owner`,
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API returned non-OK: profile=${profileRes.status} repos=${reposRes.status}`,
      );
    }

    const profile = (await profileRes.json()) as GitHubProfile;
    const reposRaw = (await reposRes.json()) as GitHubRepo[];

    const repos = reposRaw
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 6);

    return {
      profile,
      repos,
      source: "live",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      profile: fallbackProfile(),
      repos: [],
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    };
  }
}

const LANGUAGE_COLOR_MAP: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  HCL: "#844FBA",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Java: "#B07219",
  "C#": "#178600",
  Ruby: "#701516",
  Dockerfile: "#384D54",
  YAML: "#CB171E",
  Vue: "#41B883",
  Svelte: "#FF3E00",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#F34B7D",
};

export function languageColor(language: string | null | undefined): string {
  if (!language) return "#8B949E";
  return LANGUAGE_COLOR_MAP[language] ?? "#8B949E";
}

export function relativeTimeFrom(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years >= 1) return years === 1 ? "1 year ago" : `${years} years ago`;
  if (months >= 1) return months === 1 ? "1 month ago" : `${months} months ago`;
  if (days >= 1) return days === 1 ? "yesterday" : `${days} days ago`;
  if (hours >= 1) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  if (minutes >= 1)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  return "just now";
}
