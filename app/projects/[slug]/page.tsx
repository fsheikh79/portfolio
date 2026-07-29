import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { profile } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { ProjectDetail } from "@/components/sections/projects/project-detail";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project not found", robots: { index: false } };
  }
  const canonicalPath = `/projects/${project.slug}`;
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: RouteProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.tagline,
    about: project.summary,
    keywords: project.stack.join(", "),
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    url: `${SITE_URL}/projects/${project.slug}`,
  };

  return (
    <>
      <ProjectDetail project={project} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
