import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { HeaderSurface } from "@/app/_components/header-surface";
import { MobileNav } from "@/app/_components/mobile-nav";
import { BookButton } from "@/app/_components/book-button";
import { NAV } from "@/lib/constants";

// Fixed, frosted glass with a faint rule under it, except at the top
// of the home page, where it is clear and the hero's fade shows through (see
// HeaderSurface). The lockup at the left, the links at the right, and the
// one button always in view beside the menu on phones. Over a dark surface
// the header carries data-dark, and everything here swaps to its light
// treatment: the inverted lockup, ivory links and an ivory button. The
// button is the logo's navy on the light pane, brand blue on hover.
export function Header() {
  return (
    <HeaderSurface>
      <div className="container-fb flex h-24 items-center justify-between gap-4 md:h-[124px] md:gap-12">
        <Link href="/" className="grid shrink-0" aria-label="FrancoBridge home">
          {/* Both lockups, stacked in one cell, and the one for the surface
              under the header faded in. */}
          <Logo
            variant="stacked"
            on="ivory"
            className="h-14 w-auto transition-opacity duration-300 [grid-area:1/1] group-data-[dark]:opacity-0 md:h-[84px]"
          />
          <Logo
            variant="stacked"
            on="blue"
            aria-hidden
            className="h-14 w-auto opacity-0 transition-opacity duration-300 [grid-area:1/1] group-data-[dark]:opacity-100 md:h-[84px]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-[17px] text-black transition-colors hover:text-blue group-data-[dark]:text-ivory group-data-[dark]:hover:text-yellow"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <BookButton
            className="whitespace-nowrap bg-navy text-ivory transition-colors hover:bg-blue max-md:px-3 max-md:text-[15px] md:ml-3 group-data-[dark]:bg-ivory group-data-[dark]:text-navy group-data-[dark]:hover:bg-white"
            size="sm"
          />
          <MobileNav />
        </div>
      </div>
    </HeaderSurface>
  );
}

export default Header;
