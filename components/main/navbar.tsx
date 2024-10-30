"use client";

import Image from "next/image";
import Link from "next/link";
import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icon imports for mobile menu

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        <Link href="#about-me" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer hover:animate-slowspin"
          />
          <div className="font-bold ml-[10px] hidden md:block text-gray-300">
            Ahmad Danaf
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div className={`md:flex w-[500px] h-full items-center justify-between md:mr-20 ${isOpen ? "flex" : "hidden"}`}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

            {/* Resume Link */}
            <Link
              href="/resume.pdf" // Ensure this PDF is in the public folder or a valid URL
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Resume
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link href={link} target="_blank" rel="noreferrer noopener" key={name}>
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
