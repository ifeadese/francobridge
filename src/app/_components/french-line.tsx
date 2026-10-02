import Link from "next/link";
import { Pattern } from "@/app/_components/pattern";

// The French line as a closing banner: the brand's "two lines" with the
// French in the lead for once, set at banner scale, its English under it,
// and the pattern strip along the foot like every banner on the site. The
// row is two halves: the lines in the left, and at the far right, on the
// text's vertical middle, the page's last link: the ringed arrow alone,
// large enough to ask to be pressed, its name carried for screen readers,
// the ring filling with the brand blue on hover like every outlined thing.
// The row holds on phones too: the French steps down a size and breaks
// where `lines` says, one short line under another. It paints no
// background of its own: the section it closes carries the colour, on the home page a
// gradient from the white down to the yellow. English is the door; French
// is the room.
export function FrenchLine({
  line,
  lines,
  english,
  href,
  link,
  className = "",
}: {
  line: string;
  /** The French broken for phones, a line per entry. Falls back to `line`. */
  lines?: readonly string[];
  english: string;
  href: string;
  link: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="container-fb grid grid-cols-[1fr_auto] items-center gap-6 pb-10 pt-14 md:grid-cols-2 md:gap-12 md:pb-12 md:pt-20">
        <div className="flex min-w-0 flex-col gap-4">
          <p className="banner-heading max-md:text-[40px]" lang="fr">
            {lines
              ? lines.map((part, i) => (
                  <span key={part}>
                    {i > 0 && <br className="md:hidden" />}
                    {i > 0 && " "}
                    {part}
                  </span>
                ))
              : line}
          </p>
          <p className="regular-l text-navy/70">{english}</p>
        </div>
        <div className="flex justify-end">
          <Link
            href={href}
            aria-label={link}
            className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-navy text-navy transition-colors hover:border-blue hover:bg-blue hover:text-ivory md:h-28 md:w-28"
          >
            <svg className="h-9 w-9 md:h-12 md:w-12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
      <Pattern way="yellow" />
    </div>
  );
}

export default FrenchLine;
