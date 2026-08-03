import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { getIcon } from "@/components/icons/icon-map";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolset"
      title="Skills, and where I actually used them"
      description="Every skill below is annotated with a real project, role, or coursework context — no vanity chips."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((category) => {
          const Icon = getIcon(category.icon);
          return (
            <Card
              key={category.key}
              variant="solid"
              className="flex flex-col gap-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/20">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted">{category.description}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {category.skills.length}
                </span>
              </div>

              <ul className="flex flex-col divide-y divide-[color:var(--color-border)]">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-baseline gap-4 py-2.5 text-sm"
                  >
                    <span className="font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted">{skill.applied}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
