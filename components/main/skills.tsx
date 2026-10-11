"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { BackgroundVideo } from "@/components/sub/background-video";
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { BACKGROUNDS } from "@/content/site";
import { SKILL_GROUPS } from "@/content/skills";

export const Skills = () => {
  const [showText, setShowText] = useState(false);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center h-full overflow-hidden py-20"
    >
      <SkillText />

      <button onClick={() => setShowText(!showText)} aria-pressed={showText} className="btn btn-ghost">
        {showText ? "Show icons" : "Show names"}
      </button>

      <AnimatePresence mode="wait">
        {showText ? (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 w-full max-w-5xl px-5 z-10"
          >
            <div className="divide-y divide-white/10 rounded-2xl border border-[#7042f861] bg-[#0c0524]/60 backdrop-blur-sm">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#b49bff] md:w-40 md:shrink-0">{group.title}</h3>
                  <ul aria-label={group.title} className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-gray-200"
                      >
                        <Image src={`/skills/${skill.icon}`} width={24} height={24} alt="" className="h-6 w-6 object-contain" />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex w-full flex-col items-center gap-6 px-5 z-10 md:gap-8"
          >
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col items-center gap-3">
                <h3 className="text-sm uppercase tracking-widest text-[#b49bff]">{group.title}</h3>
                {/* Icons shrink on phones so each group stays one row, as on desktop. */}
                <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-5">
                  {group.skills.map((skill, i) => (
                    <SkillDataProvider key={skill.name} src={skill.icon} name={skill.name} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20">
        <BackgroundVideo src={BACKGROUNDS.skills} className="w-full h-full object-cover" />
      </div>
    </section>
  );
};
