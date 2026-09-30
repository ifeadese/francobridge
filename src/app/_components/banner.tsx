import type { ReactNode } from "react";
import cn from "classnames";
import { Pattern } from "@/app/_components/pattern";

const TONES = {
  yellow: "bg-yellow-light",
  blue: "bg-blue-light",
  red: "bg-red-light",
  green: "bg-green-light",
} as const;

// Banner type one: a pastel block with a big light heading, one button,
// and a pattern strip along its foot.
export function Banner({
  tone = "yellow",
  way = "blue",
  heading,
  children,
}: {
  tone?: keyof typeof TONES;
  way?: "blue" | "red" | "yellow";
  heading: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden", TONES[tone])}>
      <div className="flex flex-col items-start gap-10 px-6 py-12 md:px-16 md:py-16">
        <p className="h2 max-w-[880px]">{heading}</p>
        {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
      </div>
      <Pattern way={way} />
    </div>
  );
}

export default Banner;
