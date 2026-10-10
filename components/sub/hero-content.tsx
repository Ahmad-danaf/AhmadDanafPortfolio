"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { IdCard } from "@/components/sub/id-card";
import { ArrowDown } from "@/components/sub/marks";
import { HERO } from "@/content/site";
import { fadeIn, slideInFromLeft, slideInFromTop } from "@/lib/motion";

export const HeroContent = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    className="flex flex-col md:flex-row items-center justify-center px-5 md:px-20 mt-28 md:mt-40 w-full z-[20]"
  >
    <div className="w-full flex flex-col gap-5 justify-center m-auto text-start">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-2 px-2 border border-[#7042f88b] opacity-90"
      >
        <SparklesIcon className="text-[#b49bff] mr-2 h-4 w-4 md:h-5 md:w-5" />
        <p className="Welcome-text text-[13px] md:text-[15px]">{HERO.badge}</p>
      </motion.div>

      <motion.h1
        variants={slideInFromLeft(0.5)}
        className="mt-6 max-w-[640px] text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300"
      >
        {HERO.headline}
      </motion.h1>

      <motion.div
        variants={slideInFromLeft(0.8)}
        className="my-3 md:my-5 max-w-[600px] space-y-3 text-base md:text-lg text-gray-200"
      >
        <p>{HERO.intro}</p>
        <p className="text-gray-400">{HERO.personal}</p>
      </motion.div>

      <motion.div variants={slideInFromLeft(1)} className="flex flex-wrap gap-3">
        <a href="#experience" className="btn btn-primary btn-lg">
          View experience
          <ArrowDown />
        </a>
        <a href="#contact" className="btn btn-ghost btn-lg">
          Contact me
          <ArrowDown />
        </a>
      </motion.div>

      <motion.ul
        variants={slideInFromLeft(1.2)}
        aria-label="Highlights"
        className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-400"
      >
        {HERO.proof.map((fact) => (
          <li key={fact} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7042f8]" />
            {fact}
          </li>
        ))}
      </motion.ul>
    </div>

    <motion.div variants={fadeIn(0.6)} className="mt-28 flex w-full justify-center md:mt-0">
      <IdCard />
    </motion.div>
  </motion.div>
);
