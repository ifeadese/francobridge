import type { ReactNode } from "react";

// The internal-page hero: text at the bottom left, on the page gutter so it
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
      <div className={compact ? "flex flex-1 flex-col items-start justify-end gap-6 px-[var(--gutter)] pb-6 pt-14 md:min-w-[560px] md:pb-8 md:pt-16" : "flex flex-1 flex-col items-start justify-end gap-10 px-[var(--gutter)] py-[88px] md:min-w-[560px] md:py-20"}>
        <h1 className="h1 max-w-[640px]">{title}</h1>
        {text && <p className="regular-l max-w-[420px]">{text}</p>}
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
