"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { useMenu } from "@/app/_components/header-surface";
import { NAV } from "@/lib/constants";

const ITEMS = [{ href: "/", label: "Home" }, ...NAV];
// A long, soft settle, shared by the pane in HeaderSurface.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// The menu button, and the panel it opens. The panel stays inside the header
// and has no background of its own: it sits on the header's pane, which
// HeaderSurface stretches to the bottom of the window while the menu is open,
// so the bar and the menu read as one sheet of glass.
//
// The panel is always mounted, so it can animate out as well as in. Opening,
// the three bars of the button fold into a cross, the pane runs down, and the
// rows fade in one after another, their contents rising into place; closing,
// the rows fade away together before the pane draws back up. Each row is ruled off from the
// next, fills faintly on hover, presses in on click, and shows an arrow that
// slides in; the current page keeps its arrow.
export function MobileNav() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="relative flex h-11 w-11 items-center justify-center text-navy transition-[color,transform] duration-200 hover:text-blue active:scale-90 group-data-[dark]:text-ivory group-data-[dark]:hover:text-yellow"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="relative block h-[14px] w-[22px]">
          {[
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            open ? "top-1/2 -translate-y-1/2 scale-x-0 opacity-0" : "top-1/2 -translate-y-1/2",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full",
          ].map((pos, i) => (
            <span
              key={i}
              className={cn(
                "absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                EASE,
                pos
              )}
            />
          ))}
        </span>
      </button>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-24 overflow-y-auto overscroll-contain px-6 pb-10 pt-4 transition-[visibility] duration-500",
          open ? "visible" : "invisible"
        )}
      >
        <nav aria-label="Main">
          <ul className="flex flex-col">
            {ITEMS.map((item, i) => {
              const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li
                  key={item.href}
                  // In one after another on the way in; out together on the way out.
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  className={cn(
                    // Each rule has one owner: a row draws its top and sides,
                    // the last row its bottom too, so no two lines ever stack.
                    // A hovered or focused row also darkens the next row's top,
                    // which is its own bottom edge.
                    "border-x border-t border-navy/15 transition-[opacity,border-color] last:border-b motion-reduce:transition-none",
                    "hover:border-navy/30 focus-within:border-navy/30 [&:focus-within+li]:border-t-navy/30 [&:hover+li]:border-t-navy/30",
                    "group-data-[dark]:border-ivory/20 group-data-[dark]:hover:border-ivory/40 group-data-[dark]:focus-within:border-ivory/40 group-data-[dark]:[&:focus-within+li]:border-t-ivory/40 group-data-[dark]:[&:hover+li]:border-t-ivory/40",
                    EASE,
                    open ? "opacity-100 duration-500" : "opacity-0 duration-200"
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group/item block px-4 py-4 text-[21px] text-navy outline-none transition-[background-color,color,transform] duration-200",
                      "hover:bg-navy/[0.04] focus-visible:bg-navy/[0.06] active:scale-[0.98] active:bg-navy/[0.08] motion-reduce:active:scale-100",
                      "group-data-[dark]:text-ivory group-data-[dark]:hover:bg-ivory/[0.06] group-data-[dark]:focus-visible:bg-ivory/[0.08] group-data-[dark]:active:bg-ivory/[0.12]"
                    )}
                  >
                    {/* Only the contents rise into place; the ruled box itself
                        stays put and only fades, so its lines never drift. */}
                    <span
                      style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                      className={cn(
                        "flex items-center justify-between transition-transform motion-reduce:transition-none",
                        EASE,
                        open ? "translate-y-0 duration-500" : "-translate-y-2 duration-200"
                      )}
                    >
                      <span className="transition-transform duration-300 group-hover/item:translate-x-1 motion-reduce:transform-none">
                        {item.label}
                      </span>
                      <svg
                        aria-hidden
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                          "transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                          EASE,
                          current
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100"
                        )}
                      >
                        <path d="M4 10h12M11 5l5 5-5 5" />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
