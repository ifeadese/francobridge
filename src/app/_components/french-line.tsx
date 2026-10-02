import Link from "next/link";
import { Pattern } from "@/app/_components/pattern";

// The French line as a closing banner: the brand's "two lines" with the
// French in the lead for once, set at banner scale, its English under it,
// and the pattern strip along the foot like every banner on the site. The
// row is two halves: the lines in the left, and at the far right, on the
// text's vertical middle, the page's last link: the word and the ringed
// arrow of the tertiary link, set a size up, the ring filling with the
// brand blue on hover like every outlined thing. It paints no background
// of its own: the section it closes carries the colour, on the home page a
// gradient from the white down to the yellow. English is the door; French
// is the room.
export function FrenchLine({
  line,
  english,
  href,
  link,
  className = "",
}: {
  line: string;
  english: string;
  href: string;
  link: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="container-fb grid gap-8 pb-10 pt-14 md:grid-cols-2 md:items-center md:gap-12 md:pb-12 md:pt-20">
        <div className="flex flex-col gap-4">
          <p className="banner-heading" lang="fr">
            {line}
          </p>
          <p className="regular-l text-navy/70">{english}</p>
        </div>
        <div className="md:flex md:justify-end">
          <Link href={href} className="group inline-flex items-center gap-4 text-[20px] text-navy md:text-[24px]">
            <span>{link}</span>
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-navy transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-ivory md:h-16 md:w-16"
            >
              <svg width="24" height="24" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <Pattern way="yellow" />
    </div>
  );
}

export default FrenchLine;
