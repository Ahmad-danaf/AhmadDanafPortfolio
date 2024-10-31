"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-5 md:px-20 mt-20 md:mt-40 w-full z-[20]"
    >
      <div className="w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-2 px-2 border border-[#7042f88b] opacity-90"
        >
          <SparklesIcon className="text-[#b49bff] mr-2 h-4 w-4 md:h-5 md:w-5" />
          <h1 className="Welcome-text text-[13px] md:text-[15px]">Software Engineer Portfolio</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-gray-100 max-w-[600px] w-auto h-auto"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
            Delivering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
              efficient and innovative
            </span>
            {" "}
            software solutions.
          </span>
        </motion.div>


      <motion.p
      variants={slideInFromLeft(0.8)}
      className="text-sm md:text-lg text-white my-3 md:my-5 max-w-[300px] md:max-w-[600px] shadow-md"
    >
      I&apos;m in my final year of a Computer Science degree, diving into the world of software engineering with a strong interest in backend development. My studies have equipped me with skills in various programming languages, algorithms, and software design principles, and I&apos;m excited to bring these into real-world projects.
      <br />
      Outside of coding, I&apos;m an amateur astrophotographer, blending my love for technology and the cosmos.
    </motion.p>

        <motion.a
          href="#projects"
          variants={slideInFromLeft(1)}
          className="py-2 px-4 md:px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[150px] md:max-w-[200px]"
        >
          Learn more
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-auto flex justify-center items-center mt-8 md:mt-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={400}
          width={400}
          draggable={false}
          className="select-none md:h-[650px] md:w-[650px]"
        />
      </motion.div>
    </motion.div>
  );
};
