import cn from "classnames";

// The wave from the client's pamphlet: a field of one brand colour rising and
// falling across the width in one S-curve, with a sweep of a second colour
// along its crest. The pamphlet draws it as two copies of the same curve, the
// sweep behind and the field in front, offset so the sweep shows as a sliver
// that is nothing at the left edge and widest past the crest. These are the
// pamphlet's own curves (its inside spread, the two left panels), in its
// units. The field fills to the bottom of the box, so a wave set at the foot
// of a section runs straight into whatever follows in the field's colour.
//
// The box stretches to its container (the curve is gentle enough to take
// it), so set the width and height with className.
const BLUE = "#283990";
const GOLD = "#D2AC66";
const RED = "#C42040";

const VARIANTS = {
  blue: { field: BLUE, sweep: GOLD },
  gold: { field: GOLD, sweep: BLUE },
  red: { field: BLUE, sweep: RED },
} as const;
export type WaveVariant = keyof typeof VARIANTS;

const BOX = { x: 0, y: 200, width: 561.2, height: 240 };
const BOTTOM = BOX.y + BOX.height + 1;
const SWEEP = `M0 321.4C159.8 145 280.6 284.8 280.6 284.8C280.6 284.8 416 470.7 561.2 377V${BOTTOM}H0Z`;
const FIELD = `M0 321.4C159.8 155.4 280.7 312.2 280.7 312.2C280.6 312.2 410.5 482.6 561.2 400V${BOTTOM}H0Z`;

export function Wave({
  variant = "blue",
  flip = false,
  className,
}: {
  variant?: WaveVariant;
  /** Mirror it, so the crest falls on the right. */
  flip?: boolean;
  className?: string;
}) {
  const { field, sweep } = VARIANTS[variant];
  return (
    <svg
      viewBox={`${BOX.x} ${BOX.y} ${BOX.width} ${BOX.height}`}
      preserveAspectRatio="none"
      className={cn("block w-full", flip && "-scale-x-100", className)}
      aria-hidden="true"
    >
      <path fill={sweep} d={SWEEP} />
      <path fill={field} d={FIELD} />
    </svg>
  );
}

export default Wave;
