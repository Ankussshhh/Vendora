"use client";

import { useSyncExternalStore } from "react";

/** Subscribe to a media query. Server and first client render report `false`, so markup starts static. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
// Pinning needs room: wide, tall, and no reduced-motion preference.
const PINNED = `(min-width: 1024px) and (min-height: 760px) and ${MOTION_OK}`;

export const useMotionOk = () => useMedia(MOTION_OK);
export const usePinnedScene = () => useMedia(PINNED);
