import { Pattern } from "@/app/_components/pattern";
import { Tertiary } from "@/app/_components/tertiary";

// The French line as a closing banner: the brand's "two lines" with the
// French in the lead for once, set at banner scale in the italic, its
// English under it, a ringed-arrow link at the right, and the pattern strip
// along the foot like every banner on the site. It paints no background of
// its own: the section it closes carries the colour, on the home page a
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
      <div className="container-fb flex flex-col gap-8 pb-10 pt-14 md:flex-row md:items-end md:justify-between md:pb-12 md:pt-20">
        <div className="flex max-w-[880px] flex-col gap-4">
          <p className="banner-heading italic" lang="fr">
            {line}
          </p>
          <p className="regular-l text-grey-80">{english}</p>
        </div>
        <div className="shrink-0 md:pb-2">
          <Tertiary href={href}>{link}</Tertiary>
        </div>
      </div>
      <Pattern way="yellow" />
    </div>
  );
}

export default FrenchLine;
