import { example, type StageId } from "./content";
import { labelClass } from "./ui";

const panel = "rounded-[6px] bg-sheet p-5 shadow-sheet sm:p-6";

export function MessagePanel({ className = "" }: { className?: string }) {
  return (
    <section className={`${panel} ${className}`} aria-label="Customer message">
      <p className={labelClass}>Customer message</p>
      <p className="mt-3 font-serif text-[1.35rem] leading-[1.35]">{example.message}</p>
    </section>
  );
}

export function VariantPanel({ className = "" }: { className?: string }) {
  const rows = [
    ["Item", example.item],
    ["Asked for", String(example.asked)],
    ["On hand", String(example.onHand)],
  ];
  return (
    <section className={`${panel} ${className}`} aria-label="Matched variant and stock">
      <p className={labelClass}>Matched variant and stock</p>
      <dl className="mt-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-rule py-2 last:border-0">
            <dt className="text-ink-soft">{k}</dt>
            <dd className="text-right tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
        <span aria-hidden="true" className="flex gap-1">
          {Array.from({ length: example.onHand }, (_, i) => (
            <span key={i} className={`h-3 w-5 rounded-[2px] ${i < example.asked ? "bg-accent" : "bg-ink/20"}`} />
          ))}
        </span>
        Enough on hand
      </p>
    </section>
  );
}

export function DraftPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`${panel} ${className}`} aria-label="Draft order">
      <div className="flex items-center justify-between gap-3">
        <p className={labelClass}>Draft order</p>
        <span className="rounded-[3px] border-[1.5px] border-accent px-2.5 py-0.5 text-[0.8rem] font-bold uppercase tracking-[0.04em] text-accent">
          Draft
        </span>
      </div>
      <p className="mt-3">{example.draftLine}</p>
      <p className="mt-1 text-sm text-ink-soft">{example.draftStatus}</p>
    </section>
  );
}

export function FulfilmentPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`${panel} ${className}`} aria-label="Order fulfilment">
      <p className={labelClass}>Fulfilment</p>
      <ol className="mt-3 space-y-2">
        {example.fulfilmentSteps.map((s) => {
          const now = s === example.fulfilmentNow;
          return (
            <li key={s} className={`flex items-center gap-3 ${now ? "font-semibold" : "text-ink-soft"}`}>
              <span aria-hidden="true" className={`size-2.5 rounded-full ${now ? "bg-accent" : "bg-ink/25"}`} />
              {s}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-ink-soft">The conversation stays attached.</p>
    </section>
  );
}

const byId = { message: MessagePanel, variant: VariantPanel, draft: DraftPanel, fulfilment: FulfilmentPanel } as const;

export function ExamplePanel({ id, className }: { id: StageId; className?: string }) {
  const Panel = byId[id];
  return <Panel className={className} />;
}
