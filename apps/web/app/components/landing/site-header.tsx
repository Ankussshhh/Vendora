import { nav } from "./content";
import { LinkButton, TextLink, wrapClass } from "./ui";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Vendora, back to top" className={`inline-flex min-h-11 items-center font-serif leading-none tracking-[-0.02em] ${className}`}>
      Vendora<span aria-hidden="true" className="text-accent">.</span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-(--header-h) border-b border-rule bg-paper">
      <div className={`${wrapClass} grid h-full grid-cols-[1fr_auto] items-center gap-6 min-[721px]:grid-cols-[1fr_auto_1fr]`}>
        <Wordmark className="text-[1.6rem]" />
        <nav aria-label="Primary" className="hidden min-[721px]:block">
          <ul className="flex gap-8 text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <TextLink href={n.href}>{n.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-4 text-[0.95rem] min-[721px]:gap-6">
          <TextLink href="#early-access">Log in</TextLink>
          <LinkButton href="#early-access" variant="ink" className="!min-h-11">
            Create account
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
