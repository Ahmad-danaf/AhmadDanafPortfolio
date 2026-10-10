"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BEYOND_CODE } from "@/content/site";

// First photo runs the full height on the left; the other two stack beside it.
const TILE = ["row-span-2", "", ""];

export const BeyondCode = () => (
  <section id="beyond-code" className="flex flex-col items-center px-5 py-20 md:px-10">
    <h2 className="text-[32px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
      {BEYOND_CODE.title}
    </h2>
    <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
      <div className="space-y-4 text-lg text-gray-300">
        {BEYOND_CODE.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <figure>
        <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-3 sm:h-[480px]">
          {BEYOND_CODE.photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-lg border border-[#2A0E61] ${TILE[i]}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 240px, 50vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
        <figcaption className="mt-3 text-xs text-gray-400">{BEYOND_CODE.credit}</figcaption>
      </figure>
    </div>
  </section>
);
