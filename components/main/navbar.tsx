"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import { FaBars, FaFilePdf, FaTimes } from "react-icons/fa";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

import { NAV_LINKS, SHOW_RESUME, SOCIALS } from "@/content/site";
import type { Social } from "@/content/types";

const SOCIAL_ICONS: Record<Social["name"], IconType> = {
  LinkedIn: RxLinkedinLogo,
  GitHub: RxGithubLogo,
  Resume: FaFilePdf,
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-5 md:px-10">
      <div className="relative w-full h-full flex items-center justify-between m-auto px-[10px]">
        <Link href="#about-me" aria-label="Ahmad Danaf" className="flex items-center">
          <Image src="/media/brand/logo-ad.png" alt="" width={80} height={40} draggable={false} className="h-10 w-20" />
          <div className="font-bold ml-[10px] hidden md:block text-gray-300">Ahmad Danaf</div>
        </Link>

        <button
          className="md:hidden text-white text-2xl"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          aria-label="Primary"
          className={`${isOpen ? "flex" : "hidden"} absolute left-0 top-[65px] w-full md:static md:flex md:w-[500px] h-auto md:h-full items-center justify-between md:mr-20`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 w-full h-auto bg-[rgba(3,0,20,0.85)] md:bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-2xl md:rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden sm:flex gap-5">
          {SOCIALS.filter(({ name }) => SHOW_RESUME || name !== "Resume").map(({ name, url }) => {
            const Icon = SOCIAL_ICONS[name];
            return (
              <Link href={url} target="_blank" rel="noreferrer noopener" aria-label={name} key={name}>
                <Icon className="h-6 w-6 text-white" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
