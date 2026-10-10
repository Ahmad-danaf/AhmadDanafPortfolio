"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { BackgroundVideo } from "@/components/sub/background-video";
import { Barcode } from "@/components/sub/barcode";
import { ID_CARD } from "@/content/site";
import { useMediaQuery } from "@/lib/use-media-query";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

// The card tilts to stay in line with its strap, as if hanging from a long one.
const PENDULUM = 360;
const tilt = (x: number, y: number) => (-Math.atan2(x, PENDULUM + y) * 180) / Math.PI;

const FACE =
  "absolute inset-0 overflow-hidden rounded-2xl border border-[#7042f88b] bg-[#0c0524] " +
  "shadow-[0_0_50px_-12px_rgba(112,66,248,0.6)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

const Front = ({ turnedAway }: { turnedAway: boolean }) => (
  <div data-face="front" aria-hidden={turnedAway} className={cn(FACE, "flex flex-col")}>
    <div className="relative h-32 shrink-0">
      <Image src={ID_CARD.banner} alt="" fill sizes="320px" loading="eager" className="object-cover" />
      <BackgroundVideo
        src={ID_CARD.bannerLoop}
        media="(min-width: 768px)"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0524]" />
    </div>

    <div className="relative z-10 -mt-16 flex flex-col items-center px-5 text-center">
      <div className="rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 p-[3px] shadow-[0_0_24px_rgba(112,66,248,0.45)]">
        <Image
          src={ID_CARD.photo.src}
          alt={ID_CARD.photo.alt}
          width={112}
          height={112}
          loading="eager"
          draggable={false}
          className="h-28 w-28 rounded-full object-cover"
        />
      </div>
      <p className="mt-3 text-xl font-semibold text-white">{ID_CARD.name}</p>
      <p className="mt-1.5 rounded-full border border-[#7042f88b] bg-[#7042f8]/10 px-3 py-0.5 text-xs text-[#d8ccff]">
        {ID_CARD.title}
      </p>
    </div>

    <dl className="mx-5 mt-5 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.03] text-xs">
      {ID_CARD.facts.map((fact) => (
        <div key={fact.label} className="flex items-center justify-between gap-3 px-3 py-2">
          <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500">{fact.label}</dt>
          <dd className="text-right font-medium text-gray-200">
            {fact.href ? (
              <a
                href={fact.href}
                // A click on the link shouldn't also flip the card.
                onClick={(e) => e.stopPropagation()}
                className="underline decoration-[#7042f8]/60 underline-offset-2 hover:text-white"
              >
                {fact.value}
              </a>
            ) : (
              fact.value
            )}
          </dd>
        </div>
      ))}
    </dl>

    <div className="mt-auto px-5 pb-4 pt-3">
      <div className="rounded-md bg-[#ece8ff] px-1 py-1.5 text-[#030014]">
        <Barcode text={ID_CARD.barcode} className="h-9 w-full" />
      </div>
      <p className="mt-1.5 text-center font-mono text-[10px] tracking-[0.3em] text-gray-500">
        {ID_CARD.barcode.toLowerCase()}
      </p>
    </div>
  </div>
);

const Back = ({ turnedAway }: { turnedAway: boolean }) => (
  <div data-face="back" aria-hidden={turnedAway} className={cn(FACE, "[transform:rotateY(180deg)]")}>
    <Image src={ID_CARD.back.photo.src} alt={ID_CARD.back.photo.alt} fill sizes="320px" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#b49bff]">{ID_CARD.back.label}</p>
      <p className="mt-1 text-sm text-gray-100">{ID_CARD.back.caption}</p>
    </div>
  </div>
);

// A hanging ID card: drops in on a strap, swings when dragged, flips on click.
export const IdCard = () => {
  const motionOn = useMotionAllowed();
  const finePointer = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 768px)");
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const press = useRef({ x: 0, y: 0 });
  const gradientId = useId();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform([x, y], ([dx, dy]: number[]) => tilt(dx, dy));

  // On desktop the strap reaches up behind the navbar; on phones the card
  // sits under the text, so the strap is short.
  const strap = wide ? 520 : 96;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!motionOn) return;
    x.set(60);
    y.set(-240);
    const swing = animate(x, 0, { type: "spring", stiffness: 40, damping: 4, delay: 0.7 });
    const drop = animate(y, 0, { type: "spring", stiffness: 120, damping: 12, delay: 0.7 });
    return () => {
      swing.stop();
      drop.stop();
    };
  }, [motionOn, x, y]);

  return (
    <div data-id-card className="relative flex flex-col items-center">
      <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-px overflow-visible">
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1={-strap} x2="0" y2="0">
            <stop offset="0" stopColor="#7042f8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#7042f8" stopOpacity="0.85" />
            <stop offset="1" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
        <motion.line x1={0} y1={-strap} x2={x} y2={y} stroke={`url(#${gradientId})`} strokeWidth={12} strokeLinecap="round" />
      </svg>

      <motion.div
        data-swing
        drag={motionOn ? (finePointer ? true : "x") : false}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 120, bounceDamping: 8 }}
        style={{ x, y, rotate, transformOrigin: "50% 0%" }}
        onPointerDown={(e) => {
          press.current = { x: e.clientX, y: e.clientY };
        }}
        onClick={(e) => {
          // A press that moved was a drag, not a click.
          if (Math.hypot(e.clientX - press.current.x, e.clientY - press.current.y) > 6) return;
          setFlipped((f) => !f);
        }}
        className={cn(
          "relative select-none",
          motionOn && finePointer ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
        )}
      >
        <div
          aria-hidden="true"
          className="relative z-10 mx-auto -mb-3 h-7 w-11 rounded-md border border-white/30 bg-gradient-to-b from-gray-200 to-gray-500 shadow-md"
        >
          <div className="mx-auto mt-2 h-1.5 w-6 rounded-full bg-[#030014]/80" />
        </div>
        <div style={{ perspective: 1200 }}>
          <motion.div
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-[29rem] w-80"
          >
            <Front turnedAway={flipped} />
            <Back turnedAway={!flipped} />
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-6 flex h-8 items-center gap-3 text-xs text-gray-400">
        {mounted && (
          <>
            {motionOn && (
              <span aria-hidden="true">{finePointer ? "Drag or click the card" : "Swipe or tap the card"}</span>
            )}
            <button
              type="button"
              aria-pressed={flipped}
              onClick={() => setFlipped((f) => !f)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#7042f88b] px-3 py-1 text-gray-300 transition hover:border-[#b49bff] hover:text-white"
            >
              <ArrowPathIcon aria-hidden="true" className="h-3.5 w-3.5" />
              Flip card
            </button>
          </>
        )}
      </div>
    </div>
  );
};
