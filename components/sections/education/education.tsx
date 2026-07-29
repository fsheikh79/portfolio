import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/data";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Where I studied"
      description="Formal training across cloud architecture, cloud computing, and information technology."
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-secondary/60 via-primary/40 to-transparent sm:left-4"
        />
        <ol className="flex flex-col gap-6">
          {education.map((item) => (
            <li
              key={`${item.institution}-${item.program}`}
              className="relative pl-10 sm:pl-14"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-background bg-secondary text-black shadow-[0_0_0_3px_rgba(139,92,246,0.18)] sm:left-4"
              >
                <GraduationCap className="h-4 w-4" strokeWidth={2} />
              </span>

              <article className="rounded-2xl border border-[color:var(--color-border)] bg-card p-5 shadow-[var(--shadow-elevated)] transition-colors hover:border-secondary/40">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {item.program}
                    </h3>
                    <p className="text-sm text-foreground/80">
                      {item.institution}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {item.period}
                    </span>
                    {item.score && (
                      <Badge tone="primary">{item.score}</Badge>
                    )}
                    {item.status === "in-progress" && !item.score && (
                      <Badge tone="warning">In Progress</Badge>
                    )}
                  </div>
                </div>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-secondary"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
