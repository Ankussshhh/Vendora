import { footer } from "./content";
import { Wordmark } from "./site-header";
import { wrapClass } from "./ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule py-8 text-[0.9rem] text-ink-soft">
      <div className={`${wrapClass} grid items-center gap-2 min-[721px]:grid-cols-[auto_1fr_auto] min-[721px]:gap-8`}>
        <Wordmark className="text-[1.3rem] text-ink" />
        <p className="hidden text-center min-[1025px]:block">{footer.summary}</p>
        <span className="min-[721px]:col-start-3">{footer.legal}</span>
      </div>
    </footer>
  );
}
