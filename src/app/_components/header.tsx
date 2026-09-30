import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { MobileNav } from "@/app/_components/mobile-nav";
import { BookButton } from "@/app/_components/book-button";
import { NAV } from "@/lib/constants";

// Fixed, white, a hairline below. The lockup at the left, the links at the
// right with the one button after them.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-grey-8 bg-white">
      <div className="container-fb flex items-center justify-between gap-12 py-5">
        <Link href="/" className="shrink-0" aria-label="FrancoBridge home">
          <Logo variant="horizontal" on="ivory" className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-1.5 text-black transition-colors hover:text-blue">
              {item.label}
            </Link>
          ))}
          <BookButton className="ml-3" size="sm" />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

export default Header;
