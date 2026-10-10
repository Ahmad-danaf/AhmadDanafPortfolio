"use client";

import { TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { AbstractCard } from "@/components/sub/abstract-card";
import { ArrowOut } from "@/components/sub/marks";
import { MediaCard } from "@/components/sub/media-card";
import type { Role } from "@/content/types";
import { cn } from "@/lib/utils";

type TimelineItemProps = { item: Role; side: "left" | "right" };

export const TimelineItem = ({ item, side }: TimelineItemProps) => (
  <motion.li
    data-timeline-item
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6 }}
    className="relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
  >
    <span
      aria-hidden="true"
      className="absolute left-3 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_#a78bfa] md:left-1/2"
    />

    <div className={cn("flex flex-col gap-3", side === "right" && "md:order-2")}>
      <p className="text-sm uppercase tracking-widest text-[#b49bff]">{item.dates}</p>
      <h3 className="text-2xl font-semibold text-white">{item.org}</h3>
      <p className="text-gray-200">{item.role}</p>
      <p className="text-gray-400">{item.context}</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-300">
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {item.awards && (
        <ul
          aria-label="Recognition"
          className="mt-2 space-y-1.5 rounded-lg border border-[#7042f88b] bg-[#7042f81a] px-3 py-2 text-sm text-gray-200"
        >
          {item.awards.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <TrophyIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b49bff]" />
              {a}
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-2 flex flex-wrap gap-2" aria-label="Tech stack">
        {item.chips.map((c) => (
          <li key={c} className="rounded-full border border-[#7042f861] px-3 py-1 text-xs text-gray-300">
            {c}
          </li>
        ))}
      </ul>
      {item.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.links.map((l, i) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("btn", i === 0 ? "btn-primary" : "btn-ghost")}
            >
              {l.label}
              <ArrowOut />
            </a>
          ))}
        </div>
      )}
    </div>

    <div className={cn(side === "right" && "md:order-1")}>
      {item.media ? (
        <MediaCard media={item.media} />
      ) : (
        <AbstractCard label={item.org} note={item.mediaFallback ?? ""} />
      )}
    </div>
  </motion.li>
);
