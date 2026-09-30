import type { ReactNode } from "react";

// The internal-page hero: text at the bottom left, a photo filling the right
// half, 600px tall on desktop. Without an image the text block stands alone.
// The home page has its own in page.tsx.
export function Hero({
  title,
  text,
  image,
  imageAlt = "",
  children,
}: {
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="flex flex-col pt-[88px] md:flex-row">
      <div className="flex flex-1 flex-col items-start justify-end gap-10 px-6 py-[88px] md:min-w-[560px] md:px-16 md:py-20">
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
