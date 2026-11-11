import type { ReactNode } from "react";

const press = "transition-[transform,background-color] duration-150 ease-out-expo active:scale-[0.97]";

const variants = {
  ink: "bg-ink text-paper hover:bg-[#33301f]",
  accent: "bg-accent text-white hover:bg-[#962d14]",
} as const;

export function LinkButton({
  href,
  variant,
  children,
  className = "",
}: {
  href: string;
  variant: keyof typeof variants;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-[4px] px-[22px] text-[0.95rem] font-semibold hover:-translate-y-px ${press} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Text link with an underline that draws in on hover. 44px tall target. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-[position:0_72%] bg-no-repeat transition-[background-size] duration-300 ease-out-expo hover:bg-[length:100%_1px]"
    >
      {children}
    </a>
  );
}

export const labelClass = "text-[0.8rem] uppercase tracking-[0.04em] text-ink-soft";
export const wrapClass = "mx-auto w-[min(1200px,100%-2*var(--edge))]";
export const grid12 = "grid grid-cols-1 gap-6 lg:grid-cols-12";
