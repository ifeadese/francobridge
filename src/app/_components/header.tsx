import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { MobileNav } from "@/app/_components/mobile-nav";
import { NAV } from "@/lib/constants";

type NavItem = (typeof NAV)[number];
const LEFT_HREFS: string[] = ["/about", "/services"];
const LEFT: NavItem[] = NAV.filter((item) => LEFT_HREFS.includes(item.href));
const RIGHT: NavItem[] = NAV.filter((item) => !LEFT_HREFS.includes(item.href));

function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="px-3 py-1.5 text-[17px] text-black transition-colors hover:text-blue">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// Fixed, white, a hairline below. The lockup in the centre, About and
// Services to its left, the rest to its right. On phones the lockup stays
// centred, with the menu at the right. Booking lives in the floating button.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-grey-8 bg-white">
      <div className="container-fb grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-[100px] md:gap-8">
        <nav className="contents" aria-label="Main">
          <NavLinks items={LEFT} className="hidden items-center gap-2 justify-self-start md:flex" />
          <Link href="/" className="col-start-2 shrink-0" aria-label="FrancoBridge home">
            <Logo variant="stacked" on="ivory" className="h-[68px] w-auto md:h-[84px]" />
          </Link>
          <NavLinks items={RIGHT} className="hidden items-center gap-2 justify-self-end md:flex" />
        </nav>
        <div className="col-start-3 row-start-1 justify-self-end md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
