import Link from "next/link";

export function ArrowIcon() {
  return (
    <span className="tertiary-icon">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" />
      </svg>
    </span>
  );
}

// A word and a ringed arrow. Use inside a card (as a span) or on its own.
export function Tertiary({ href, children, as = "link" }: { href?: string; children: React.ReactNode; as?: "link" | "span" }) {
  if (as === "span" || !href) {
    return (
      <span className="tertiary">
        <span>{children}</span>
        <ArrowIcon />
      </span>
    );
  }
  return (
    <Link href={href} className="tertiary group">
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

export default Tertiary;
