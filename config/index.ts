import type { Metadata } from "next";

import { SITE } from "@/content/site";

export const siteConfig: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  keywords: [
    "Ahmad Danaf",
    "software engineer",
    "full-stack developer",
    "mobile developer",
    "Next.js",
    "React Native",
    "Django",
    "TypeScript",
    "Israel",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};
