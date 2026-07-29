import { Boxes, Network } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ArchitecturePlaceholderProps {
  project: Project;
}

const GROUPS = [
  {
    label: "Edge / Delivery",
    keywords: ["CloudFront", "S3", "API Gateway", "ALB", "Route 53"],
  },
  {
    label: "Compute",
    keywords: [
      "Lambda",
      "ECS",
      "EKS",
      "ECR",
      "EC2",
      "Fargate",
      "Node.js",
      "Python",
      "Next.js",
    ],
  },
  {
    label: "Data",
    keywords: [
      "DynamoDB",
      "RDS",
      "RDS PostgreSQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "S3 (data)",
      "Textract",
    ],
  },
  {
    label: "Identity & Secrets",
    keywords: ["Cognito", "IAM", "Secrets Manager"],
  },
  {
    label: "Messaging",
    keywords: ["SQS", "SNS", "EventBridge"],
  },
  {
    label: "Delivery & Ops",
    keywords: [
      "Terraform",
      "Docker",
      "GitHub Actions",
      "CloudWatch",
      "Stripe",
    ],
  },
] as const;

interface Bucket {
  label: string;
  items: string[];
}

function bucket(stack: string[]): Bucket[] {
  const seen = new Set<string>();
  const groups: Bucket[] = GROUPS.map((g) => {
    const items = stack.filter((s) => {
      if (seen.has(s)) return false;
      const hit = g.keywords.some((k) => k.toLowerCase() === s.toLowerCase());
      if (hit) seen.add(s);
      return hit;
    });
    return { label: g.label, items };
  }).filter((g) => g.items.length > 0);

  const leftovers = stack.filter((s) => !seen.has(s));
  if (leftovers.length > 0) {
    groups.push({ label: "Other", items: leftovers });
  }
  return groups;
}

export function ArchitecturePlaceholder({
  project,
}: ArchitecturePlaceholderProps) {
  const groups = bucket(project.stack);
  const filename = `/projects/${project.slug}-architecture.svg`;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-dashed border-[color:var(--color-border)] bg-card/60 p-6 shadow-[var(--shadow-elevated)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
            <Network className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              Architecture at a glance
            </h3>
            <p className="text-[11px] text-muted">
              Grouped view of the stack while the real diagram is prepared
            </p>
          </div>
        </div>
        <Badge tone="neutral">
          <Boxes className="h-3 w-3" strokeWidth={2} />
          Placeholder
        </Badge>
      </div>

      <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-[color:var(--color-border)] bg-background/40 p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {group.label}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge tone="neutral">{item}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <figcaption className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-[color:var(--color-border)] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>Diagram placeholder · drop</span>
        <code className="rounded bg-foreground/5 px-1.5 py-0.5 normal-case text-foreground/80">
          public{filename}
        </code>
        <span>to replace</span>
      </figcaption>
    </figure>
  );
}
