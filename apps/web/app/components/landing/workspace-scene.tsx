"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { example, workspace } from "./content";
import { DraftPanel, FulfilmentPanel, MessagePanel, VariantPanel } from "./example-panels";
import { useLayer } from "./motion-parts";
import { usePinnedScene } from "./use-media";
import { grid12, labelClass, wrapClass } from "./ui";

/**
 * The transformation scene. On wide screens the section is 240svh tall and its
 * stage pins while native scroll drives it: the sample sheet (message only, at
 * about half size) zooms out to a full workspace as the variant, draft and
 * fulfilment layers travel in at different rates. Only transform and opacity
 * are animated. Without JS, on narrow screens and under reduced motion the same
 * DOM is a plain stacked workspace, already complete.
 */
export function WorkspaceScene() {
  const ref = useRef<HTMLElement>(null);
  const live = usePinnedScene();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  const scale = useTransform(p, [0, 0.62], [0.64, 1]);
  const chrome = useTransform(p, [0.08, 0.4], [0, 1]);
  const backplateY = useTransform(p, [0, 1], ["0%", "-3%"]);
  const rail = useLayer(p, { range: [0.2, 0.46], x: "-30%" });
  const message = useLayer(p, { range: [0, 0.36], x: "92%", y: "6%", rotate: -2.5 });
  const variant = useLayer(p, { range: [0.14, 0.46], x: "14%", y: "70%", rotate: 2 });
  const draft = useLayer(p, { range: [0.3, 0.6], x: "-24%", y: "120%", rotate: -2 });
  const fulfil = useLayer(p, { range: [0.44, 0.74], x: "40%", y: "160%", rotate: 1.5 });
  // The message layer is the sheet itself: visible from the first frame.
  const messageStyle = { x: message.x, y: message.y, rotate: message.rotate };

  return (
    <section
      id="workspace"
      ref={ref}
      aria-labelledby="workspace-title"
      data-live={live}
      className={`border-t border-rule bg-paper-deep ${live ? "h-[240svh]" : "py-20 lg:py-28"}`}
    >
      <div
        className={
          live
            ? "sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col justify-center gap-10 overflow-clip"
            : ""
        }
      >
        <div className={`${wrapClass} ${grid12} items-end`}>
          <h2 id="workspace-title" className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em] lg:col-span-7">
            {workspace.title}
          </h2>
          <p className="max-w-[44ch] text-ink-soft lg:col-span-5">{workspace.lede}</p>
        </div>

        <div className={`${wrapClass} ${live ? "" : "mt-12"}`}>
          <motion.div
            role="group"
            aria-label={example.workspaceLabel}
            className="relative origin-center"
            style={live ? { scale } : undefined}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-[8px] bg-paper shadow-sheet"
              style={live ? { opacity: chrome, y: backplateY } : undefined}
            />
            <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[9rem_1fr] lg:gap-6 lg:p-6">
              <motion.nav
                aria-label="Example workspace sections"
                className="hidden lg:block"
                style={live ? { opacity: rail.opacity, x: rail.x } : undefined}
              >
                <p className={`${labelClass} mb-3`}>Workspace</p>
                <ul className="space-y-1">
                  {example.rail.map((r, i) => (
                    <li key={r} className={`flex min-h-11 items-center border-b border-rule ${i === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8rem] text-ink-soft">Illustrative. Not live product UI.</p>
              </motion.nav>

              <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
                <motion.div className="lg:col-span-5 lg:row-span-2" style={live ? messageStyle : undefined}>
                  <MessagePanel className="h-full lg:flex lg:flex-col lg:justify-center" />
                </motion.div>
                <motion.div className="lg:col-span-7" style={live ? variant : undefined}>
                  <VariantPanel className="h-full" />
                </motion.div>
                <motion.div className="lg:col-span-4" style={live ? draft : undefined}>
                  <DraftPanel className="h-full" />
                </motion.div>
                <motion.div className="lg:col-span-3" style={live ? fulfil : undefined}>
                  <FulfilmentPanel className="h-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
