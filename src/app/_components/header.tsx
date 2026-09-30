import Link from "next/link";
import Container from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";
import { BookButton } from "@/app/_components/book-button";
import { MobileNav } from "@/app/_components/mobile-nav";
import { NAV } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="FrancoBridge home">
            <Logo variant="horizontal" on="ivory" className="h-9 w-auto md:h-10" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-[15px] font-semibold text-ink hover:text-blue"
              >
                {item.label}
              </Link>
            ))}
            <BookButton />
          </nav>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

export default Header;
