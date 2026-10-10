"use client";

import { motion } from "framer-motion";

import { AbstractCard } from "@/components/sub/abstract-card";
import { ArrowOut } from "@/components/sub/marks";
import { MediaCard } from "@/components/sub/media-card";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = { project: Project; index: number };

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="flex flex-col overflow-hidden rounded-lg border border-[#2A0E61] bg-[#03001480] shadow-lg"
  >
    {project.media ? (
      <MediaCard media={project.media} className="rounded-none border-0 border-b border-[#2A0E61]" />
    ) : (
      <AbstractCard label={project.title} note={project.mediaFallback ?? ""} />
    )}
    <div className="flex flex-1 flex-col p-5">
      <span className="Welcome-box self-start border border-[#7042f88b] px-3 py-1">
        <span className="Welcome-text text-xs">{project.badge}</span>
      </span>
      <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-2 text-gray-300">{project.description}</p>
      {project.footnote && <p className="mt-2 text-sm italic text-gray-400">{project.footnote}</p>}
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.chips.map((c) => (
          <li key={c} className="rounded-full border border-[#7042f861] px-3 py-1 text-xs text-gray-300">
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.links.map((l, i) => (
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
    </div>
  </motion.article>
);
