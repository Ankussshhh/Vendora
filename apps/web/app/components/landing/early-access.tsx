import { early } from "./content";
import { LinkButton, grid12, wrapClass } from "./ui";

export function EarlyAccess() {
  return (
    <section id="early-access" aria-labelledby="early-title" className="py-24 lg:py-40">
      <div className={`${wrapClass} ${grid12}`}>
        <h2 id="early-title" className="max-w-[18ch] font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em] lg:col-span-7">
          {early.title}
        </h2>
        <div className="grid max-w-[44ch] justify-items-start gap-5 text-ink-soft lg:col-span-5">
          <p>{early.body}</p>
          <LinkButton href={early.cta.href} variant="ink">
            {early.cta.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
