import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { Marquee } from "@/app/_components/marquee";
import { CONTACT, LEGAL_NAME, LOCATION, NAV, SITE_TAGLINE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// A gradient from the pale yellow, where the home page's closing banner ends,
// through the red tint into the blue tint: the marquee along the top, then
// the mark, tagline and contact at the left, the links at the right, and
// the legal line.
export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-yellow-light via-red-light to-blue-light pb-10">
      <Marquee />
      <div className="container-fb pt-10 md:pt-12">
        {/* The mark and contact at the left, shrinking to their content, and
            the link columns packed beside them, each as wide as its longest
            line, so nothing wraps above phone width and no width goes idle
            between the columns. */}
        <div className="mb-20 flex flex-col gap-12 md:flex-row md:items-start md:gap-20">
          <div className="flex min-w-0 flex-col gap-4">
            <Logo variant="stacked" on="ivory" className="w-56" />
            <p className="regular-m">{SITE_TAGLINE}</p>
            <p className="regular-m">{LOCATION.city}</p>
            <a href={`mailto:${CONTACT.email}`} className="regular-m self-start underline decoration-black/40 underline-offset-4 hover:decoration-black">
              {CONTACT.email}
            </a>
          </div>
          <div className="flex shrink-0 gap-10 sm:gap-20">
            <div className="flex flex-col gap-3">
              <p className="h4 text-[24px]">Services</p>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="regular-m py-1 transition-colors hover:text-blue sm:whitespace-nowrap">
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h4 text-[24px]">School</p>
              <div className="flex flex-col gap-1">
                <Link href="/" className="regular-m py-1 transition-colors hover:text-blue">
                  Home
                </Link>
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} className="regular-m py-1 transition-colors hover:text-blue">
                    {item.label}
                  </Link>
                ))}
                <Link href="/blog" className="regular-m py-1 transition-colors hover:text-blue">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-6">
          <p className="regular-s text-grey-80">
            &copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
          </p>
          <p className="regular-s max-w-[760px] text-grey-80">
            Preparation fees do not include official TCF or TEF examination fees. Immigration information only;
            regulated advice is referred to an authorized professional. Photographs: Wikimedia Commons
            contributors, CC licences.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
