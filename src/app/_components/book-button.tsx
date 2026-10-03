import type { ReactNode } from "react";
import Link from "next/link";
import cn from "classnames";
import { BOOK_PATH } from "@/lib/constants";
import { RING, RingArrow } from "@/app/_components/ring";

type Props = {
  event?: "consultation" | "lesson";
  /** For a lesson: the program to open the calendar on, by service slug. */
  service?: string;
  /** "ring" is the large ringed arrow alone; the label becomes its name. */
  look?: "primary" | "secondary" | "ring";
  size?: "md" | "sm";
  className?: string;
  children?: ReactNode;
};

// Goes to the booking page with the right card open: the consultation for
// new students, a lesson (and, from a service page, its program) for
// returning ones. The query picks the card; #book brings it into view.
export function BookButton({
  event = "consultation",
  service,
  look = event === "consultation" ? "primary" : "secondary",
  size = "md",
  className,
  children,
}: Props) {
  const query = new URLSearchParams({ book: event, ...(service ? { service } : {}) });
  const label = children ?? (event === "consultation" ? "Book a consultation" : "Book a lesson");
  return (
    <Link
      href={`${BOOK_PATH}?${query}#book`}
      aria-label={look === "ring" ? String(label) : undefined}
      className={cn(
        look === "ring" ? RING : look === "primary" ? "button-primary" : "button-secondary",
        look !== "ring" && size === "sm" && "button-small",
        className
      )}
    >
      {look === "ring" ? <RingArrow /> : label}
    </Link>
  );
}

export default BookButton;
