"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export const SkillText = () => (
  <div className="w-full h-auto flex flex-col items-center justify-center px-5">
    <motion.div
      variants={slideInFromTop}
      className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
    >
      <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
      <p className="Welcome-text text-[13px]">The stack I ship with</p>
    </motion.div>

    <motion.h2
      variants={slideInFromLeft(0.5)}
      className="text-[26px] md:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
    >
      Used in production and graded projects, across web, mobile, cloud and AI.
    </motion.h2>

    <motion.p
      variants={slideInFromRight(0.5)}
      className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
    >
      Only what I can back with real work.
    </motion.p>
  </div>
);
