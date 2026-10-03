"use client";

import Link from "next/link";
import { BookButton } from "@/app/_components/book-button";
import { useMenu } from "@/app/_components/header-surface";
import { NAV } from "@/lib/constants";

const LINK = "py-1.5 text-[21px] text-navy transition-colors hover:text-blue group-data-[dark]:text-ivory group-data-[dark]:hover:text-yellow";

// The menu button, and the panel it opens. The panel stays inside the header
// and has no background of its own: it sits on the header's pane, which
// HeaderSurface stretches to the bottom of the window while the menu is open,
// so the bar and the menu read as one sheet of glass.
export function MobileNav() {
  const { open, setOpen } = useMenu();
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:text-blue group-data-[dark]:text-ivory"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {open ? <path d="M6 6l16 16M22 6L6 22" /> : <path d="M4 8h20M4 14h20M4 20h20" />}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-24 flex flex-col gap-14 overflow-y-auto overscroll-contain px-6 py-10">
          <nav className="flex flex-col items-start gap-4" aria-label="Main">
            <Link href="/" onClick={() => setOpen(false)} className={LINK}>
              Home
            </Link>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={LINK}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-start gap-4">
            <BookButton
              event="lesson"
              className="group-data-[dark]:border-ivory group-data-[dark]:text-ivory group-data-[dark]:hover:border-yellow group-data-[dark]:hover:bg-yellow group-data-[dark]:hover:text-navy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
