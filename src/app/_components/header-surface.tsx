"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

// The header's surface. On the home page it starts clear, so the hero's fade
// runs up behind the nav to the top of the window, and as soon as the page
// scrolls it becomes a pane of frosted glass: a light white tint over a strong
// blur, so the page shows through it. Everywhere else it is that pane from
// the start. A faint rule closes its bottom edge: black at a tenth on the
// light pane, ivory at a fifth over a dark surface.
//
// The header also watches what is under it. When a dark surface, any element
// with data-surface="dark" such as the footer, scrolls up behind the logo,
// the header sets data-dark and its tint turns navy; the logo, links and
// button inside it pick that up through group-data-[dark] and switch to
// their light treatment, so they stay legible on it.
export function HeaderSurface({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      // Dark if a dark surface covers the vertical middle of the header.
      const y = (ref.current?.getBoundingClientRect().height ?? 0) / 2;
      const over = Array.from(document.querySelectorAll<HTMLElement>('[data-surface="dark"]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark(over);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const clear = home && !scrolled;
  return (
    <header ref={ref} data-dark={dark ? "" : undefined} className="group fixed inset-x-0 top-0 z-50">
      {/* The pane sits behind the nav as its own layer, so its blur does not
          become the containing block for the menu that opens from it. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 border-b border-black/10 bg-white/35 backdrop-blur-xl transition-[opacity,background-color,border-color] duration-300 group-data-[dark]:border-ivory/20 group-data-[dark]:bg-navy/40",
          clear ? "opacity-0" : "opacity-100"
        )}
      />
      {children}
    </header>
  );
}

export default HeaderSurface;
