import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Boxes,
  Cloud,
  Code2,
  Database,
  FileCode,
  KeyRound,
  LayoutTemplate,
  Server,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Wrench,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  BookOpen,
  Boxes,
  Cloud,
  Code2,
  Database,
  FileCode,
  KeyRound,
  LayoutTemplate,
  Server,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Boxes;
}
