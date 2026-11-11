import { textile } from "./content";
import { Parallax, ScrollZoom } from "./motion-parts";
import { grid12, wrapClass } from "./ui";

/** Code-native stand-in for a product photograph: a close view of a sand linen placket. */
function LinenPlacket() {
  return (
    <div role="img" aria-label="Illustration of a sand linen shirt placket with buttons" className="textile-weave relative h-full w-full">
      <div aria-hidden="true" className="textile-folds absolute inset-0" />
      <div aria-hidden="true" className="textile-placket absolute inset-y-0 left-[38%] w-[26%]">
        <span className="textile-stitch absolute inset-y-0 left-[9%] w-px" />
        <span className="textile-stitch absolute inset-y-0 right-[9%] w-px" />
        {[14, 40, 66, 90].map((top) => (
          <span key={top} className="textile-button absolute left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ top: `${top}%` }} />
        ))}
      </div>
    </div>
  );
}

export function TextileSection() {
  return (
    <section aria-labelledby="textile-title" className="overflow-clip border-t border-rule py-20 lg:py-28">
      <div className={`${wrapClass} ${grid12} items-center`}>
        <div className="lg:col-span-5">
          <h2 id="textile-title" className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
            {textile.title}
          </h2>
          <p className="mt-6 max-w-[46ch] text-ink-soft">{textile.body}</p>
        </div>
        <figure className="lg:col-span-7 lg:col-start-6">
          <div className="relative">
            <ScrollZoom from={1.22} className="aspect-[5/4] overflow-clip rounded-[6px] shadow-sheet">
              <LinenPlacket />
            </ScrollZoom>
            <div className="absolute bottom-6 left-4 sm:left-8">
              <Parallax rate={14}>
                <span className="inline-block rotate-[-2deg] rounded-[3px] bg-sheet px-4 py-2 font-serif text-xl shadow-sheet">
                  {textile.tag}
                </span>
              </Parallax>
            </div>
          </div>
          <figcaption className="mt-4 max-w-[52ch] text-[0.9rem] text-ink-soft">{textile.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
