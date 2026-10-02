import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { Marquee } from "@/app/_components/marquee";
import { CONTACT, LEGAL_NAME, LOCATION, NAV, SITE_TAGLINE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// The logo's navy, with the mark inverted on it: the marquee along the top,
// then the mark, tagline and contact at the left, the links at the right,
// and the legal line, all in ivory.
export function Footer() {
  return (
    <footer className="bg-navy pb-10 text-ivory">
      <Marquee />
      <div className="container-fb pt-8 md:pt-12">
        {/* The mark and contact at the left, shrinking to their content, and
            the link columns packed beside them, each as wide as its longest
            line, so nothing wraps above phone width and no width goes idle
            between the columns. Stacked on phones, the links come first and
            the mark and contact close the footer. */}
        <div className="mb-12 flex flex-col gap-8 md:mb-20 md:flex-row md:items-start md:gap-20">
          <div className="order-last flex min-w-0 flex-col gap-3 md:order-none">
            <Logo variant="stacked" on="blue" className="w-56" />
            <div className="flex flex-col gap-1">
              <p className="regular-m py-1">{SITE_TAGLINE}</p>
              <p className="regular-m py-1">{LOCATION.city}</p>
              <a href={`mailto:${CONTACT.email}`} className="regular-m self-start py-1 underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory">
                {CONTACT.email}
              </a>
            </div>
          </div>
          <div className="flex shrink-0 gap-10 sm:gap-20">
            <div className="flex flex-col gap-3">
              <p className="h4 text-[24px] text-ivory">Services</p>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="regular-m py-1 transition-colors hover:text-yellow sm:whitespace-nowrap">
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h4 text-[24px] text-ivory">School</p>
              <div className="flex flex-col gap-1">
                <Link href="/" className="regular-m py-1 transition-colors hover:text-yellow">
                  Home
                </Link>
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} className="regular-m py-1 transition-colors hover:text-yellow">
                    {item.label}
                  </Link>
                ))}
                <Link href="/blog" className="regular-m py-1 transition-colors hover:text-yellow">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ivory/20 pt-6">
          <p className="regular-s text-ivory/70">
            &copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
          </p>
          <p className="regular-s max-w-[760px] text-ivory/70">
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
