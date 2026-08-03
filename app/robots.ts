import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
}

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
