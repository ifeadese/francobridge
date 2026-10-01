"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

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
 * Touch swipe and trackpad already move it; this adds the two paths a
 * wheel-only mouse has no way to reach: vertical wheel deltas are redirected
 * sideways while the rail can still move, so the page keeps scrolling at the
 * ends, and prev/next buttons advance one card at a time. The buttons hide
 * when everything already fits, and on touch widths where swiping is natural.
 *
 * Ported from the Lighthouse site's CardRail. Pass the scrolling element's own
 * classes as `className`; the component owns only the controls around it.
 */
export function CardRail({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  // Both true until measured, so a rail that doesn't overflow never flashes
  // a pair of live buttons on first paint.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= EDGE_SLACK);
    setAtEnd(el.scrollLeft >= max - EDGE_SLACK);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

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

  const scrollable = !(atStart && atEnd);

  return (
    <div className="card-rail" role="group" aria-label={label}>
      <div ref={rail} className={className} onKeyDown={onKeyDown}>
        {children}
      </div>
      <div className="card-rail-nav" data-scrollable={scrollable}>
        <button type="button" className="card-rail-btn card-rail-btn--prev" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous cards">
          <RailArrow direction="left" />
        </button>
        <button type="button" className="card-rail-btn" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next cards">
          <RailArrow direction="right" />
        </button>
      </div>
    </div>
  );
}

function RailArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "right" ? <path d="M2 8h12M9 3l5 5-5 5" /> : <path d="M14 8H2M7 3L2 8l5 5" />}
    </svg>
  );
}

export default CardRail;
