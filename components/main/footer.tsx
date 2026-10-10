import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { RxEnvelopeClosed, RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

import { ID_CARD, NAV_LINKS, SITE, SOCIALS } from "@/content/site";

const CONNECT: { name: string; url: string; Icon: IconType }[] = [
  { name: "LinkedIn", url: SOCIALS.find((s) => s.name === "LinkedIn")!.url, Icon: RxLinkedinLogo },
  { name: "GitHub", url: SOCIALS.find((s) => s.name === "GitHub")!.url, Icon: RxGithubLogo },
  { name: "Email", url: `mailto:${SITE.email}`, Icon: RxEnvelopeClosed },
];

// One compact row on desktop (name, section links, contact icons); stacked
// and centred on phones.
export const Footer = () => (
  <footer className="w-full px-5 pb-8 pt-10 text-gray-300 md:px-10">
    <div
      aria-hidden="true"
      className="mx-auto mb-10 h-px max-w-6xl bg-gradient-to-r from-transparent via-[#7042f8] to-transparent"
    />
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
      <Link href="#about-me" className="flex items-center gap-3">
        <Image src="/media/brand/logo-ad.png" alt="" width={64} height={32} className="h-8 w-16" />
        <span>
          <span className="block font-semibold text-white">{SITE.name}</span>
          <span className="block text-sm text-gray-400">{ID_CARD.title}</span>
        </span>
      </Link>

      <nav aria-label="Site" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
        {NAV_LINKS.map(({ title, link }) => (
          <Link key={title} href={link} className="transition hover:text-white">
            {title}
          </Link>
        ))}
      </nav>

      <nav aria-label="Connect" className="flex gap-3">
        {CONNECT.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            aria-label={name}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7042f88b] text-gray-200 transition hover:border-[#b49bff] hover:bg-[#7042f8]/15 hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </nav>
    </div>

    <p className="mt-10 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} {SITE.name} ·{" "}
      <Link href="#about-me" className="transition hover:text-white">
        Back to top ↑
      </Link>
    </p>
  </footer>
);
