"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionOk } from "./use-media";

/** Layered rate: the child drifts `rate` px up and down across its pass through the viewport. */
export function Parallax({ rate, children, className = "" }: { rate: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [rate, -rate]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={ok ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}

/** Camera push: the child settles from `from` to 1 as it scrolls into view. Transform only. */
export function ScrollZoom({ from, children, className = "" }: { from: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full origin-center" style={ok ? { scale } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}

/** Maps scroll progress to one layer's entrance. The end state is the identity transform, so static layout equals the final frame. */
export function useLayer(
  p: MotionValue<number>,
  o: { range: [number, number]; x?: string; y?: string; rotate?: number },
) {
  const [a, b] = o.range;
  const x = useTransform(p, [a, b], [o.x ?? "0%", "0%"]);
  const y = useTransform(p, [a, b], [o.y ?? "0%", "0%"]);
  const rotate = useTransform(p, [a, b], [o.rotate ?? 0, 0]);
  const opacity = useTransform(p, [a, a + (b - a) * 0.6], [0, 1]);
  return { x, y, rotate, opacity };
}
