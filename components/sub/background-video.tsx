"use client";

import { useMediaQuery } from "@/lib/use-media-query";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

type BackgroundVideoProps = { src: string; className?: string; media?: string };

// Decorative loop; not rendered for reduced motion, before hydration, or when
// `media` (a media query) doesn't match — so hidden videos are never downloaded.
export const BackgroundVideo = ({ src, className, media }: BackgroundVideoProps) => {
  const motionOn = useMotionAllowed();
  const matches = useMediaQuery(media ?? "all");

  if (!motionOn || !matches) return null;

  return (
    <video autoPlay muted loop playsInline preload="none" aria-hidden="true" className={className}>
      <source src={src} type={src.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
    </video>
  );
};
