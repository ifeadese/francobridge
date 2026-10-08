import cn from "classnames";

// The large ringed arrow that closes a section: a hollow ring in the blue,
// 72px on phones and 96px up, filling with the blue on hover like
// every outlined thing. The element around it (a Link or an anchor) takes
// RING as its className and carries the name for screen readers; the arrow
// goes inside.
export const RING =
  "group flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-blue text-blue transition-colors hover:border-blue hover:bg-blue hover:text-white md:h-24 md:w-24";

export function RingArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-8 md:h-10 md:w-10", className)}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
