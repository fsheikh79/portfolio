import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { philosophy } from "@/lib/data";
import { getIcon } from "@/components/icons/icon-map";

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      eyebrow="How I Build"
      title="Engineering philosophy"
      description="Eight principles that keep systems boring, reliable, and cheap to run — even at 3 a.m."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {philosophy.map((principle, i) => {
          const Icon = getIcon(principle.icon);
          return (
            <li key={principle.title} className="h-full">
              <Card
                variant="solid"
                interactive
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
