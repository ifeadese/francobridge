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
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-blue"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[72px] border-b border-line bg-ivory px-5 pb-6 pt-2 shadow-md"
        >
          <nav className="flex flex-col" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-body text-lg font-semibold text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <BookButton />
            <BookButton event="lesson" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
