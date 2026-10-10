"use client";

import { motion } from "framer-motion";

import { useMotionAllowed } from "@/lib/use-motion-allowed";

const BUBBLES = [
  { width: "w-2/3", side: "self-start", delay: 0 },
  { width: "w-1/2", side: "self-end", delay: 0.6 },
  { width: "w-3/5", side: "self-start", delay: 1.2 },
];

type AbstractCardProps = { label: string; note: string };

// Stand-in visual for work with no public screenshots (message bubbles = campaigns).
export const AbstractCard = ({ label, note }: AbstractCardProps) => {
  const motionOn = useMotionAllowed();

  return (
    <div
      data-abstract-card
      className="relative flex min-h-[220px] sm:min-h-0 sm:aspect-[16/10] flex-col justify-between overflow-hidden rounded-lg border border-[#2A0E61] bg-[radial-gradient(circle_at_30%_20%,#2A0E61_0%,#030014_70%)] p-6"
    >
      <div className="flex flex-col gap-3">
        {BUBBLES.map((b) => (
          <motion.div
            key={b.delay}
            className={`h-8 rounded-2xl border border-[#7042f88b] bg-[#7042f84d] ${b.width} ${b.side}`}
            animate={motionOn ? { opacity: [0.35, 1, 0.35], y: [0, -4, 0] } : undefined}
            transition={{ duration: 3, repeat: Infinity, delay: b.delay }}
          />
        ))}
      </div>
      <div>
        <p className="text-lg font-semibold text-white">{label}</p>
        <p className="text-sm text-gray-400">{note}</p>
      </div>
    </div>
  );
};
