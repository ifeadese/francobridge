import Link from "next/link";

// The way back, at the head of every page but the home page: the ringed
// arrow turned to point left, as on the All services link, with the name of
// the page it returns to beside it, in the blue. Defaults to home;
// detail pages pass their parent. The ring takes the current colour.
export function BackLink({ href = "/", label = "Home" }: { href?: string; label?: string }) {
  return (
    <Link href={href} aria-label={`Back to ${label.toLowerCase()}`} className="group inline-flex items-center gap-3 text-[17px] text-blue">
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 7H2M6 3L2 7l4 4" />
        </svg>
      </span>
      <span className="transition-colors group-hover:text-blue/70">{label}</span>
    </Link>
  );
}

export default BackLink;
