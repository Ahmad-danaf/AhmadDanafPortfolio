"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { IdCard } from "@/components/sub/id-card";
import { ArrowDown } from "@/components/sub/marks";
import { HERO } from "@/content/site";
import { fadeIn } from "@/lib/motion";

// The text animates in CSS (.hero-in), so it shows with the first paint.
// Phones put the card first, as a wide card hanging under the navbar.
export const HeroContent = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    className="flex flex-col md:flex-row items-center justify-center px-5 md:px-20 mt-[4.75rem] md:mt-40 w-full z-[20]"
  >
    <div className="order-2 w-full flex flex-col gap-5 justify-center m-auto text-start md:order-none">
      {/* Phones: the card above already shows the title. */}
      <div className="hero-in hero-in-top hidden md:block [--d:0.5s]">
        <div className="Welcome-box py-2 px-2 border border-[#7042f88b]">
          <SparklesIcon className="text-[#b49bff] mr-2 h-4 w-4 md:h-5 md:w-5" />
          <p className="Welcome-text text-[13px] md:text-[15px]">{HERO.badge}</p>
        </div>
      </div>

      <h1 className="hero-in [--i:1] [--d:0.5s] md:mt-6 max-w-[640px] text-[2.125rem] leading-[1.15] md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
        {HERO.headline}
      </h1>

      <div className="hero-in [--i:2] [--d:0.8s] md:my-5 max-w-[600px] space-y-3 text-base md:text-lg text-gray-200">
        <p>{HERO.intro}</p>
        <p className="text-gray-400">{HERO.personal}</p>
      </div>

      <div className="hero-cta hero-in [--i:3] [--d:1s] flex flex-wrap gap-3">
        <a href="#experience" className="btn btn-primary btn-lg">
          View experience
          <ArrowDown />
        </a>
        <a href="#contact" className="btn btn-ghost btn-lg">
          Contact me
          <ArrowDown />
        </a>
      </div>

      <ul
        aria-label="Highlights"
        className="hero-in [--i:4] [--d:1.2s] flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-400 md:mt-2"
      >
        {HERO.proof.map((fact) => (
          <li key={fact} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7042f8]" />
            {fact}
          </li>
        ))}
      </ul>
    </div>

    <motion.div
      variants={fadeIn(0.6)}
      className="hero-card order-1 mb-6 flex w-full justify-center md:order-none md:mb-0"
    >
      <IdCard />
    </motion.div>
  </motion.div>
);
