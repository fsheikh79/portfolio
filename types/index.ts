export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "phone"
  | "location"
  | "resume";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  value: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  roles: string[];
  intro: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  resume: string;
  socials: SocialLink[];
}

export interface AboutSection {
  headline: string;
  paragraphs: string[];
  highlights: { label: string; value: string }[];
}

export interface PhilosophyPrinciple {
  title: string;
  description: string;
  icon: string;
}

export type SkillCategoryKey =
  | "cloud"
  | "devops"
  | "programming"
  | "frontend"
  | "backend"
  | "databases";

export interface Skill {
  name: string;
  applied: string;
}

export interface SkillCategory {
  key: SkillCategoryKey;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "repo";
  isPlaceholder?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  context: string;
  summary: string;
  stack: string[];
  highlights: string[];
  challenges: { challenge: string; solution: string }[];
  decisions: string[];
  security: string[];
  cicd: string[];
  lessons: string[];
  future: string[];
  links: ProjectLink[];
  featured: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface EducationItem {
  institution: string;
  program: string;
  period: string;
  score?: string;
  status: "in-progress" | "completed";
  highlights?: string[];
}

export type CertificationStatus = "in-progress" | "planned" | "completed";

export interface Certification {
  name: string;
  issuer: string;
  status: CertificationStatus;
  notes?: string;
}

export interface NavItem {
  label: string;
  href: string;
  section: string;
}
