import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { profile } from "@/lib/data";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { LoadingScreen } from "@/components/animations/loading-screen";
import { CommandPalette } from "@/components/palette/command-palette";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE_URL }],
  creator: SITE.author,
  publisher: SITE.author,
  keywords: [...SITE.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: `@${profile.socials.find((s) => s.platform === "github")?.value ?? "fsheikh79"}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

function personJsonLd() {
  const github = profile.socials.find((s) => s.platform === "github");
  const linkedin = profile.socials.find((s) => s.platform === "linkedin");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: [github?.href, linkedin?.href].filter(Boolean),
    knowsAbout: [
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Infrastructure as Code",
      "Serverless",
      "DevOps",
    ],
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Seneca Polytechnic" },
      { "@type": "EducationalOrganization", name: "George Brown College" },
      {
        "@type": "EducationalOrganization",
        name: "Gujarat Technological University",
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-black"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <div className="flex-1 pt-20">{children}</div>
          <Footer />
          <BackToTop />
          <CommandPalette />
          <LoadingScreen />
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
