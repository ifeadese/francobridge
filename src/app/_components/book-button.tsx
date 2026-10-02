import type { ReactNode } from "react";
import cn from "classnames";
import { CAL } from "@/lib/constants";
import { RING, RingArrow } from "@/app/_components/ring";

type Props = {
  event?: "consultation" | "lesson";
  /** "ring" is the large ringed arrow alone; the label becomes its name. */
  look?: "primary" | "secondary" | "ring";
  size?: "md" | "sm";
  className?: string;
  children?: ReactNode;
};

// Opens the cal.com booking popup. The data attributes are picked up by the
// embed script loaded in CalProvider; without JavaScript the link still goes
// to the booking page.
export function BookButton({
  event = "consultation",
  look = event === "consultation" ? "primary" : "secondary",
  size = "md",
  className,
  children,
}: Props) {
  const link = CAL[event];
  const label = children ?? (event === "consultation" ? "Book a consultation" : "Book a lesson");
  return (
    <a
      href={`https://cal.com/${link}`}
      target="_blank"
      rel="noreferrer"
      data-cal-namespace={event}
      data-cal-link={link}
      data-cal-config='{"layout":"month_view"}'
      aria-label={look === "ring" ? String(label) : undefined}
      className={cn(
        look === "ring" ? RING : look === "primary" ? "button-primary" : "button-secondary",
        look !== "ring" && size === "sm" && "button-small",
        className
      )}
    >
      {look === "ring" ? <RingArrow /> : label}
    </a>
  );
}

export default BookButton;
