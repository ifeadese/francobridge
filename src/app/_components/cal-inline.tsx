"use client";

import Cal from "@calcom/embed-react";
import { CAL } from "@/lib/constants";

// The booking calendar, embedded on the page (the contact page). The frame
// keeps its height while cal.com loads, or when the handle is still the
// placeholder, so the page never collapses.
export function CalInline({ event = "consultation" }: { event?: "consultation" | "lesson" }) {
  const link = CAL[event];
  return (
    <div>
      <div className="min-h-[640px] overflow-hidden rounded-2xl border border-line bg-white">
        <Cal
          namespace={event}
          calLink={link}
          style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      </div>
      <p className="mt-3 text-sm text-slate">
        If the calendar does not load,{" "}
        <a href={`https://cal.com/${link}`} target="_blank" rel="noreferrer" className="font-semibold text-blue hover:underline">
          open it on cal.com
        </a>
        .
      </p>
    </div>
  );
}

export default CalInline;
