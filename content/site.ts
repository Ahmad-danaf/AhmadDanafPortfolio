import type { Fact, NavLink, Photo, Social } from "./types";

// Hides the navbar Resume link and the PDF social icon.
export const SHOW_RESUME = false;

export const SITE = {
  name: "Ahmad Danaf",
  title: "Ahmad Danaf — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building production web, mobile and AI products with TypeScript, React, Next.js, React Native, Django and AWS. Founding engineer at Volunteen.",
  url: "https://www.ahmaddanaf.com",
  email: "ahmad.danf@gmail.com",
} as const;

export const SOCIALS: readonly Social[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ahmad-danaf/" },
  { name: "GitHub", url: "https://github.com/Ahmad-danaf" },
  { name: "Resume", url: "/AhmadDanaf_Resume.pdf" },
];

export const NAV_LINKS: readonly NavLink[] = [
  { title: "Experience", link: "#experience" },
  { title: "Projects", link: "#projects" },
  { title: "Skills", link: "#skills" },
  { title: "Contact", link: "#contact" },
];

export const HERO = {
  // Same title as the CV header and LinkedIn, so the three match.
  badge: "Full-Stack Software Engineer · Web, Mobile & AI",
  headline: "I ship web and mobile apps that real people use.",
  intro:
    "Full-stack engineer shipping to production since 2024: founding engineer at Volunteen, and freelance engineer for Arab AI Club and Meruba. I work mostly in TypeScript, React, Next.js, React Native, Python/Django and AWS. B.Sc. in Computer Science, 2026.",
  personal: "Off the keyboard, I photograph the night sky.",
  // Results a recruiter can check, not repeated in the intro.
  proof: [
    "Shipped to the App Store & Google Play",
    "Recommendation API ~5 s → 300 ms",
    "Volunteen: 1 of 9 picked by 8200 Alumni",
  ],
} as const;

// The hanging ID card in the hero. The title matches the CV header.
export const ID_CARD: {
  name: string;
  title: string;
  photo: Photo;
  banner: string;
  bannerLoop: string; // desktop-only motion over the banner image
  facts: readonly Fact[];
  barcode: string;
  back: { photo: Photo; label: string; caption: string };
} = {
  name: SITE.name,
  title: "Full-Stack Software Engineer",
  photo: { src: "/media/photos/headshot.webp", alt: "Portrait of Ahmad Danaf" },
  banner: "/media/art/card-banner.webp",
  bannerLoop: "/media/art/card-banner-loop.webm",
  facts: [
    { label: "Languages", value: "Hebrew · Arabic · English" },
    { label: "Degree", value: "B.Sc. CS, 2026" },
    { label: "Contact", value: SITE.email, href: `mailto:${SITE.email}` },
  ],
  barcode: "AHMADDANAF.COM",
  back: {
    photo: {
      src: "/media/photos/milky-way-ridge.webp",
      alt: "A person in a camp chair on a desert ridge under the Milky Way",
    },
    label: "Off the keyboard",
    caption: "From my night-sky trips.",
  },
};

export const BACKGROUNDS = {
  hero: "/media/art/hero-loop.webm",
  contact: "/media/art/nebula-loop.webm",
  skills: "/media/art/skills-loop.webm",
} as const;

export const CONTACT = {
  title: "Let's talk",
  line: "Have a role or a project in mind? Email is the fastest way to reach me.",
} as const;

export const BEYOND_CODE: {
  title: string;
  lines: readonly string[];
  credit: string;
  photos: readonly Photo[];
} = {
  title: "Beyond code",
  lines: [
    "I'm an amateur astrophotographer: mostly wide-field shots of the Milky Way.",
    "I keep learning outside work, and I stay active through sport.",
  ],
  credit: "From my night-sky trips.",
  photos: [
    {
      src: "/media/photos/milky-way-chair.webp",
      alt: "A person in a camp chair, seen from behind, under the Milky Way",
    },
    {
      src: "/media/photos/milky-way-core.webp",
      alt: "The Milky Way core with dark dust lanes; a satellite or meteor trail crosses the upper left",
    },
    { src: "/media/photos/milky-way-friends.webp", alt: "Three people in silhouette under the Milky Way" },
  ],
};
