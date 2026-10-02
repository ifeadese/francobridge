import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { HeaderSurface } from "@/app/_components/header-surface";
import { MobileNav } from "@/app/_components/mobile-nav";
import { BookButton } from "@/app/_components/book-button";
import { NAV } from "@/lib/constants";

// Fixed, white with a hairline below, except at the top of the home page,
// where it is clear and the hero's fade shows through (see HeaderSurface).
// The lockup at the left, the links at the right, and the one button always
// in view beside the menu on phones.
export function Header() {
  return (
    <HeaderSurface>
      <div className="container-fb flex h-24 items-center justify-between gap-4 md:h-[124px] md:gap-12">
        <Link href="/" className="shrink-0" aria-label="FrancoBridge home">
          <Logo variant="stacked" on="ivory" className="h-14 w-auto md:h-[84px]" />
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-1.5 text-[17px] text-black transition-colors hover:text-blue">
                {item.label}
              </Link>
            ))}
          </nav>
          <BookButton className="whitespace-nowrap max-md:px-3 max-md:text-[15px] md:ml-3" size="sm" />
          <MobileNav />
        </div>
      </div>
    </HeaderSurface>
  );
}

export default Header;
