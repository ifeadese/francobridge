import type { ReactNode } from "react";
import cn from "classnames";
import { CAL } from "@/lib/constants";

type Props = {
  /** Which cal.com event to open. */
  event?: "consultation" | "lesson";
  /** "primary" is the red pill and is reserved for Book a consultation. */
  look?: "primary" | "secondary" | "on-blue";
  size?: "md" | "lg";
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
      className={cn(
        look === "primary" && "btn-primary",
        look === "secondary" && "btn-secondary",
        look === "on-blue" && "btn-on-blue",
        size === "lg" && "btn-lg",
        className,
      )}
    >
      {label}
    </a>
  );
}

export default BookButton;
