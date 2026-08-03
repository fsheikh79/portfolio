import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
          404 · Project
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          That case study isn&apos;t here.
        </h1>
        <p className="max-w-xl text-base text-muted">
          The project you&apos;re looking for either moved or was never
          published. Head back to the projects list to see everything that
          exists.
        </p>
        <ButtonLink href="/#projects" variant="primary" size="md">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to projects
        </ButtonLink>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-primary"
        >
          or go home
        </Link>
      </div>
    </Container>
  );
}
