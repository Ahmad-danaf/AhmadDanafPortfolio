import type { Project } from "./types";

// Same facts as the CV.
export const PROJECTS: readonly Project[] = [
  {
    id: "dilsever",
    title: "Dilsever",
    badge: "Live · subscription tier",
    description:
      "A Turkish-learning platform built on a hand-written morphology engine, with an English, Arabic and Russian interface, an OpenAI tutor and a Lemon Squeezy subscription tier.",
    footnote: "Solo developer, working with AI coding agents.",
    chips: ["Next.js", "TypeScript", "Firebase", "OpenAI", "Lemon Squeezy"],
    media: {
      poster: "/media/captures/dilsever.webp",
      video: "/media/captures/dilsever.webm",
      alt: "Dilsever website",
    },
    links: [{ label: "Visit site", url: "https://www.dilsever.com/" }],
  },
  {
    id: "xedown",
    title: "xedown",
    badge: "v1.0.0 · open source (MIT)",
    description:
      "A Markdown preview plugin for Linux Mint's xed editor: preview and source in the same tab, an allowlist sanitizer with a strict CSP, and 1,900+ unit tests in CI.",
    footnote: "Solo developer, working with AI coding agents.",
    chips: ["Python", "GTK 3", "WebKitGTK", "GitHub Actions"],
    media: {
      poster: "/media/captures/xedown.webp",
      video: "/media/captures/xedown.webm",
      alt: "xedown switching between preview and Markdown in xed",
    },
    links: [{ label: "View on GitHub", url: "https://github.com/Ahmad-danaf/xedown" }],
  },
  {
    id: "sheet-cell",
    title: "Sheet-Cell",
    badge: "Capstone · 100/100",
    description:
      "A Java 21 spreadsheet engine reused unchanged across a CLI, a JavaFX desktop app and a Tomcat client–server version, with a formula evaluator and topological-sort recalculation.",
    chips: ["Java 21", "JavaFX", "Tomcat"],
    mediaFallback: "JavaFX desktop app. The code and README are on GitHub.",
    links: [{ label: "Read the code", url: "https://github.com/Ahmad-danaf/Sheet-Cell" }],
  },
];
