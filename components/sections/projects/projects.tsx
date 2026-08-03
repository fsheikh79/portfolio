import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Production-style AWS builds with Terraform, Docker, and CI/CD from day one. Every project has a dedicated case study."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
