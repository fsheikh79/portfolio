import { NAV_ITEMS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Hero } from "@/components/sections/hero/hero";

const placeholderBlurb: Record<string, string> = {
  about: "About narrative arrives in Milestone 4.",
  philosophy:
    "\"How I Build Reliable Systems\" principles arrive in Milestone 4.",
  skills: "Categorized skill cards arrive in Milestone 4.",
  projects: "Featured projects and detail pages arrive in Milestone 5.",
  experience: "Animated experience timeline arrives in Milestone 4.",
  education: "Education timeline arrives in Milestone 4.",
  contact:
    "Contact form (Zod + RHF) and copy-to-clipboard actions arrive in Milestone 8.",
};

export default function Home() {
  return (
    <main id="content">
      <Hero />

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
              Placeholder — live target for sticky nav, scroll-spy, scroll
              progress, and back-to-top. Real content ships in the next
              milestones.
            </p>
          </Card>
        </Section>
      ))}
    </main>
  );
}
