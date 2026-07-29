import { Award, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { certifications } from "@/lib/data";
import type { CertificationStatus } from "@/types";

const STATUS_META: Record<
  CertificationStatus,
  {
    label: string;
    tone: "success" | "warning" | "primary";
    Icon: typeof Sparkles;
  }
> = {
  "in-progress": { label: "In Progress", tone: "warning", Icon: Clock },
  planned: { label: "Planned", tone: "primary", Icon: Sparkles },
  completed: { label: "Completed", tone: "success", Icon: CheckCircle2 },
};

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="On the study desk"
      description="Actively working toward AWS Solutions Architect Associate; developer + Azure fundamentals queued next."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const meta = STATUS_META[cert.status];
          const StatusIcon = meta.Icon;
          return (
            <li key={cert.name}>
              <Card
                variant="solid"
                interactive
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Award className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <Badge tone={meta.tone}>
                    <StatusIcon className="h-3 w-3" strokeWidth={2} />
                    {meta.label}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                </div>
                {cert.notes && (
                  <p className="text-sm text-muted">{cert.notes}</p>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
