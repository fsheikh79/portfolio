import type {
  AboutSection,
  Certification,
  EducationItem,
  ExperienceItem,
  PhilosophyPrinciple,
  Profile,
  Project,
  SkillCategory,
} from "@/types";

export const profile: Profile = {
  name: "Faizan Sheikh",
  title: "Cloud & DevOps Engineer",
  roles: [
    "Cloud Engineer",
    "DevOps Engineer",
    "Infrastructure Automation Engineer",
    "AWS Builder",
    "Software Engineer",
  ],
  intro:
    "Cloud & DevOps Engineer with a software engineering background, passionate about designing secure, scalable, and automated cloud solutions. Experienced building production-style AWS infrastructure using Terraform, Docker, CI/CD pipelines, and serverless technologies. Focused on Infrastructure as Code, cloud-native architectures, observability, and continuous improvement.",
  status: "Open to Full-Time Opportunities & Internships",
  location: "Toronto, Ontario, Canada",
  email: "Fsheikh7799@gmail.com",
  phone: "+1 (437) 422-0822",
  avatar: "/avatar.png",
  resume: "/resume.pdf",
  socials: [
    {
      platform: "github",
      label: "GitHub",
      value: "fsheikh79",
      href: "https://github.com/fsheikh79",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      value: "faizan-sheikh15",
      href: "https://linkedin.com/in/faizan-sheikh15",
    },
    {
      platform: "email",
      label: "Email",
      value: "Fsheikh7799@gmail.com",
      href: "mailto:Fsheikh7799@gmail.com",
    },
    {
      platform: "phone",
      label: "Phone",
      value: "+1 (437) 422-0822",
      href: "tel:+14374220822",
    },
    {
      platform: "location",
      label: "Location",
      value: "Toronto, Ontario, Canada",
      href: "https://maps.google.com/?q=Toronto,Ontario,Canada",
    },
    {
      platform: "resume",
      label: "Resume",
      value: "resume.pdf",
      href: "/resume.pdf",
    },
  ],
};

export const about: AboutSection = {
  headline: "From shipping features to shipping infrastructure.",
  paragraphs: [
    "I started as a software engineer building React and Node applications at product studios, learning what it takes to move code from a laptop to real users without breaking on Monday morning. The more I shipped, the more I gravitated toward the systems underneath — the CI pipelines, the containers, the cloud accounts, the alarms that page at 3 a.m.",
    "Today I focus on cloud and DevOps engineering: designing AWS environments with Terraform, wiring up GitHub Actions pipelines, packaging services with Docker, and running workloads on Lambda, ECS, and EKS. Software engineering is still my foundation — I write the tooling, the Lambdas, and the Kubernetes controllers I depend on, and I care about clean APIs, tests, and readable code as much as clean architecture diagrams.",
    "I believe the best infrastructure is boring: automated, observable, secure by default, and cheap enough to run without thinking. I'm currently at Seneca Polytechnic sharpening cloud architecture skills, working toward AWS Solutions Architect Associate, and building production-style projects that mirror how real teams operate.",
  ],
  highlights: [
    { label: "Based in", value: "Toronto, ON" },
    { label: "Primary cloud", value: "AWS" },
    { label: "IaC of choice", value: "Terraform" },
    { label: "Status", value: "Open to opportunities" },
  ],
};

export const philosophy: PhilosophyPrinciple[] = [
  {
    title: "Automate repetitive work",
    description:
      "If I do it twice, I script it. If I script it, I put it in a pipeline. Humans should make decisions, not run runbooks.",
    icon: "Workflow",
  },
  {
    title: "Infrastructure as Code first",
    description:
      "Every environment is a Terraform module. Clicks in the console are for exploration; production changes ship through pull requests.",
    icon: "FileCode",
  },
  {
    title: "Security by design",
    description:
      "Threat model at design time. Encrypt in transit and at rest. Secrets live in Secrets Manager, never in repos or laptops.",
    icon: "ShieldCheck",
  },
  {
    title: "Least-privilege access",
    description:
      "Scope IAM roles narrowly, prefer short-lived credentials, and audit access regularly. Default deny, opt in on purpose.",
    icon: "KeyRound",
  },
  {
    title: "Observability before optimization",
    description:
      "You cannot fix what you cannot see. Logs, metrics, traces, and dashboards go in on day one — tuning comes after.",
    icon: "Activity",
  },
  {
    title: "Simple, maintainable architectures",
    description:
      "Boring beats clever. Fewer moving parts, well-understood services, and clear boundaries win over the long run.",
    icon: "Boxes",
  },
  {
    title: "Documentation matters",
    description:
      "READMEs, architecture diagrams, and runbooks are part of the deliverable. Future me is a teammate too.",
    icon: "BookOpen",
  },
  {
    title: "Continuous improvement",
    description:
      "Every incident is a lesson. Every retro produces an action item. Every quarter something gets simpler.",
    icon: "TrendingUp",
  },
];

export const skills: SkillCategory[] = [
  {
    key: "cloud",
    title: "Cloud",
    description: "AWS-first, Azure-aware. Designing secure, cost-conscious environments.",
    icon: "Cloud",
    skills: [
      { name: "AWS", applied: "Primary cloud across all portfolio projects" },
      { name: "Azure", applied: "AZ-900 fundamentals coursework and labs" },
      { name: "IAM", applied: "Least-privilege roles for Lambdas, ECS tasks, and CI runners" },
      { name: "VPC", applied: "Multi-AZ VPCs with public/private subnets and NAT" },
      { name: "Lambda", applied: "Event-driven APIs and background jobs in serverless projects" },
      { name: "API Gateway", applied: "REST and HTTP APIs fronting Lambda backends" },
      { name: "EC2", applied: "Autoscaling groups for containerized web workloads" },
      { name: "S3", applied: "Static site hosting, uploads, and Terraform state buckets" },
      { name: "CloudFront", applied: "Global CDN in front of S3 and API Gateway origins" },
      { name: "CloudWatch", applied: "Logs, metrics, alarms, and dashboards across services" },
      { name: "RDS", applied: "PostgreSQL for relational workloads in AceMyCareer" },
      { name: "DynamoDB", applied: "NoSQL data model for the serverless e-commerce platform" },
      { name: "SQS", applied: "Queue-based decoupling between resume ingestion and processing" },
      { name: "Secrets Manager", applied: "Rotating credentials and third-party API keys" },
      { name: "Cognito", applied: "User pools and JWT-based auth in the storefront" },
    ],
  },
  {
    key: "devops",
    title: "DevOps",
    description: "Automation, containers, and pipelines that ship safely.",
    icon: "Wrench",
    skills: [
      { name: "Terraform", applied: "Modules for VPC, IAM, ECS/EKS, and serverless stacks" },
      { name: "Docker", applied: "Multi-stage builds for Node, Python, and Next.js services" },
      { name: "GitHub Actions", applied: "CI/CD pipelines: lint, test, plan, apply, deploy" },
      { name: "CI/CD", applied: "Branch-based promotion from dev to prod-style environments" },
      { name: "ECS", applied: "Fargate services with ALB and blue/green style deploys" },
      { name: "ECR", applied: "Private image registry integrated with GitHub Actions" },
      { name: "Kubernetes / EKS", applied: "Manifests and controllers for AceMyCareer workloads" },
      { name: "Linux", applied: "Daily driver for scripting, containers, and shell tooling" },
      { name: "Automation", applied: "Python and Bash scripts for provisioning and cleanup" },
      { name: "Monitoring", applied: "CloudWatch dashboards and alarms for API and queue health" },
    ],
  },
  {
    key: "programming",
    title: "Programming",
    description: "Comfortable across scripting, backend, and infra languages.",
    icon: "Code2",
    skills: [
      { name: "Python", applied: "Lambdas, data processing, and automation scripts" },
      { name: "JavaScript", applied: "Node.js services and browser code" },
      { name: "TypeScript", applied: "Preferred for Next.js apps and shared types" },
      { name: "Node.js", applied: "Express APIs and serverless handlers" },
      { name: "PowerShell", applied: "Windows automation during earlier engineering roles" },
      { name: "Bash", applied: "CI scripts, container entrypoints, and infra tooling" },
      { name: "SQL", applied: "Schema design and queries against PostgreSQL and MySQL" },
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    description: "Product-quality UI when the project needs one.",
    icon: "LayoutTemplate",
    skills: [
      { name: "React", applied: "Component libraries and product UIs since 2022" },
      { name: "Next.js", applied: "App Router, server components, and edge-friendly routing" },
      { name: "Tailwind CSS", applied: "Design systems and rapid UI iteration" },
      { name: "REST", applied: "Client integrations against API Gateway and Express backends" },
      { name: "GraphQL", applied: "Schema-first APIs consumed from React clients" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    description: "APIs, auth, and the plumbing behind reliable services.",
    icon: "Server",
    skills: [
      { name: "Express.js", applied: "REST APIs for e-commerce and internal tools" },
      { name: "Serverless", applied: "Lambda + API Gateway architectures with Terraform" },
      { name: "Authentication", applied: "Cognito user pools and JWT-based session flows" },
      { name: "Observability", applied: "Structured logging, metrics, and traces" },
    ],
  },
  {
    key: "databases",
    title: "Databases",
    description: "Relational and NoSQL, chosen to fit the workload.",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", applied: "Primary relational store on RDS for AceMyCareer" },
      { name: "MySQL", applied: "Backing store for earlier e-commerce integrations" },
      { name: "DynamoDB", applied: "Single-table design for the serverless storefront" },
      { name: "MongoDB", applied: "Document store for prototype and coursework projects" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "serverless-ecommerce",
    name: "Serverless E-Commerce Platform",
    tagline: "A fully serverless storefront on AWS, provisioned end-to-end with Terraform.",
    role: "Team of 2 — Cloud + Backend",
    context: "Seneca Polytechnic capstone",
    summary:
      "A production-style storefront built entirely on AWS serverless primitives. Users browse a catalog served from CloudFront + S3, sign in with Cognito, place orders through API Gateway + Lambda, persist data in DynamoDB, and check out with Stripe. Every resource ships through Terraform and every change ships through GitHub Actions.",
    stack: [
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "Cognito",
      "S3",
      "CloudFront",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "Stripe",
    ],
    highlights: [
      "Zero long-running servers — everything runs on Lambda + managed AWS services.",
      "Single-table DynamoDB design for products, carts, and orders.",
      "Cognito user pools with hosted UI and JWT-based API authorization.",
      "Terraform modules for VPC-less serverless stacks, IAM roles, and CDN.",
      "GitHub Actions pipeline: lint → test → terraform plan → apply → deploy.",
    ],
    challenges: [
      {
        challenge: "Keeping the storefront cheap while still feeling instant globally.",
        solution:
          "Static assets and product pages served from S3 through CloudFront with long-lived cache headers and cache invalidation on deploy.",
      },
      {
        challenge: "Avoiding a tangle of IAM policies as we added Lambdas.",
        solution:
          "One Terraform module per service that emits its own least-privilege role, so permissions live next to the code that needs them.",
      },
      {
        challenge: "Handling Stripe webhooks reliably without a persistent server.",
        solution:
          "Dedicated webhook Lambda behind API Gateway with idempotency keys stored in DynamoDB and CloudWatch alarms on failure rate.",
      },
    ],
    decisions: [
      "Chose DynamoDB over RDS to stay fully serverless and avoid VPC/NAT costs.",
      "Used Terraform (not CDK) to keep the infra portable and reviewable in plain HCL.",
      "Adopted trunk-based development with short-lived branches and PR previews.",
    ],
    security: [
      "Cognito-issued JWTs required for all write endpoints via API Gateway authorizers.",
      "Least-privilege IAM per Lambda; no wildcard permissions.",
      "Secrets (Stripe keys, JWT signing keys) stored in AWS Secrets Manager.",
      "S3 buckets private by default; public read only through the CloudFront OAC.",
    ],
    cicd: [
      "GitHub Actions triggers on push and PR.",
      "Pipeline runs ESLint, unit tests, and terraform fmt/validate.",
      "terraform plan posted as a PR comment for review.",
      "On merge to main: terraform apply, Lambda deploy, CloudFront invalidation.",
    ],
    lessons: [
      "Serverless is cheap when idle but you pay in cold starts — measure p95, not just p50.",
      "A good CI pipeline is a design tool: it forces you to name every environment.",
      "Terraform state is production data. Back it up and lock it (S3 + DynamoDB).",
    ],
    future: [
      "Add step functions for the order fulfillment saga.",
      "Introduce OpenTelemetry traces across Lambda + API Gateway.",
      "Add a Playwright end-to-end suite that runs against a preview environment.",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://dsz01lr4ij9ww.cloudfront.net/",
        kind: "live",
      },
      {
        label: "GitHub",
        href: "https://github.com/fsheikh79",
        kind: "repo",
        isPlaceholder: true,
      },
    ],
    featured: true,
  },
  {
    slug: "acemycareer",
    name: "AceMyCareer",
    tagline: "A container-native career coaching platform on AWS ECS, EKS, and RDS.",
    role: "Solo — Cloud, Backend, and Frontend",
    context: "George Brown College capstone",
    summary:
      "A résumé-aware career platform: candidates upload a résumé, AWS Textract extracts structure, a Python service scores it against a target role, and the results are surfaced through a Next.js UI. The workload runs on ECS Fargate for the API, EKS for the analysis workers, RDS PostgreSQL for user data, and SQS to decouple ingestion from processing.",
    stack: [
      "AWS ECS",
      "EKS",
      "ECR",
      "Lambda",
      "SQS",
      "RDS PostgreSQL",
      "Textract",
      "Next.js",
      "Python",
      "Docker",
    ],
    highlights: [
      "Résumé ingestion Lambda drops jobs onto SQS; Python workers on EKS pick them up.",
      "ECS Fargate serves the customer-facing API behind an ALB.",
      "Terraform provisions VPC, ECS/EKS clusters, RDS, and ECR from scratch.",
      "Textract handles PDF and image résumés without managing an OCR stack.",
      "Next.js frontend deployed as a container, running side-by-side with the API.",
    ],
    challenges: [
      {
        challenge: "Balancing ECS vs. EKS for two very different workloads.",
        solution:
          "Kept the customer API on ECS Fargate for simplicity, and used EKS for the CPU-heavy scoring workers where finer-grained scheduling paid off.",
      },
      {
        challenge: "Textract calls were slow and bursty enough to time out the API.",
        solution:
          "Moved ingestion behind SQS. The API returns immediately; workers process on their own schedule and update the DB when done.",
      },
      {
        challenge: "Keeping RDS credentials out of container images.",
        solution:
          "Task and pod definitions read credentials from Secrets Manager at start-up; nothing sensitive lives in the image.",
      },
    ],
    decisions: [
      "Split ingestion and processing so a slow OCR call cannot break the request path.",
      "Chose RDS PostgreSQL over DynamoDB because the data is relational and query-heavy.",
      "Standardized on Docker multi-stage builds for every service.",
    ],
    security: [
      "Private subnets for all compute and RDS; no direct public access.",
      "IAM roles for service accounts (IRSA) on EKS for scoped AWS access.",
      "S3 buckets for résumé uploads are encrypted and lifecycle-expired.",
      "All ingress terminates at an ALB with TLS from ACM.",
    ],
    cicd: [
      "GitHub Actions builds Docker images and pushes to ECR on merge.",
      "Terraform plan/apply for infra changes gated behind PR review.",
      "ECS service updates roll out with health-check-based deploys.",
      "EKS workers updated with kubectl set image and monitored via CloudWatch Container Insights.",
    ],
    lessons: [
      "You do not need Kubernetes to be serious. Use ECS unless you know why EKS earns its keep.",
      "Async ingestion is a huge reliability win — worth the extra queue.",
      "One Terraform repo per environment scales badly; workspaces + modules scale much better.",
    ],
    future: [
      "Add HPA on EKS workers based on SQS queue depth.",
      "Introduce Karpenter for smarter node autoscaling.",
      "Wire OpenTelemetry across the API, workers, and Postgres.",
    ],
    links: [
      {
        label: "Live Demo",
        href: "#",
        kind: "live",
        isPlaceholder: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/fsheikh79",
        kind: "repo",
        isPlaceholder: true,
      },
    ],
    featured: true,
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Meetanshi e-commerce Excellence",
    role: "Junior React.js Developer",
    period: "May 2023 – Aug 2023",
    summary:
      "Built and maintained React interfaces for Magento-backed e-commerce clients, focused on performance, accessibility, and integration with server-rendered pages.",
    highlights: [
      "Shipped reusable React components used across multiple client storefronts.",
      "Improved page performance with code splitting, lazy loading, and image optimization.",
      "Collaborated closely with backend and Magento developers on API contracts.",
    ],
    stack: ["React", "TypeScript", "REST APIs", "Magento", "SCSS"],
  },
  {
    company: "Intuz Solutions Pvt. Ltd.",
    role: "Junior Software Engineer",
    period: "Dec 2022 – Apr 2023",
    summary:
      "Delivered features across React and Node.js products, owning UI implementation and backing API endpoints for client projects.",
    highlights: [
      "Implemented dashboards and forms with React, React Hook Form, and Redux.",
      "Built and tested Node/Express endpoints backing internal client tools.",
      "Participated in code review and pairing with senior engineers.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    company: "Intuz Solutions Pvt. Ltd.",
    role: "Trainee Software Engineer",
    period: "Jun 2022 – Nov 2022",
    summary:
      "Structured training program covering JavaScript, React, Node.js, and Git workflows, followed by contribution to real client codebases under mentorship.",
    highlights: [
      "Completed intensive JavaScript, React, and Node.js curriculum.",
      "Contributed bug fixes and small features to production client projects.",
      "Learned Git workflows, code review culture, and Agile practices.",
    ],
    stack: ["JavaScript", "React", "Node.js", "Git", "MongoDB"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Seneca Polytechnic",
    program: "Cloud Administration & Architecture",
    period: "Currently Enrolled",
    status: "in-progress",
    highlights: [
      "Advanced AWS architecture, networking, and security.",
      "Multi-cloud administration and hybrid deployments.",
    ],
  },
  {
    institution: "George Brown College",
    program: "Cloud Computing",
    period: "Completed",
    score: "GPA 4.0 / 5.0",
    status: "completed",
    highlights: [
      "AWS core services, DevOps, and containers.",
      "Capstone: AceMyCareer on ECS, EKS, and RDS.",
    ],
  },
  {
    institution: "Gujarat Technological University",
    program: "B.E. Information Technology",
    period: "Completed",
    score: "CGPA 8.0 / 10.0",
    status: "completed",
    highlights: [
      "Data structures, algorithms, databases, and software engineering.",
      "Full-stack web development coursework and projects.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    status: "in-progress",
    notes: "Actively studying — targeting completion this term.",
  },
  {
    name: "AWS Developer Associate",
    issuer: "Amazon Web Services",
    status: "planned",
    notes: "Planned follow-up after Solutions Architect Associate.",
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    status: "planned",
    notes: "Planned to broaden multi-cloud fundamentals.",
  },
];

export const githubFallback = {
  login: "fsheikh79",
  name: "Faizan Sheikh",
  avatar_url: "https://avatars.githubusercontent.com/u/108453820?v=4",
  html_url: "https://github.com/fsheikh79",
  bio: "Cloud & DevOps Engineer — AWS, Terraform, Docker, CI/CD.",
  followers: 0,
  public_repos: 0,
  location: "Toronto, Ontario, Canada",
  updated_at: new Date().toISOString(),
} as const;
