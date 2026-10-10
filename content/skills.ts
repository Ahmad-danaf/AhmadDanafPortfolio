import type { SkillGroup } from "./types";

// Skills used in production work or graded coursework.
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: "ts.png" },
      { name: "JavaScript", icon: "js.png" },
      { name: "Python", icon: "python.png" },
      { name: "Java", icon: "java.png" },
      { name: "C++", icon: "c++.png" },
      { name: "C", icon: "c.png" },
      { name: "Bash", icon: "bash.svg" },
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      { name: "React", icon: "react.png" },
      { name: "Next.js", icon: "next.png" },
      { name: "React Native", icon: "reactnative.png" },
      { name: "Tailwind CSS", icon: "tailwind.png" },
      { name: "Framer Motion", icon: "framer.png" },
      { name: "HTML", icon: "html.png" },
      { name: "CSS", icon: "css.png" },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Node.js", icon: "node.png" },
      { name: "Django / DRF", icon: "django.png" },
      { name: "PostgreSQL", icon: "postgresql.png" },
      { name: "Redis", icon: "redis.svg" },
      { name: "Firebase / Firestore", icon: "firebase.png" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "aws.png" },
      { name: "GitHub Actions", icon: "github-actions.svg" },
      { name: "Linux", icon: "linux.png" },
      { name: "Nginx", icon: "nginx.svg" },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "OpenAI API", icon: "openai.svg" },
      { name: "Gemini API", icon: "gemini.svg" },
    ],
  },
];
