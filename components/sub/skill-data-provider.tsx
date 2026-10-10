"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = { src: string; name: string; index: number };

export const SkillDataProvider = ({ src, name, index }: SkillDataProviderProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: index * 0.08 }}
      title={name}
    >
      <Image src={`/skills/${src}`} width={64} height={64} alt={name} className="h-16 w-16 object-contain" />
    </motion.div>
  );
};
