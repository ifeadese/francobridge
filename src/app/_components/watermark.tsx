import cn from "classnames";
import { MARK, STACKED } from "@/lib/logo-paths";

// Watermarks drawn from the logo: the bridge (arch, frame and tower), the
// name, and the maple leaf, each as one faint shape set behind a section's
// text. The home page uses the bridge; the others are here for the asking. They are decoration, hidden from assistive tech, and sit at a few
// percent of the ink so nothing in front of them loses legibility. The
// boxes are measured from the mark so each shape fills its own viewBox.
const SHAPES = {
  bridge: { box: `${MARK.x} ${MARK.y} ${MARK.width} ${MARK.height}`, paths: [MARK.arch, MARK.frame, MARK.tower], tone: "text-navy opacity-[0.05]" },
  name: { box: "70 486 860 78", paths: [STACKED.word], tone: "text-navy opacity-[0.045]" },
  leaf: { box: "461 314 78 85", paths: [MARK.leaf], tone: "text-red opacity-[0.07]" },
} as const;

export function Watermark({ kind, className }: { kind: keyof typeof SHAPES; className?: string }) {
  const { box, paths, tone } = SHAPES[kind];
  return (
    <svg viewBox={box} className={cn("pointer-events-none absolute z-0 h-auto", tone, className)} fill="currentColor" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export default Watermark;
