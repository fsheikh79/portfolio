import { Section } from "@/components/ui/section";
import { TerminalWidget } from "./terminal-widget";

export function Terminal() {
  return (
    <Section
      id="terminal"
      eyebrow="Try it"
      title="Explore via terminal"
      description="Real commands, real data. Try whoami, skills, projects, contact, or type help."
      containerSize="md"
    >
      <TerminalWidget />
    </Section>
  );
}
