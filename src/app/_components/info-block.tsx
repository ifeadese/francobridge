import Link from "next/link";
import { ServiceGlyph } from "@/app/_components/service-glyph";
import { Tertiary } from "@/app/_components/tertiary";

// A light grey block with an icon, a heading, a paragraph and a tertiary link.
export function InfoBlock({
  href,
  glyph,
  title,
  text,
  link = "Learn more",
}: {
  href: string;
  glyph?: string;
  title: string;
  text: string;
  link?: string;
}) {
  return (
    <Link href={href} className="group block bg-grey-3 transition-colors hover:bg-grey-8">
      {glyph && <ServiceGlyph slug={glyph} className="mb-10 h-10 w-10 text-black" />}
      <div className="flex flex-1 flex-col justify-between">
        <div className="mb-8 max-w-[420px]">
          <h4 className="h4 mb-4">{title}</h4>
          <p className="regular-m">{text}</p>
        </div>
        <Tertiary as="span">{link}</Tertiary>
      </div>
    </Link>
  );
}

export default InfoBlock;
