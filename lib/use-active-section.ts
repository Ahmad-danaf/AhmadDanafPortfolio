"use client";

import { useEffect, useState } from "react";

// The id of the section crossing a thin band just above the middle of the
// viewport, or null (e.g. in the hero). Null on the server and first render.
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        setActive(ids.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
