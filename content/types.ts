// Shared shapes for the site's content. Data files stay icon-free so Node can
// run them directly in tests; components map names to icons.

export type Media = {
  poster: string; // path under /public, e.g. "/media/captures/dilsever.webp"
  video?: string; // optional muted loop, e.g. "/media/captures/dilsever.webm"
  alt: string;
};

export type LinkButton = { label: string; url: string };

export type NavLink = { title: string; link: string };

export type Social = { name: "LinkedIn" | "GitHub" | "Resume"; url: string };

// One block of work: an employer, or one freelance client.
export type Work = {
  id: string;
  org: string;
  context: string;
  bullets: readonly string[];
  awards?: readonly string[]; // recognition, shown in one box
  chips: readonly string[];
  media?: Media;
  mediaFallback?: string; // shown on an abstract card when there are no public screenshots
  links: readonly LinkButton[];
};

export type Role = Work & { role: string; dates: string };

// One timeline entry for all freelance work, divided by client as on the CV.
export type FreelanceRole = { id: string; org: string; role: string; dates: string; clients: readonly Work[] };

export type Project = {
  id: string;
  title: string;
  badge: string;
  description: string;
  footnote?: string;
  chips: readonly string[];
  media?: Media;
  mediaFallback?: string; // shown on an abstract card when there is no real screenshot
  links: readonly LinkButton[];
};

export type Stat = { value: number; suffix: string; label: string };

export type Skill = { name: string; icon: string }; // file in /public/skills

export type SkillGroup = { title: string; skills: readonly Skill[] };

export type Photo = { src: string; alt: string };

export type Fact = { label: string; value: string; href?: string };
