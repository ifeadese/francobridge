"use client";

import { useEffect, useRef } from "react";

// Drift: slides its child to the left as the page scrolls down, a fraction
// of the scroll distance, so a watermark seems to move at its own pace
// behind the content. One transform per animation frame, nothing on React's
// side, and no movement for anyone who prefers reduced motion.
export function Drift({ rate = 0.35, className = "", children }: { rate?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = () => {
      frame = 0;
      el.style.transform = `translate3d(${-window.scrollY * rate}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };
    move();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rate]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }} aria-hidden="true">
      {children}
    </div>
  );
}

export default Drift;
