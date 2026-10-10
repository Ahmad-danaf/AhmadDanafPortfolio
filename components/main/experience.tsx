"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { TimelineItem } from "@/components/sub/timeline-item";
import { EXPERIENCE, EXPERIENCE_NOTE } from "@/content/experience";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

export const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const motionOn = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="flex flex-col items-center px-5 py-20 md:px-10">
      <h2 className="py-10 text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        Experience
      </h2>
      <div ref={ref} className="relative w-full max-w-5xl">
        <div aria-hidden="true" className="absolute left-3 top-0 h-full w-px bg-[#2A0E61] md:left-1/2" />
        <motion.div
          aria-hidden="true"
          style={motionOn ? { scaleY } : undefined}
          className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-purple-500 to-cyan-500 md:left-1/2"
        />
        <ol className="flex flex-col gap-16">
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.id} item={item} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>
      <p className="mt-16 w-full max-w-3xl pl-10 text-gray-400 [text-wrap:balance] md:pl-0 md:text-center">{EXPERIENCE_NOTE}</p>
    </section>
  );
};
