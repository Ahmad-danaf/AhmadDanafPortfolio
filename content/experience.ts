import type { FreelanceRole, Role } from "./types";

// Same facts and wording as the CV: a one-line company context, then results.
// Freelance work is one entry, divided by client.
export const EXPERIENCE: readonly (Role | FreelanceRole)[] = [
  {
    id: "volunteen",
    org: "Volunteen",
    role: "Founding Software Engineer",
    dates: "Jan 2024 – present",
    context: "Early-stage EdTech startup that gamifies youth volunteering.",
    bullets: [
      "Designed and built a Python/Django backend with REST APIs and shared business logic for web and mobile; manage AWS infrastructure (EC2, RDS PostgreSQL, S3, CloudWatch) and GitHub Actions CI/CD.",
      "Cut recommendation API latency from ~5 s to 300 ms with batched database queries and precomputed results.",
      "Built a tool-calling AI agent (OpenAI) that turns mentor requests into draft tasks and programs for human approval; automated review of task submissions.",
      "Designed and built task submission and approval workflows for web and React Native (Expo), enabling mentors to configure completion requirements and review submissions.",
      "Introduced a background job queue for notifications, recurring task creation and AI reviews, keeping slow operations out of user requests.",
    ],
    awards: [
      "Selected for SCoTCH, the 8200 Alumni Association's social-cohesion program (1 of 9 ventures, ₪50K grant)",
      "Sharq Tank finalist",
      "4th place, Computer Science Project Exhibition, The Academic College of Tel-Aviv-Yaffo (2024)",
    ],
    chips: ["Python", "Django", "PostgreSQL", "React Native", "Expo", "AWS", "OpenAI", "GitHub Actions"],
    media: {
      poster: "/media/captures/volunteen.webp",
      video: "/media/captures/volunteen.webm",
      alt: "Volunteen landing page for schools",
    },
    links: [{ label: "Visit site", url: "https://www.volunteen.site/" }],
  },
  {
    id: "freelance",
    org: "Freelance",
    role: "Software Engineer",
    dates: "Dec 2025 – present",
    clients: [
      {
        id: "meruba",
        org: "Meruba",
        context: "Internal campaign tool for an Israeli digital-marketing agency.",
        bullets: [
          "Built the WhatsApp and email campaign system end to end in Next.js and TypeScript, including personalized video campaigns rendered on AWS Lambda.",
          "Designed a webhook-driven send pipeline on Firestore that avoids duplicate sends, confirms delivery and recovers stuck campaigns automatically, plus a send-rate gate that protects the agency's WhatsApp numbers.",
        ],
        chips: ["Next.js", "TypeScript", "Firestore", "Remotion", "AWS Lambda", "MUI (RTL)"],
        mediaFallback: "Internal agency tool, so there are no public screenshots.",
        links: [],
      },
      {
        id: "arab-ai-club",
        org: "Arab AI Club",
        context: "Arabic AI-education community with 1,000+ members in 17 countries.",
        bullets: [
          "Launched the platform on iOS and Android, taking both apps through App Store and Google Play review; added RevenueCat in-app subscriptions and store-required account deletion.",
          "Rebuilt the main screens (Next.js, React) in a full redesign and built personalized learning plans for subscribers.",
          "Built daily AI-personalized push notifications (Firebase, Gemini), passwordless email sign-in and a moderated content library; wrote the platform's automated tests.",
        ],
        chips: ["Next.js", "React", "TypeScript", "Firebase", "Capacitor", "Fastlane", "Gemini"],
        media: {
          poster: "/media/captures/arabaiclub.webp",
          video: "/media/captures/arabaiclub.webm",
          alt: "Arab AI Club landing page",
        },
        links: [{ label: "Visit platform", url: "https://app.arabaiclub.com/" }],
      },
      {
        id: "small-business",
        org: "Small-business clients",
        context: "Fitness and healthcare businesses.",
        bullets: ["Built 3 WhatsApp chatbots that answer FAQs and book appointments, some with AI-generated replies."],
        chips: [],
        links: [],
      },
    ],
  },
];
