import type { ReactNode } from "react";
import cn from "classnames";
import { Pattern } from "@/app/_components/pattern";

export const TONES = {
  yellow: "bg-yellow-light",
  blue: "bg-blue-light",
  red: "bg-red-light",
  green: "bg-green-light",
} as const;

export type Tone = keyof typeof TONES;
export const WAY_FOR_TONE = { yellow: "yellow", blue: "blue", red: "red", green: "blue" } as const;

// Banner type one: a pastel block with a big light heading, one button,
// and a pattern strip along its foot. `sticky` pins it under the header as
// the page scrolls, so a column of them stacks, each covering the last.
export function Banner({
  tone = "yellow",
  way = WAY_FOR_TONE[tone],
  heading,
  large = false,
  sticky = false,
  children,
}: {
  tone?: Tone;
  way?: "blue" | "red" | "yellow";
  heading: ReactNode;
  large?: boolean;
  sticky?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden", TONES[tone], sticky && "md:sticky md:top-[170px]")}>
      <div className="flex flex-col items-start gap-8 px-6 py-12 md:px-12 md:py-14">
        <p className={cn("max-w-[880px]", large ? "banner-heading" : "h2")}>{heading}</p>
        {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
      </div>
      <Pattern way={way} />
    </div>
  );
}

export default Banner;
