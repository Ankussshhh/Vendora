import { example } from "./content";
import { labelClass } from "./ui";

/** The hero's physical editorial sheet: one order record, a second sheet peeking from behind. */
export function OrderSheet() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-[6px] bg-paper-deep shadow-sheet" />
      <div
        role="group"
        aria-label={example.label}
        className="relative -rotate-[1.5deg] rounded-[6px] bg-sheet p-6 shadow-sheet motion-safe:animate-sheet-in sm:p-8 lg:min-h-[28rem]"
        style={{ animationDelay: "320ms" }}
      >
        <div className={`flex items-center justify-between border-b border-rule pb-3.5 ${labelClass}`}>
          <span>{example.label}</span>
          <span className="rounded-[3px] border-[1.5px] border-accent px-2.5 py-0.5 font-bold text-accent">Draft</span>
        </div>
        <div className="border-b border-rule py-5">
          <p className={labelClass}>Customer message</p>
          <p className="mt-2 font-serif text-[1.4rem] leading-[1.35]">{example.message}</p>
        </div>
        <div className="border-b border-rule py-5">
          <p className={labelClass}>Matched variant and stock</p>
          <dl className="mt-2 text-[0.95rem]">
            {[
              ["Item", example.item],
              ["Asked for", String(example.asked)],
              ["On hand", String(example.onHand)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-1">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pt-5">
          <p className={labelClass}>Order</p>
          <p className="mt-1.5">{example.draftLine}, {example.draftStatus.toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
}
