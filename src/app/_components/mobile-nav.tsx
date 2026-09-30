"use client";

import { useState } from "react";
import Link from "next/link";
import { BookButton } from "@/app/_components/book-button";
import { NAV } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center text-black"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {open ? <path d="M6 6l16 16M22 6L6 22" /> : <path d="M4 8h20M4 14h20M4 20h20" />}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[81px] z-40 flex flex-col gap-14 bg-white px-6 py-10">
          <nav className="flex flex-col items-start gap-4" aria-label="Main">
            <Link href="/" onClick={() => setOpen(false)} className="py-1.5 text-[21px]">
              Home
            </Link>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-1.5 text-[21px]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-start gap-4">
            <BookButton />
            <BookButton event="lesson" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
