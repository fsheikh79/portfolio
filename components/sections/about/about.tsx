import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { about } from "@/lib/data";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={about.headline}
      description="A short story of how a software engineer became a cloud & DevOps engineer — without giving up either identity."
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-balance">
              {p}
            </p>
          ))}
        </div>

        <Card
          variant="glass"
          className="flex flex-col justify-between gap-6"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              At a glance
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">
              Snapshot
            </h3>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {about.highlights.map((h) => (
              <li
                key={h.label}
                className="rounded-xl border border-[color:var(--color-border)] bg-background/40 p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {h.label}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {h.value}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            Prefer numbers? See{" "}
            <a href="#skills" className="text-primary hover:underline">
              Skills
            </a>{" "}
            for the toolset and{" "}
            <a href="#experience" className="text-primary hover:underline">
              Experience
            </a>{" "}
            for the timeline.
          </p>
        </Card>
      </div>
    </Section>
  );
}
