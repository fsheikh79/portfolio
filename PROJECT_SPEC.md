MASTER SPEC — World-Class 3D Portfolio for Faizan Sheikh (2026)
BUILD APPROACH (READ FIRST)
Build this milestone by milestone, not all at once. After each milestone, run `npm run build` and `npm run dev`, confirm zero TypeScript errors, zero console warnings, and that the dev server renders correctly before starting the next. Do not proceed past a broken milestone.
Milestones, in order:

1. Foundation — Next.js + Tailwind v4 + TypeScript + folder structure + lib/data.ts → verify it runs
2. Design system + layout — nav, footer, theme toggle, tokens → verify
3. Loading screen + Hero → verify
4. Content sections — About, Engineering Philosophy, Skills, Experience, Education, Certifications → verify
5. Projects list + project detail pages → verify
6. 3D scene (lazy-loaded, R3F) → verify performance holds
7. GitHub dashboard + interactive terminal + command palette → verify graceful fallbacks
8. Contact + SEO + 404 + accessibility + Lighthouse audit → final verification

CRITICAL BUILD GUARDRAILS

* In app/globals.css, both @import statements MUST be at the very top — Tailwind first, then Google Fonts. Nothing may precede them (CSS parse rule).
* All content must be visible by default. Scroll-reveal animations must only enhance; if JavaScript is slow or an observer fails, content must never remain hidden (opacity: 0). Use a JS-ready class pattern plus a fallback timer.
* Every fragile/external feature must fail gracefully — if the GitHub API is rate-limited or down, show cached/static fallback data, never a broken section or error.
* No hydration mismatches. No layout shift. Test on a fresh build each milestone.

ROLE
Act as an award-winning Senior Frontend Engineer, Staff Software Engineer, UI/UX Designer, Creative Director, and Solutions Architect. Build a production-ready portfolio showcasing Faizan Sheikh as a Cloud & DevOps Engineer with a strong Software Engineering background. It must NOT look like a generic template or AI-generated site. It should impress engineering managers at AWS, Microsoft, Google, Shopify, Stripe, Cloudflare, Datadog, and HashiCorp. Tell the story: Software Engineer → Cloud Computing → Cloud & DevOps Engineer.
PRIMARY OBJECTIVE
A premium portfolio that feels like a modern cloud infrastructure command center (SaaS + AWS Console + Stripe + Vercel + Raycast), not a flashy animation showcase or gaming site. Professional, trustworthy, modern, cloud-native, production-ready. Animations support content, never distract.
TECH STACK (MANDATORY, latest stable)
Next.js (App Router), React, TypeScript (strict), Tailwind CSS v4, React Three Fiber, Three.js, Motion, next-themes, React Hook Form, Zod, Lucide React, next/image, next/font, Vercel Analytics (optional/easily enabled). Deploy-ready for Vercel. No CRA/Vite. Server Components by default; Client Components only where interactivity is required.
ENGINEERING STANDARDS
Clean architecture, SOLID where applicable, strict TypeScript, ESLint, Prettier, modular reusable components, no duplicated code, no inline styles unless necessary, semantic HTML, accessible components, fully responsive, WCAG AA, keyboard navigation, ARIA labels, focus management, loading states, error boundaries, graceful degradation, reduced-motion support, optimized images, dynamic imports, lazy-loaded 3D, code splitting, zero hydration issues, zero console warnings, zero TypeScript errors. Lighthouse targets: Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
PROJECT STRUCTURE
/app, /components, /components/ui, /components/layout, /components/sections, /components/3d, /components/animations, /components/icons, /components/charts, /hooks, /lib, /lib/data.ts, /lib/constants.ts, /utils, /types, /public, /styles, /content, README.md, .env.example. All editable portfolio content lives in lib/data.ts. No hardcoded content inside components.
DESIGN SYSTEM
Theme: Cloud Infrastructure Command Center. Not a gaming site; avoid excessive cyberpunk glow. Subtle glassmorphism, soft shadows, rounded corners, premium micro-interactions, large headings, excellent spacing, readable hierarchy. Colors: Background #09090B, Surface #111827, Card #161B22, Primary Accent #22D3EE, Secondary Accent #8B5CF6, Highlight #C026D3, Success #10B981, Warning #F59E0B, Error #EF4444.
NAVIGATION
Desktop: sticky glass nav. Mobile: drawer menu. Features: active-section highlight, smooth scrolling, scroll progress bar, back-to-top, keyboard shortcuts, Command Palette (Ctrl/Cmd+K).
3D EXPERIENCE (lazy-loaded, must not reduce performance)
Desktop cloud-infrastructure scene: floating cloud nodes, network connections, data packets, AWS-inspired service nodes, Terraform cube, Docker whale, GitHub icon, Kubernetes wheel, Linux, Python. Everything floats slowly, rotates gently, reacts subtly to cursor, bloom used sparingly, target 60 FPS. Mobile: automatically simplify or disable heavy effects. Lazy-load the 3D scene with a dynamic import and a lightweight fallback.
LOADING EXPERIENCE (1.5–2s max)
"Initializing Cloud Infrastructure..." → Initializing Services... → Provisioning Resources... → Connecting to AWS... → Loading Infrastructure... → Portfolio Ready → fade into Hero.
HERO
Avatar at /public/avatar.png; if unavailable, generate a clean geometric placeholder with a visible note explaining how to replace it. Name: Faizan Sheikh. Title: Cloud & DevOps Engineer. Animated role rotation: Cloud Engineer, DevOps Engineer, Infrastructure Automation Engineer, AWS Builder, Software Engineer. Intro: "Cloud & DevOps Engineer with a software engineering background, passionate about designing secure, scalable, and automated cloud solutions. Experienced building production-style AWS infrastructure using Terraform, Docker, CI/CD pipelines, and serverless technologies. Focused on Infrastructure as Code, cloud-native architectures, observability, and continuous improvement." Status badge: Open to Full-Time Opportunities & Internships. Buttons: View Projects, Download Resume. Social: GitHub https://github.com/fsheikh79 · LinkedIn https://linkedin.com/in/faizan-sheikh15 · Email Fsheikh7799@gmail.com · Phone +1 (437) 422-0822 · Location Toronto, Ontario, Canada.
ABOUT
Compelling narrative: engineering mindset, cloud journey, DevOps philosophy, software engineering foundation, continuous learning, passion for automation, IaC, problem solving. Avoid generic AI cliches.
ENGINEERING PHILOSOPHY — "How I Build Reliable Systems"
Automate repetitive work; Infrastructure as Code first; security by design; least-privilege access; observability before optimization; simple maintainable architectures; documentation matters; continuous improvement.
SKILLS (categorized cards, each with a short where-applied note)
Cloud: AWS, Azure, IAM, VPC, Lambda, API Gateway, EC2, S3, CloudFront, CloudWatch, RDS, DynamoDB, SQS, Secrets Manager, Cognito. DevOps: Terraform, Docker, GitHub Actions, CI/CD, ECS, ECR, Kubernetes/EKS, Linux, Automation, Monitoring. Programming: Python, JavaScript, TypeScript, Node.js, PowerShell, Bash, SQL. Frontend: React, Next.js, Tailwind CSS, REST, GraphQL. Backend: Express.js, Serverless, Authentication, Observability. Databases: PostgreSQL, MySQL, DynamoDB, MongoDB.
FEATURED PROJECTS (each with a dedicated detail page)
Detail page includes: hero banner, architecture overview, tech badges, challenges, solutions, engineering decisions, security considerations, CI/CD explanation, infrastructure-diagram placeholder, lessons learned, future improvements, Live Demo button, GitHub button (easy-to-replace placeholder).

* Project 1 — Serverless E-Commerce Platform — Team of 2, Seneca Polytechnic. Live: https://dsz01lr4ij9ww.cloudfront.net/. Stack: AWS Lambda, API Gateway, DynamoDB, Cognito, S3, CloudFront, Terraform, Docker, GitHub Actions, Stripe.
* Project 2 — AceMyCareer — Solo, George Brown College. Stack: AWS ECS, EKS, ECR, Lambda, SQS, RDS PostgreSQL, Textract, Next.js, Python, Docker. Repo button = replaceable placeholder.

EXPERIENCE (animated vertical timeline, expandable cards) — reverse chronological, keep this exact order:

1. Junior React.js Developer — Meetanshi e-commerce Excellence — May 2023 – Aug 2023
2. Junior Software Engineer — Intuz Solutions Pvt. Ltd. — Dec 2022 – Apr 2023
3. Trainee Software Engineer — Intuz Solutions Pvt. Ltd. — Jun 2022 – Nov 2022

EDUCATION (premium timeline cards)

* Seneca Polytechnic — Cloud Administration & Architecture — Currently Enrolled
* George Brown College — Cloud Computing — GPA 4.0/5.0
* Gujarat Technological University — B.E. Information Technology — CGPA 8.0/10.0

CERTIFICATIONS (status badges) — none completed yet

* AWS Solutions Architect Associate — In Progress
* AWS Developer Associate — Planned
* Microsoft Azure Fundamentals (AZ-900) — Planned

GITHUB (integrate API where possible — MUST fail gracefully)
Show profile, avatar, followers, repo count, pinned repos, languages, repo cards, last-updated. GitHub: https://github.com/fsheikh79. If the API is rate-limited/unavailable, fall back to static placeholder data — never show an error or broken section.
CONTACT
Email Fsheikh7799@gmail.com, Phone +1 (437) 422-0822, LinkedIn https://linkedin.com/in/faizan-sheikh15, GitHub https://github.com/fsheikh79, Resume download. Build the form so Resend can be integrated later via env var, but it must be fully functional/validated (Zod + React Hook Form) without backend config now (graceful mailto fallback or a clear "configure Resend" note in .env.example).
SEO
Metadata API, OpenGraph, Twitter Cards, robots.txt, sitemap.xml, canonical URLs, JSON-LD Person schema, dynamic page metadata, optimized social preview image.
ACCESSIBILITY
Keyboard nav, visible focus indicators, screen-reader support, ARIA labels, semantic HTML, reduced motion, high contrast, accessible forms.
PERFORMANCE
Lazy-load everything heavy, dynamic imports for 3D, optimized fonts/images, no layout shift, minimal JS, smooth scrolling.
EXTRA PROFESSIONAL FEATURES (all must degrade gracefully)
Interactive terminal (whoami, skills, projects, contact); "How I Build" workflow; GitHub dashboard; AWS architecture diagram placeholders; CI/CD pipeline visualization placeholders; resume preview page; copy email/phone buttons with toast notifications; theme toggle (Dark/Light/System); keyboard shortcuts; command palette; animated section transitions; scroll-spy nav; custom 404; custom loading screen; subtle animated network-topology background with soft aurora accents; footer: "Designed & Developed by Faizan Sheikh" + auto current year.
FINAL DELIVERABLES
Complete, production-ready Next.js project: clean architecture, fully responsive, production-quality components, detailed README (setup + deploy), .env.example, sample data in lib/data.ts, Vercel config. No lorem ipsum, no unfinished components, no TODO comments, no broken links (except clearly marked GitHub project placeholders), maintainable/scalable code. Honesty constraint: describe AWS work as "production-style" / project & capstone work — do not imply commercial production deployments.
