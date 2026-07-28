import type { NavItem } from "@/types";

export const SITE = {
  name: "Faizan Sheikh",
  shortName: "Faizan Sheikh",
  title: "Faizan Sheikh — Cloud & DevOps Engineer",
  description:
    "Cloud & DevOps Engineer with a software engineering background. AWS, Terraform, Docker, CI/CD, serverless, and Infrastructure as Code.",
  url: "https://faizansheikh.dev",
  locale: "en_CA",
  keywords: [
    "Faizan Sheikh",
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS",
    "Terraform",
    "Infrastructure as Code",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Serverless",
    "Toronto",
    "Portfolio",
  ],
  author: "Faizan Sheikh",
  themeColor: "#09090B",
} as const;

export const COLORS = {
  background: "#09090B",
  surface: "#111827",
  card: "#161B22",
  primary: "#22D3EE",
  secondary: "#8B5CF6",
  highlight: "#C026D3",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#hero", section: "hero" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Philosophy", href: "/#philosophy", section: "philosophy" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Education", href: "/#education", section: "education" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export const LOADING_STEPS = [
  "Initializing Cloud Infrastructure...",
  "Initializing Services...",
  "Provisioning Resources...",
  "Connecting to AWS...",
  "Loading Infrastructure...",
  "Portfolio Ready",
] as const;

export const KEYBOARD_SHORTCUTS = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["G", "H"], description: "Go home" },
  { keys: ["G", "P"], description: "Go to projects" },
  { keys: ["G", "C"], description: "Go to contact" },
  { keys: ["T"], description: "Toggle theme" },
  { keys: ["?"], description: "Show shortcuts" },
] as const;
