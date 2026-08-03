import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { SITE } from "@/lib/constants";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };
  const projectPages = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [home, ...projectPages];
}
