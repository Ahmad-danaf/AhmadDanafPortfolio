"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { BackgroundVideo } from "@/components/sub/background-video";
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { BACKGROUNDS } from "@/content/site";
import { SKILL_GROUPS } from "@/content/skills";

const skillTextList = SKILL_GROUPS.map(
  (group) => `${group.title}: ${group.skills.map((s) => s.name).join(", ")}`,
);

export const Skills = () => {
  const [showText, setShowText] = useState(false);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-6 h-full overflow-hidden py-20"
    >
      <SkillText />

      <button onClick={() => setShowText(!showText)} aria-pressed={showText} className="btn btn-ghost mb-5">
        {showText ? "Show icons" : "Show names"}
      </button>

      <AnimatePresence mode="wait">
        {showText ? (
          <motion.ul
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 w-full max-w-3xl space-y-4 px-5 text-center text-lg text-white z-10"
          >
            {skillTextList.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex w-full flex-col items-center gap-8 px-5 z-10"
          >
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col items-center gap-3">
                <h3 className="text-sm uppercase tracking-widest text-[#b49bff]">{group.title}</h3>
                <div className="flex flex-row flex-wrap items-center justify-center gap-5">
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
