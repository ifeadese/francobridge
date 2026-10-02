"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

// The header's surface. On the home page it starts clear, so the hero's fade
// runs up behind the nav to the top of the window, and as soon as the page
// scrolls it becomes a pane of frosted white with its hairline: mostly
// opaque, with the content behind it softly blurred. Everywhere else it is
// that pane from the start.
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        clear ? "border-transparent bg-transparent" : "border-grey-8/80 bg-white/75 backdrop-blur-md"
      )}
    >
      {children}
    </header>
  );
}

export default HeaderSurface;
