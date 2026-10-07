import cn from "classnames";
import { MARK } from "@/lib/logo-paths";

// A watermark drawn from the logo: the FB monogram as one faint set of
// strokes behind a section's text. It is decoration, hidden from assistive
// tech, and sits at a few percent of the ink so nothing in front of it
// loses legibility. The box is the mark's own, so the shape fills its
// viewBox.
const SHAPES = {
  mark: { box: `${MARK.x} ${MARK.y} ${MARK.width} ${MARK.height}`, tone: "text-blue opacity-[0.06]" },
} as const;

export function Watermark({ kind = "mark", className }: { kind?: keyof typeof SHAPES; className?: string }) {
  const { box, tone } = SHAPES[kind];
  return (
    <svg
      viewBox={box}
      className={cn("pointer-events-none absolute z-0 h-auto", tone, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MARK.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export default Watermark;
