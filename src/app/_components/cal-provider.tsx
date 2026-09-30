"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { BRAND } from "@/app/_components/logo";

// Loads the cal.com embed once and styles it to the brand. Any element with
// data-cal-link (see BookButton) then opens a booking popup.
const NAMESPACES = ["consultation", "lesson"] as const;

export function CalProvider() {
  useEffect(() => {
    (async () => {
      for (const namespace of NAMESPACES) {
        const cal = await getCalApi({ namespace });
        cal("ui", {
          theme: "light",
          styles: { branding: { brandColor: BRAND.blue } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      }
    })();
  }, []);
  return null;
}

export default CalProvider;
