import cn from "classnames";

// The large ringed arrow that closes a section: a hollow ring in the navy,
// 80px on phones and 112px up, filling with the brand blue on hover like
// every outlined thing. The element around it (a Link or an anchor) takes
// RING as its className and carries the name for screen readers; the arrow
// goes inside.
export const RING =
  "group flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-navy text-navy transition-colors hover:border-blue hover:bg-blue hover:text-ivory md:h-28 md:w-28";

export function RingArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-9 w-9 md:h-12 md:w-12", className)}
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
