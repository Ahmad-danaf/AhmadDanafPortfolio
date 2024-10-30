"use client";
import { useState } from 'react';
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { motion, AnimatePresence } from 'framer-motion';

import {
  PROGRAMMING_LANGUAGES,
  WEB_DEVELOPMENT,
  DATABASES,
  TOOLS,
  OS_FRAMEWORKS
} from "@/constants";

const skillTextList = [
  "• Programming Languages: C, C++, Python, Java, JavaScript",
  "• Web Development: HTML, CSS, JavaScript, React, Node.js, Express.js, Django, Flask, Spring Boot",
  "• Database Management: SQL, MySQL, PostgreSQL, MongoDB, SQLite",
  "• Cloud & DevOps: AWS, Azure, Docker, CI/CD, GitHub Actions",
  "• Software Engineering: OOP, Data Structures, Algorithms, RESTful API, JSON",
  "• Operating Systems: Linux, Windows",
  "• Version Control: Git, GitHub",
  "• Desktop Development: JavaFX, Tkinter (Python)",
];

export const Skills = () => {
  const [showText, setShowText] = useState(false);

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="relative flex flex-col items-center justify-center gap-6 h-full overflow-hidden py-20"
    >
      <SkillText />

      <button
        onClick={() => setShowText(!showText)}
         className="mb-5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 transition"
      >
        {showText ? 'Show Icons' : 'Show Text'}
      </button>

      <AnimatePresence>
        {!showText && (
          <motion.div
            key="icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-full flex flex-col items-center z-10"
          >
            {/* Programming Languages */}
            <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
              {PROGRAMMING_LANGUAGES.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
            </div>

            {/* Web Development */}
            <div className="flex flex-row justify-center flex-wrap mt-6 gap-5 items-center">
              {WEB_DEVELOPMENT.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
            </div>

            {/* Databases */}
            <div className="flex flex-row justify-center flex-wrap mt-6 gap-5 items-center">
              {DATABASES.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
            </div>

            {/* Tools */}
            <div className="flex flex-row justify-center flex-wrap mt-6 gap-5 items-center">
              {TOOLS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
            </div>

            {/* OS & Frameworks */}
            <div className="flex flex-row justify-center flex-wrap mt-6 gap-5 items-center">
              {OS_FRAMEWORKS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText && (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-3/4 text-center z-10"
          >
            <ul className="text-white text-lg space-y-4">
              {skillTextList.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="leading-relaxed"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="w-full h-full opacity-20">
          <video
            className="w-full h-full object-cover"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};

