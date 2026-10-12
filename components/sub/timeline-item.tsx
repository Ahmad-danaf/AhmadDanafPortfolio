"use client";

import { TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { AbstractCard } from "@/components/sub/abstract-card";
import { ArrowOut } from "@/components/sub/marks";
import { MediaCard } from "@/components/sub/media-card";
import type { FreelanceRole, Role, Work } from "@/content/types";
import { cn } from "@/lib/utils";

type Side = "left" | "right";

const REVEAL = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6 },
};

// Phones: name, picture, details (no placeholder art). Desktop: text beside the picture.
const workGrid = (work: Work, side: Side) =>
  cn(
    "relative grid gap-y-4 pl-8 md:grid-cols-2 md:gap-x-16 md:gap-y-3 md:pl-0",
    work.media ? "[grid-template-areas:'head'_'media'_'body']" : "[grid-template-areas:'head'_'body']",
    side === "left"
      ? "md:[grid-template-areas:'head_media'_'body_media']"
      : "md:[grid-template-areas:'media_head'_'media_body']",
  );

const Dot = ({ small = false }: { small?: boolean }) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute left-3 -translate-x-1/2 rounded-full md:left-1/2",
      small ? "top-2.5 h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "top-2 h-3 w-3 bg-purple-400 shadow-[0_0_12px_#a78bfa]",
    )}
  />
);

const RoleHead = ({ role }: { role: Role | FreelanceRole }) => (
  <>
    <p className="text-sm uppercase tracking-widest text-[#b49bff]">{role.dates}</p>
    <h3 className="text-2xl font-semibold text-white">{role.org}</h3>
    <p className="text-gray-200">{role.role}</p>
  </>
);

const WorkBody = ({ work }: { work: Work }) => (
  <div className="flex flex-col gap-3 [grid-area:body]">
    <p className="text-gray-400">{work.context}</p>
    <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-300">
      {work.bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
    {work.awards && (
      <ul
        aria-label="Recognition"
        className="mt-2 space-y-1.5 rounded-lg border border-[#7042f88b] bg-[#7042f81a] px-3 py-2 text-sm text-gray-200"
      >
        {work.awards.map((a) => (
          <li key={a} className="flex items-start gap-2">
            <TrophyIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b49bff]" />
            {a}
          </li>
        ))}
      </ul>
    )}
    {work.chips.length > 0 && (
      <ul className="mt-2 flex flex-wrap gap-2" aria-label="Tech stack">
        {work.chips.map((c) => (
          <li key={c} className="rounded-full border border-[#7042f861] px-3 py-1 text-xs text-gray-300">
            {c}
          </li>
        ))}
      </ul>
    )}
    {work.links.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {work.links.map((l, i) => (
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
);

// Small work with neither screenshots nor a fallback note gets no visual.
const WorkMedia = ({ work }: { work: Work }) => {
  if (work.media)
    return (
      <div className="[grid-area:media]">
        <MediaCard media={work.media} />
      </div>
    );
  if (!work.mediaFallback) return null;
  return (
    <div className="hidden [grid-area:media] md:block">
      <AbstractCard label={work.org} note={work.mediaFallback} />
    </div>
  );
};

export const TimelineItem = ({ item, side }: { item: Role; side: Side }) => (
  <motion.li data-timeline-item data-work {...REVEAL} className={workGrid(item, side)}>
    <Dot />
    <div className="flex flex-col gap-3 [grid-area:head]">
      <RoleHead role={item} />
    </div>
    <WorkBody work={item} />
    <WorkMedia work={item} />
  </motion.li>
);

// One role on the timeline, then each client as its own row under it.
export const FreelanceItem = ({ item, side }: { item: FreelanceRole; side: Side }) => (
  <li data-timeline-item className="flex flex-col gap-10 md:gap-12">
    <motion.div {...REVEAL} className="relative pl-8 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0">
      <Dot />
      <div className={cn("flex flex-col gap-3", side === "right" && "md:col-start-2")}>
        <RoleHead role={item} />
      </div>
    </motion.div>
    <ol className="flex flex-col gap-10 md:gap-12">
      {item.clients.map((client) => (
        <motion.li key={client.id} data-work {...REVEAL} className={workGrid(client, side)}>
          <Dot small />
          <div className="[grid-area:head]">
            <h4 className="text-xl font-semibold text-white">{client.org}</h4>
          </div>
          <WorkBody work={client} />
          <WorkMedia work={client} />
        </motion.li>
      ))}
    </ol>
  </li>
);
