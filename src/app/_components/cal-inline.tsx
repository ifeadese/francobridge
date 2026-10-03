"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { BRAND } from "@/app/_components/logo";

// The booking calendar, inline. `calLink` is "<username>/<event>", as in the
// event's URL on cal.com. Each calendar on a page takes its own namespace.
// The frame keeps its height while cal.com loads; phones get the list of
// open slots instead of the month grid.
export function CalInline({ calLink, namespace }: { calLink: string; namespace: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: BRAND.blue } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [namespace]);

  return (
    <div>
      <div className="min-h-[640px] bg-white">
        <Cal
          namespace={namespace}
          calLink={calLink}
          style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light", useSlotsViewOnSmallScreen: "true" }}
        />
      </div>
      <p className="regular-s mt-3 text-navy/70">
        If the calendar does not load,{" "}
        <a href={`https://cal.com/${calLink}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-blue">
          open it on cal.com
        </a>
        .
      </p>
    </div>
  );
}

export default CalInline;
