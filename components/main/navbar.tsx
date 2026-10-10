"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FaBars, FaFilePdf, FaTimes } from "react-icons/fa";
import { RxEnvelopeClosed, RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

import { NAV_LINKS, SHOW_RESUME, SITE, SOCIALS } from "@/content/site";
import type { Social } from "@/content/types";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<Social["name"], IconType> = {
  LinkedIn: RxLinkedinLogo,
  GitHub: RxGithubLogo,
  Resume: FaFilePdf,
};

const SOCIAL_LINKS = SOCIALS.filter(
  ({ name }) => SHOW_RESUME || name !== "Resume",
);
const SECTION_IDS = NAV_LINKS.map((l) => l.link.slice(1));
// The phone menu has no room for icons in the bar, so it lists them all.
const MENU_CONTACTS = [
  ...SOCIAL_LINKS.map(({ name, url }) => ({
    name: name as string,
    url,
    Icon: SOCIAL_ICONS[name],
  })),
  { name: "Email", url: `mailto:${SITE.email}`, Icon: RxEnvelopeClosed },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const isActive = (link: string) => link === `#${active}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Outside the bar: its backdrop blur would trap a fixed child inside it. */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-x-0 bottom-0 top-[65px] z-40 bg-[#030014]/60 md:hidden"
        />
      )}
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-5 md:px-10">
        <div className="relative w-full h-full flex items-center justify-between m-auto px-[10px]">
          <Link
            href="#about-me"
            aria-label={SITE.name}
            className="flex items-center"
          >
            <Image
              src="/media/brand/logo-ad.png"
              alt=""
              width={80}
              height={40}
              draggable={false}
              className="h-10 w-20"
            />
            <div
              aria-hidden="true"
              className="font-bold ml-[10px] text-gray-300"
            >
              {SITE.name}
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden md:block md:mr-20">
            <div className="flex items-center gap-1 rounded-full border border-[#7042f88b] bg-white/[0.03] p-1.5 shadow-[inset_0_-7px_11px_#a48fff1f]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  aria-current={isActive(link.link) ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-gray-200 transition-colors hover:text-white",
                    isActive(link.link) && "bg-[#7042f8]/25 text-white",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex gap-5">
            {SOCIAL_LINKS.map(({ name, url }) => {
              const Icon = SOCIAL_ICONS[name];
              return (
                <Link
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  key={name}
                >
                  <Icon className="h-6 w-6 text-white" />
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden flex h-10 w-10 items-center justify-center text-white text-2xl"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute left-3 right-3 top-[73px] rounded-2xl border border-[#7042f88b] bg-[#0c0524] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:hidden"
          >
            <nav aria-label="Menu" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.link) ? "true" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center rounded-xl px-4 text-base text-gray-200 hover:bg-white/5",
                    isActive(link.link) && "bg-[#7042f8]/20 text-white",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
            <div className="mx-2 my-2 h-px bg-white/10" />
            <div className="flex gap-3 px-2 pb-2 pt-1">
              {MENU_CONTACTS.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  aria-label={name}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7042f88b] text-gray-200 transition hover:border-[#b49bff] hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
