"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { workflow } from "./content";
import { ExamplePanel } from "./example-panels";
import { usePinnedScene } from "./use-media";
import { labelClass, wrapClass } from "./ui";

type Stage = (typeof workflow.stages)[number];
const total = workflow.stages.length;
const f = 0.05; // half-width of the hand-over between two stages

function StageText({ stage, lineY }: { stage: Stage; lineY?: MotionValue<string> }) {
  return (
    <>
      <p className={labelClass}>{stage.who}</p>
      <h3 className="mt-3 block overflow-clip pb-[0.1em] font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em]">
        <motion.span className="block" style={lineY ? { y: lineY } : undefined}>
          {stage.title}
        </motion.span>
      </h3>
      <p className="mt-4 max-w-[40ch] text-ink-soft">{stage.body}</p>
    </>
  );
}

/** One stage of the film. It dollies in (small to full), holds, then pushes past the lens as the next arrives. */
function LiveStage({ stage, index, progress }: { stage: Stage; index: number; progress: MotionValue<number> }) {
  const a = index / total;
  const b = (index + 1) / total;
  const first = index === 0;
  const last = index === total - 1;
  const span = [a - f, a + f, b - f, b + f];
  const opacity = useTransform(progress, span, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const scale = useTransform(progress, span, [first ? 1 : 0.92, 1, 1, last ? 1 : 1.08]);
  const lineY = useTransform(progress, [a - f, a + f * 1.6], [first ? "0%" : "108%", "0%"]);
  const inner = useTransform(progress, [a - f, a + f * 2], [first ? 1 : 1.14, 1]);

  return (
    <motion.li
      className="col-start-1 row-start-1 grid grid-cols-12 items-center gap-8"
      style={{ opacity, scale }}
    >
      <div className="col-span-5">
        <StageText stage={stage} lineY={lineY} />
      </div>
      <motion.div className="col-span-7" style={{ scale: inner }}>
        <ExamplePanel id={stage.id} className="mx-auto max-w-2xl !p-8 text-[1.15rem]" />
      </motion.div>
    </motion.li>
  );
}

function StepperItem({ stage, index, progress }: { stage: Stage; index: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  return (
    <li>
      <span className="text-[0.9rem] text-ink-soft">{stage.title}</span>
      <span className="mt-2 block h-0.5 bg-rule">
        <motion.span className="block h-full origin-left bg-accent" style={{ scaleX: fill }} />
      </span>
    </li>
  );
}

function StaticStage({ stage }: { stage: Stage }) {
  return (
    <li className="grid gap-6 border-t border-rule py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <div className="md:col-span-5">
        <StageText stage={stage} />
      </div>
      <div className="md:col-span-7">
        <ExamplePanel id={stage.id} className="max-w-xl" />
      </div>
    </li>
  );
}

/**
 * The main sequence, shown as one continuous shot rather than four cards. All
 * four stages are always in the DOM, in order. On wide screens the section pins
 * for 220svh and the stages hand over by zoom and mask; elsewhere (mobile,
 * reduced motion, no JS) they are four plain rows.
 */
export function WorkflowSequence() {
  const ref = useRef<HTMLElement>(null);
  const live = usePinnedScene();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  return (
    <section
      id="workflow"
      ref={ref}
      aria-labelledby="workflow-title"
      data-live={live}
      className={`border-t border-rule bg-paper-deep ${live ? "h-[220svh]" : "py-20 lg:py-28"}`}
    >
      <div
        className={
          live
            ? "sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col justify-center gap-8 overflow-clip"
            : ""
        }
      >
        <div className={wrapClass}>
          <h2 id="workflow-title" className="max-w-[24ch] font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
            {workflow.title}
          </h2>
          {live && (
            <ol aria-hidden="true" className="mt-8 grid grid-cols-4 gap-4">
              {workflow.stages.map((s, i) => (
                <StepperItem key={s.id} stage={s} index={i} progress={progress} />
              ))}
            </ol>
          )}
        </div>
        <div className={`${wrapClass} ${live ? "" : "mt-10"}`}>
          <ol className={live ? "grid" : ""}>
            {workflow.stages.map((s, i) =>
              live ? <LiveStage key={s.id} stage={s} index={i} progress={progress} /> : <StaticStage key={s.id} stage={s} />,
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
