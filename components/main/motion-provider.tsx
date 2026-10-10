"use client";

import { MotionConfig } from "framer-motion";
import type { PropsWithChildren } from "react";

// Framer skips transform animations for users who prefer reduced motion.
export const MotionProvider = ({ children }: PropsWithChildren) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
