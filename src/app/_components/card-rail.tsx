"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

/** Wheel deltas can arrive in lines or pages; normalise both to pixels. */
const LINE_HEIGHT = 16;

/**
 * How close to an edge counts as being at it. Sub-pixel layout means
 * scrollLeft settles a fraction short of the end, so an exact comparison never
 * reports it and the wheel would stay captured against the edge.
 */
const EDGE_SLACK = 1;

/**
 * A horizontally scrolling rail with the affordances a plain scroller lacks.
 * Touch swipe and trackpad already move it; this adds what a wheel-only
 * mouse and the keyboard have no way to reach: vertical wheel deltas are
 * redirected sideways while the rail can still move, so the page keeps
 * scrolling at the ends, and the arrow keys advance one card at a time. At
 * grid widths the rail does not overflow and all of this stays idle (see
 * .rail in globals.css).
 *
 * Ported from the Lighthouse site's CardRail, without its prev/next buttons.
 * Pass the scrolling element's own classes as `className`.
 */
export function CardRail({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const scale = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? el.clientWidth : 1;
      const delta = event.deltaY * scale;
      const max = el.scrollWidth - el.clientWidth;
      // Parked at the end the user is scrolling toward: hand the wheel back.
      if (delta <= 0 && el.scrollLeft <= EDGE_SLACK) return;
      if (delta >= 0 && el.scrollLeft >= max - EDGE_SLACK) return;
      event.preventDefault();
      el.scrollLeft += delta;
    };
    // React registers wheel listeners as passive; preventDefault needs a native one.
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const nudge = useCallback((direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-1);
    }
  };

  return (
    <div ref={rail} className={className} role="group" aria-label={label} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

export default CardRail;
