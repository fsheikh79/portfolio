import { profile } from "@/lib/data";
import { NAV_ITEMS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const placeholderBlurb: Record<string, string> = {
  hero: "Full hero (avatar, animated role rotation, status badge, CTAs, socials) ships in Milestone 3.",
  about: "About narrative arrives in Milestone 4.",
  philosophy:
    "\"How I Build Reliable Systems\" principles arrive in Milestone 4.",
  skills: "Categorized skill cards arrive in Milestone 4.",
  projects: "Featured projects and detail pages arrive in Milestone 5.",
  experience: "Animated experience timeline arrives in Milestone 4.",
  education: "Education timeline arrives in Milestone 4.",
  contact: "Contact form (Zod + RHF) and copy-to-clipboard actions arrive in Milestone 8.",
};

export default function Home() {
  return (
    <main id="content">
      <section id="hero" className="scroll-mt-24 pt-4 sm:pt-10">
        <Container>
          <div className="flex flex-col items-start gap-6 py-16 sm:py-24">
            <Badge tone="primary">Milestone 2 · Design system + layout</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="text-lg text-muted sm:text-xl">{profile.title}</p>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              {profile.intro}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge tone="success">{profile.status}</Badge>
              <Badge>{profile.location}</Badge>
            </div>
          </div>
        </Container>
      </section>

      {NAV_ITEMS.filter((n) => n.section !== "hero").map((item) => (
        <Section
          key={item.section}
          id={item.section}
          eyebrow={item.label}
          title={`${item.label} section placeholder`}
          description={placeholderBlurb[item.section]}
        >
          <Card variant="glass" interactive className="max-w-3xl">
            <p className="text-sm text-foreground/80">
              This is a live placeholder so the sticky nav, scroll-spy, scroll
              progress, and back-to-top button all have a real target to bind
              to. Real content lands in the next milestones.
            </p>
          </Card>
        </Section>
      ))}
    </main>
  );
}
