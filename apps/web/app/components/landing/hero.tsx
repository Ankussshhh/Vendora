import { hero } from "./content";
import { OrderSheet } from "./order-sheet";
import { Parallax } from "./motion-parts";
import { LinkButton, grid12, wrapClass } from "./ui";

/** Typography enters once, line by line, through a mask. CSS only: visible without JS. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-var(--header-h))] items-center overflow-clip py-12 lg:py-16"
    >
      <div className={`${wrapClass} ${grid12} items-center`}>
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="font-serif text-[clamp(2.3rem,5.1vw,5.25rem)] leading-[1.02] tracking-[-0.025em]"
          >
            {hero.lines.map((line, i) => (
              <span key={line} className="-mb-[0.1em] block overflow-clip pb-[0.1em]">
                <span
                  className="block motion-safe:animate-mask-up"
                  style={{ animationDelay: `${i * 110 + 80}ms` }}
                >
                  {line}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p
            className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.2rem)] text-ink-soft motion-safe:animate-rise"
            style={{ animationDelay: "520ms" }}
          >
            {hero.lede}
          </p>
          <div className="mt-9 motion-safe:animate-rise" style={{ animationDelay: "620ms" }}>
            <LinkButton href={hero.cta.href} variant="accent" className="w-full sm:w-auto">
              {hero.cta.label}
            </LinkButton>
          </div>
          <p className="mt-7 text-[0.9rem] text-ink-soft motion-safe:animate-rise" style={{ animationDelay: "700ms" }}>
            {hero.note}
          </p>
        </div>
        <div className="lg:col-span-5">
          <Parallax rate={28}>
            <OrderSheet />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
