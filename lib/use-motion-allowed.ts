"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// False on the server and on the first client render, so markup always matches;
// false for users who prefer reduced motion.
export function useMotionAllowed(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !reduce;
}
