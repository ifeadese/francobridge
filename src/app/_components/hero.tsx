import type { ReactNode } from "react";
import cn from "classnames";
import { BackLink } from "@/app/_components/back-link";

// The internal-page hero: text at the bottom left, in the page column so it
// lines up with everything below, a photo filling the right half, 600px tall
// on desktop. Without an image the text block stands alone. Above the title,
// the way back: home unless the page passes its parent.
// The home page has its own in page.tsx.
export function Hero({
  title,
  text,
  image,
  imageAlt = "",
  compact = true,
  back,
  align = "start",
  children,
}: {
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  /** The compact spacing is the default; pass false for the roomier opening. */
  compact?: boolean;
  /** Where the back link goes. Home by default. */
  back?: { href: string; label: string };
  /** A centred 760px column, text ranged left inside it, for a page that is
      one column, like the contact form. Only without a photo. */
  align?: "start" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center" && !image;
  return (
    <section className="flex flex-col pt-[104px] md:flex-row md:pt-[124px]">
      <div
        className={cn(
          "flex flex-1 flex-col items-start justify-end",
          // The centred column is the form's width, placed on the page's axis.
          centered && "mx-auto w-full max-w-[calc(760px+2*var(--gutter))]",
          compact ? "gap-6 pb-6 pt-14 md:pb-8 md:pt-16" : "gap-10 py-[88px] md:py-20",
          // Without a photo the text sits in the page column. Beside a photo
          // it keeps the column's left edge but may run to the photo.
          image ? "px-[var(--gutter)] md:min-w-[560px] md:pl-[max(var(--gutter),calc((100vw-1280px)/2+var(--gutter)))]" : "container-fb",
        )}
      >
        <BackLink {...back} />
        <h1 className="h1 max-w-[760px]">{title}</h1>
        {text && <p className={cn("regular-l", centered ? "max-w-none" : "max-w-[560px]")}>{text}</p>}
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
