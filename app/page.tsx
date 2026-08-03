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
import { Contact } from "@/components/sections/contact/contact";

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
      <Contact />
    </main>
  );
}
