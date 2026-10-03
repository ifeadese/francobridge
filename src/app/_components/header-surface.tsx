"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

// Whether the phone menu is open. The surface owns it, because an open menu
// is the same pane as the bar, stretched down to the bottom of the window.
const MenuContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({
  open: false,
  setOpen: () => {},
});
export const useMenu = () => useContext(MenuContext);

// The header's surface. On the home page it starts clear, so the hero's fade
// runs up behind the nav to the top of the window, and as soon as the page
// scrolls it becomes a pane of frosted glass: a light white tint over a strong
// blur, so the page shows through it. Everywhere else it is that pane from
// the start. A faint rule closes its bottom edge: navy at a tenth on the
// light pane, ivory at a fifth over a dark surface.
//
// The header also watches what is under it. When a dark surface, any element
// with data-surface="dark" such as the footer, scrolls up behind the logo,
// the header sets data-dark and its tint turns navy; the logo, links and
// button inside it pick that up through group-data-[dark] and switch to
// their light treatment, so they stay legible on it.
//
// When the phone menu opens, the pane always shows and runs to the bottom of
// the window (animating its height), the menu sits on it under the bar, and the page behind is held
// still until it closes.
export function HeaderSurface({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

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

  // A new page closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    // Hold the page still behind the menu.
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    // Escape closes it, and so does widening past the phone layout, where
    // the menu is hidden and would otherwise leave the page locked.
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const clear = home && !scrolled && !open;
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <header ref={ref} data-dark={dark ? "" : undefined} className="group fixed inset-x-0 top-0 z-50">
        {/* The pane sits behind the nav as its own layer, so its blur does not
            become the containing block for the menu that opens on it. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 border-b border-navy/10 bg-white/35 backdrop-blur-xl transition-[opacity,background-color,border-color,height] [transition-duration:300ms,300ms,300ms,500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[dark]:border-ivory/20 group-data-[dark]:bg-navy/40 motion-reduce:transition-none",
            // Draws back up only once the menu's rows have gone (the delays
            // follow the order of the transition's properties).
            open ? "h-dvh" : "h-full [transition-delay:0ms,0ms,0ms,150ms]",
            clear ? "opacity-0" : "opacity-100"
          )}
        />
        {children}
      </header>
    </MenuContext.Provider>
  );
}

export default HeaderSurface;
