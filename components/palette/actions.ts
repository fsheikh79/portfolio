import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Boxes,
  BookOpen,
  Cloud,
  Copy,
  Download,
  ExternalLink,
  FileCode,
  FolderCode,
  GitBranch,
  GraduationCap,
  Home,
  LifeBuoy,
  Mail,
  Phone,
  Send,
  TerminalSquare,
  User,
  Workflow,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { profile, projects } from "@/lib/data";

export interface CommandAction {
  id: string;
  group: "Navigate" | "Projects" | "Contact" | "Links" | "Actions";
  label: string;
  hint?: string;
  keywords?: string;
  Icon: LucideIcon;
  perform: (ctx: CommandContext) => void | Promise<void>;
}

export interface CommandContext {
  copy: (text: string, label?: string) => Promise<void>;
  navigate: (href: string) => void;
}

const NAV_ICONS: Record<string, LucideIcon> = {
  hero: Home,
  about: User,
  philosophy: Workflow,
  skills: Cloud,
  projects: FolderCode,
  experience: FileCode,
  education: GraduationCap,
  certifications: Award,
  contact: Send,
  github: GitBranch,
  terminal: TerminalSquare,
};

const social = (platform: string) =>
  profile.socials.find((s) => s.platform === platform);

export function buildActions(): CommandAction[] {
  const actions: CommandAction[] = [];

  for (const item of NAV_ITEMS) {
    actions.push({
      id: `nav-${item.section}`,
      group: "Navigate",
      label: `Go to ${item.label}`,
      hint: item.href,
      keywords: `${item.label} ${item.section} nav`,
      Icon: NAV_ICONS[item.section] ?? ArrowRight,
      perform: ({ navigate }) => navigate(item.href),
    });
  }

  actions.push({
    id: "nav-github",
    group: "Navigate",
    label: "Go to GitHub dashboard",
    hint: "/#github",
    keywords: "github open source repos",
    Icon: GitBranch,
    perform: ({ navigate }) => navigate("/#github"),
  });
  actions.push({
    id: "nav-terminal",
    group: "Navigate",
    label: "Go to Terminal",
    hint: "/#terminal",
    keywords: "terminal cli try shell",
    Icon: TerminalSquare,
    perform: ({ navigate }) => navigate("/#terminal"),
  });

  for (const project of projects) {
    actions.push({
      id: `project-${project.slug}`,
      group: "Projects",
      label: `Open case study: ${project.name}`,
      hint: `/projects/${project.slug}`,
      keywords: `${project.name} ${project.slug} ${project.stack.join(" ")}`,
      Icon: Boxes,
      perform: ({ navigate }) => navigate(`/projects/${project.slug}`),
    });
  }

  actions.push({
    id: "contact-email-copy",
    group: "Contact",
    label: "Copy email to clipboard",
    hint: profile.email,
    keywords: "email copy contact address",
    Icon: Copy,
    perform: ({ copy }) => copy(profile.email, "Email"),
  });
  actions.push({
    id: "contact-email-open",
    group: "Contact",
    label: "Compose email",
    hint: `mailto:${profile.email}`,
    keywords: "email compose write send mail",
    Icon: Mail,
    perform: ({ navigate }) => navigate(`mailto:${profile.email}`),
  });
  actions.push({
    id: "contact-phone-copy",
    group: "Contact",
    label: "Copy phone to clipboard",
    hint: profile.phone,
    keywords: "phone copy call",
    Icon: Copy,
    perform: ({ copy }) => copy(profile.phone, "Phone"),
  });
  actions.push({
    id: "contact-phone-call",
    group: "Contact",
    label: "Call phone number",
    hint: profile.phone,
    keywords: "phone call ring",
    Icon: Phone,
    perform: ({ navigate }) =>
      navigate(`tel:${profile.phone.replace(/\s/g, "")}`),
  });

  const github = social("github");
  const linkedin = social("linkedin");
  if (github) {
    actions.push({
      id: "link-github",
      group: "Links",
      label: "Open GitHub profile",
      hint: github.href,
      keywords: "github external profile source",
      Icon: ExternalLink,
      perform: ({ navigate }) => navigate(github.href),
    });
  }
  if (linkedin) {
    actions.push({
      id: "link-linkedin",
      group: "Links",
      label: "Open LinkedIn profile",
      hint: linkedin.href,
      keywords: "linkedin external profile",
      Icon: ExternalLink,
      perform: ({ navigate }) => navigate(linkedin.href),
    });
  }

  actions.push({
    id: "action-resume",
    group: "Actions",
    label: "Download resume",
    hint: profile.resume,
    keywords: "resume cv pdf download",
    Icon: Download,
    perform: ({ navigate }) => navigate(profile.resume),
  });
  actions.push({
    id: "action-help",
    group: "Actions",
    label: "Show keyboard shortcuts",
    hint: "?",
    keywords: "help shortcuts keys",
    Icon: LifeBuoy,
    perform: ({ navigate }) => navigate("/#hero"),
  });
  actions.push({
    id: "action-docs",
    group: "Actions",
    label: "Read engineering philosophy",
    hint: "/#philosophy",
    keywords: "philosophy how build principles",
    Icon: BookOpen,
    perform: ({ navigate }) => navigate("/#philosophy"),
  });

  return actions;
}

export function filterActions(actions: CommandAction[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return actions;
  return actions.filter((a) => {
    const haystack = `${a.label} ${a.group} ${a.hint ?? ""} ${a.keywords ?? ""}`.toLowerCase();
    return haystack.includes(q);
  });
}
