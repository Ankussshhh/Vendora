import { assistance } from "./content";
import { grid12, wrapClass } from "./ui";

export function Assistance() {
  return (
    <section id="assistance" aria-labelledby="assist-title" className="bg-ink py-20 text-on-ink lg:py-32">
      <div className={`${wrapClass} ${grid12}`}>
        <div className="lg:col-span-7">
          <h2 id="assist-title" className="max-w-[18ch] font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
            {assistance.title}
          </h2>
          <p className="mt-7 max-w-[48ch] text-[1.15rem] text-on-ink-soft">{assistance.lede}</p>
        </div>
        <dl className="border-t border-on-ink/30 lg:col-span-5">
          {assistance.rules.map(([term, text]) => (
            <div key={term} className="border-b border-on-ink/30 py-5">
              <dt className="font-serif text-2xl leading-tight">{term}</dt>
              <dd className="mt-1.5 max-w-[44ch] text-on-ink-soft">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className={`${wrapClass} mt-12 text-[0.9rem] text-on-ink-soft`}>{assistance.note}</p>
    </section>
  );
}
