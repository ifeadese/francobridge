import type { SVGProps } from "react";
import { COLORS, LOCKUP, MARK } from "@/lib/logo-paths";

// The FrancoBridge Consulting logo as flat vector paths: the FB monogram,
// four open strokes with round caps and joins, and beside it the wordmark,
// "FrancoBridge" in red over "Consulting" in blue, traced from the client's
// artwork so nothing here depends on a font loading. Geometry is generated
// by brand/tools/build-logo.py.
//
// On white the mark and "Consulting" take blue and "FrancoBridge" red; on
// blue everything is white, as on the client's business card and pamphlet.

export type LogoSurface = "white" | "blue" | "mono";
export type LogoVariant = "lockup" | "mark";

// The four brand colours: the logo's blue, red and white, and the gold of
// the client's collateral.
export const BRAND = { ...COLORS, gold: "#D2AC66" } as const;

type Props = Omit<SVGProps<SVGSVGElement>, "color"> & {
  variant?: LogoVariant;
  /** The surface the logo sits on. "mono" draws everything in currentColor. */
  on?: LogoSurface;
};

export function Logo({ variant = "lockup", on = "white", ...props }: Props) {
  const box = variant === "lockup" ? LOCKUP : MARK;
  const ink = on === "blue" ? BRAND.white : on === "white" ? BRAND.blue : "currentColor";
  const word = on === "white" ? BRAND.red : ink;
  const label = variant === "mark" ? "FrancoBridge" : "FrancoBridge Consulting";

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      role="img"
      aria-label={label}
      {...props}
    >
      {MARK.paths.map((d) => (
        <path
          key={d}
          fill="none"
          stroke={ink}
          strokeWidth={MARK.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={d}
        />
      ))}
      {variant === "lockup" && (
        <>
          <path fill={word} d={LOCKUP.word} />
          <path fill={ink} d={LOCKUP.descriptor} />
        </>
      )}
    </svg>
  );
}

export default Logo;
