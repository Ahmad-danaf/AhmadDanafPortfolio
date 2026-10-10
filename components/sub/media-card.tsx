"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Media } from "@/content/types";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

type MediaCardProps = { media: Media; className?: string; priority?: boolean };

// Poster first; the loop fades in on hover (mouse) or while in view (touch).
export const MediaCard = ({ media, className, priority = false }: MediaCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motionOn = useMotionAllowed();
  const [canHover, setCanHover] = useState(true);
  const [active, setActive] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (canHover || !ref.current) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [canHover]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) video.play().catch(() => undefined);
    else video.pause();
  }, [active]);

  const showVideo = motionOn && Boolean(media.video);

  return (
    <motion.div
      ref={ref}
      style={motionOn && canHover ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={(e) => {
        if (!motionOn || !canHover) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={() => canHover && setActive(true)}
      onPointerLeave={() => {
        if (!canHover) return;
        setActive(false);
        px.set(0);
        py.set(0);
      }}
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-lg border border-[#2A0E61] bg-[#0b0525]",
        className,
      )}
    >
      <Image
        src={media.poster}
        alt={media.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        priority={priority}
        className="object-cover object-top"
      />
      {showVideo && (
        <video
          ref={videoRef}
          src={media.video}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </motion.div>
  );
};
