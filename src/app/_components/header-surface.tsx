"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

// The header's surface. On the home page it starts clear, so the hero's fade
// runs up behind the nav to the top of the window, and as soon as the page
// scrolls it becomes a pane of frosted white: mostly opaque, with the content
// behind it softly blurred. Everywhere else it is that pane from the start.
// The pane has no bottom line. It runs a little past the nav and its last
// stretch is masked to nothing, so the white and the blur dissolve into the
// page instead of ending at an edge.
const FADE = "2.5rem";

export function HeaderSurface({ children }: { children: React.ReactNode }) {
  const home = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!home) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  const clear = home && !scrolled;
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* The pane sits behind the nav as its own layer, so the mask that
          fades its bottom edge cannot clip the menu that opens from it. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 bg-white/75 backdrop-blur-md transition-opacity duration-300",
          clear ? "opacity-0" : "opacity-100"
        )}
        style={{
          bottom: `-${FADE}`,
          maskImage: `linear-gradient(to bottom, black calc(100% - ${FADE}), transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, black calc(100% - ${FADE}), transparent)`,
        }}
      />
      {children}
    </header>
  );
}

export default HeaderSurface;
