"use client";

import Cal from "@calcom/embed-react";
import { CAL } from "@/lib/constants";

// The booking calendar, embedded on the page. The frame keeps its height
// while cal.com loads, or while the handle is still the placeholder.
export function CalInline({ event = "consultation" }: { event?: "consultation" | "lesson" }) {
  const link = CAL[event];
  return (
    <div>
      <div className="min-h-[640px] border border-grey-8 bg-white">
        <Cal
          namespace={event}
          calLink={link}
          style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      </div>
      <p className="regular-s mt-3 text-navy/70">
        If the calendar does not load,{" "}
        <a href={`https://cal.com/${link}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-blue">
          open it on cal.com
        </a>
        .
      </p>
    </div>
  );
}

export default CalInline;
