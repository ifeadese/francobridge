import type { ReactNode } from "react";
import cn from "classnames";

// The internal-page hero: text at the bottom left, in the page column so it
// lines up with everything below, a photo filling the right half, 600px tall
// on desktop. Without an image the text block stands alone.
// The home page has its own in page.tsx.
export function Hero({
  title,
  text,
  image,
  imageAlt = "",
  compact = false,
  children,
}: {
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  /** Less padding above and below, for a page that keeps its sections close. */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="flex flex-col pt-[88px] md:flex-row">
      <div
        className={cn(
          "flex flex-1 flex-col items-start justify-end",
          compact ? "gap-6 pb-6 pt-14 md:pb-8 md:pt-16" : "gap-10 py-[88px] md:py-20",
          // Without a photo the text sits in the page column. Beside a photo
          // it keeps the column's left edge but may run to the photo.
          image ? "px-[var(--gutter)] md:min-w-[560px] md:pl-[max(var(--gutter),calc((100vw-1280px)/2+var(--gutter)))]" : "container-fb",
        )}
      >
        <h1 className="h1 max-w-[760px]">{title}</h1>
        {text && <p className="regular-l max-w-[560px]">{text}</p>}
        {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
      </div>
      {image && (
        <div
          className="flex min-h-[420px] w-full items-end bg-grey-3 bg-cover bg-[50%_35%] md:min-h-[600px] md:w-1/2"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={imageAlt}
        />
      )}
    </section>
  );
}

export default Hero;
