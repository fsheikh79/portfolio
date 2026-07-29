import { Hero } from "@/components/sections/hero/hero";
import { About } from "@/components/sections/about/about";
import { Philosophy } from "@/components/sections/philosophy/philosophy";
import { Skills } from "@/components/sections/skills/skills";
import { Experience } from "@/components/sections/experience/experience";
import { Education } from "@/components/sections/education/education";
import { Certifications } from "@/components/sections/certifications/certifications";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Philosophy />
      <Skills />
      <Experience />
      <Education />
      <Certifications />

      <Section
        id="projects"
        eyebrow="Projects"
        title="Featured projects placeholder"
        description="Featured projects and detail pages arrive in Milestone 5."
      >
        <Card variant="glass" interactive className="max-w-3xl">
          <p className="text-sm text-foreground/80">
            Placeholder — Serverless E-Commerce and AceMyCareer will land here
            with dedicated detail pages next.
          </p>
        </Card>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Contact placeholder"
        description="Contact form (Zod + RHF) and copy-to-clipboard actions arrive in Milestone 8."
      >
        <Card variant="glass" interactive className="max-w-3xl">
          <p className="text-sm text-foreground/80">
            Placeholder — real form + graceful mailto fallback ships in
            Milestone 8.
          </p>
        </Card>
      </Section>
    </main>
  );
}
