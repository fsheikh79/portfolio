import { Section } from "@/components/ui/section";
import { experience } from "@/lib/data";
import { ExperienceCard } from "./experience-card";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I&apos;ve shipped"
      description="Reverse-chronological. Tap any role to expand highlights and stack."
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent sm:left-4"
        />
        <div className="flex flex-col gap-6">
          {experience.map((item, i) => (
            <ExperienceCard
              key={`${item.company}-${item.period}`}
              item={item}
              index={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
