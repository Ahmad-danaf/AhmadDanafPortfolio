import type { Role } from "./types";

// Same facts and wording as the CV: a one-line company context, then results.
export const EXPERIENCE: readonly Role[] = [
  {
    id: "volunteen",
    org: "Volunteen",
    role: "Founding Software Engineer",
    dates: "Jan 2024 – present",
    context: "Early-stage EdTech startup that gamifies youth volunteering.",
    bullets: [
      "Designed and own the Python/Django backend, the React Native (Expo) mobile app and the AWS production environment, with full Hebrew, Arabic and English (RTL) support.",
      "Built an OpenAI task-approval pipeline with an audit trail; building the core of an AI agent that drafts tasks from mentors' plain-language requests, with a human approving every change.",
      "Cut a badge-listing endpoint's response time from 3.8 s to under 300 ms by reducing 900 database queries to 3.",
      "Built the CI/CD pipeline in GitHub Actions: every change runs the test suite, and code that passes deploys to production on AWS automatically.",
    ],
    awards: [
      "Selected for SCoTCH, the 8200 Alumni Association's social-cohesion program (1 of 9 ventures)",
      "Sharq Tank finalist",
      "4th place, Computer Science Project Exhibition, The Academic College of Tel-Aviv-Yaffo (2024)",
    ],
    chips: ["Python", "Django", "PostgreSQL", "React Native", "Expo", "AWS", "OpenAI", "GitHub Actions"],
    media: {
      poster: "/media/captures/volunteen.webp",
      alt: "Volunteen website",
    },
    links: [{ label: "Visit site", url: "https://www.volunteen.site/" }],
  },
  {
    id: "arab-ai-club",
    org: "Arab AI Club",
    role: "Software Engineer (freelance, part-time)",
    dates: "Apr 2026 – present",
    context: "Arabic AI-education platform with paid memberships.",
    bullets: [
      "Launched the platform on iOS and Android (Capacitor, Fastlane), taking both apps through App Store and Google Play review; added RevenueCat in-app subscriptions.",
      "Rebuilt the main screens (Next.js, React) in a full redesign and built personalized learning plans for subscribers.",
      "Built daily AI-personalized push notifications (Firebase, Gemini), passwordless email sign-in and a moderated content library; introduced the platform's automated tests.",
    ],
    chips: ["Next.js", "React", "TypeScript", "Firebase", "Capacitor", "Fastlane", "Gemini"],
    media: {
      poster: "/media/captures/arabaiclub.webp",
      video: "/media/captures/arabaiclub.webm",
      alt: "Arab AI Club platform",
    },
    links: [{ label: "Visit platform", url: "https://app.arabaiclub.com/" }],
  },
  {
    id: "meruba",
    org: "Meruba",
    role: "Software Engineer (freelance)",
    dates: "Dec 2025 – present",
    context: "Internal campaign tool for an Israeli digital-marketing agency.",
    bullets: [
      "Built the WhatsApp and email campaign system end to end in Next.js and TypeScript, including personalized video campaigns rendered on AWS Lambda.",
      "Designed a webhook-driven send pipeline on Firestore that avoids duplicate sends, confirms delivery and recovers stuck campaigns automatically, plus a send-rate gate that protects the agency's WhatsApp numbers.",
    ],
    chips: ["Next.js", "TypeScript", "Firestore", "Remotion", "AWS Lambda", "MUI (RTL)"],
    mediaFallback: "Internal agency tool, so there are no public screenshots.",
    links: [],
  },
];

// Smaller client work: one line under the timeline, as on the CV.
export const EXPERIENCE_NOTE =
  "Also built 3 WhatsApp chatbots for fitness and healthcare businesses, answering FAQs and booking appointments, some with AI-generated replies.";
