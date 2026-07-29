import { Hero } from "@/components/sections/hero/hero";
import { About } from "@/components/sections/about/about";
import { Philosophy } from "@/components/sections/philosophy/philosophy";
import { Skills } from "@/components/sections/skills/skills";
import { Projects } from "@/components/sections/projects/projects";
import { Experience } from "@/components/sections/experience/experience";
import { Education } from "@/components/sections/education/education";
import { Certifications } from "@/components/sections/certifications/certifications";
import { GitHubDashboard } from "@/components/sections/github/github-dashboard";
import { Terminal } from "@/components/sections/terminal/terminal";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Philosophy />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <GitHubDashboard />
      <Terminal />

      <Section
        id="contact"
        eyebrow="Contact"
        title="Contact placeholder"
        description="Contact form (Zod + RHF) and copy-to-clipboard actions arrive in Milestone 8."
      >
        <Card variant="glass" interactive className="max-w-3xl">
          <p className="text-sm text-foreground/80">
            Placeholder — real form + graceful mailto fallback ships in
            Milestone 8. In the meantime, use{" "}
            <kbd className="rounded border border-[color:var(--color-border)] bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>{" "}
            to copy email or phone.
          </p>
        </Card>
      </Section>
    </main>
  );
}
