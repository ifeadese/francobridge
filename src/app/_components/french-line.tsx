import Link from "next/link";
import { Pattern } from "@/app/_components/pattern";

// The French line as a closing banner: the brand's "two lines" with the
// French in the lead for once, set at banner scale, its English under it,
// and the pattern strip along the foot like every banner on the site. The
// row is two halves: the lines in the left, and in the right, level with
// their foot, the page's last button. It paints no background of its own:
// the section it closes carries the colour, on the home page a gradient
// from the white down to the yellow. English is the door; French is the
// room.
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
      <div className="container-fb grid gap-8 pb-10 pt-14 md:grid-cols-2 md:items-end md:gap-12 md:pb-12 md:pt-20">
        <div className="flex flex-col gap-4">
          <p className="banner-heading" lang="fr">
            {line}
          </p>
          <p className="regular-l text-navy/70">{english}</p>
        </div>
        <div className="md:pb-2">
          <Link href={href} className="button-primary">
            {link}
          </Link>
        </div>
      </div>
      <Pattern way="yellow" />
    </div>
  );
}

export default FrenchLine;
