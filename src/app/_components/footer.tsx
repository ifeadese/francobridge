import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { Marquee } from "@/app/_components/marquee";
import { CONTACT, LEGAL_NAME, NAV, SITE_TAGLINE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// The logo's navy, with the mark inverted on it: the marquee along the top,
// then the mark, tagline, contact and copyright at the left, the links at
// the right, and the fee and advice note under a rule, all in ivory. The
// left column always keeps room for the lockup; on tablets the services
// column wraps its longer names to make that room. The legal lines are
// spaced so the column ends level with the link columns at every width. Marked
// as a dark surface so the header switches to its light treatment over it.
export function Footer() {
  return (
    <footer data-surface="dark" className="bg-navy pb-8 text-ivory md:pb-10">
      <Marquee />
      <div className="container-fb pt-8 md:pt-12">
        <div className="mb-8 flex flex-col gap-8 md:mb-16 md:flex-row md:items-stretch md:gap-8 lg:mb-20 lg:gap-20">
          <div className="order-last flex min-w-0 flex-col gap-3 md:order-none md:min-w-[256px] md:flex-1">
            <Logo variant="stacked" on="blue" className="h-20 w-auto self-start md:h-[88px] lg:h-[108px]" />
            <div className="mt-5 flex flex-col gap-1 md:mt-3.5 lg:mt-2.5">
              <p className="whitespace-nowrap py-1 text-[14px] leading-[1.5] lg:py-0.5">
                &copy; {new Date().getFullYear()} {LEGAL_NAME}
              </p>
              <p className="py-1 text-[14px] leading-[1.5] lg:py-0.5">All rights reserved.</p>
              <a href={`mailto:${CONTACT.email}`} className="self-start py-1 text-[14px] leading-[1.5] underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory lg:py-0.5">
                {CONTACT.email}
              </a>
              <p className="py-1 text-[14px] leading-[1.5] lg:py-0.5">Ottawa, Canada</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-20 md:min-w-0 md:gap-8 lg:shrink-0 lg:gap-20">
            <div className="flex flex-col gap-1">
              <p className="h4 mb-2 py-1 text-[19px] text-ivory">FrancoBridge</p>
              <div className="flex flex-col gap-1">
                <Link href="/" className="py-1 text-[15px] leading-[1.5] transition-colors hover:text-yellow">
                  Home
                </Link>
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} className="py-1 text-[15px] leading-[1.5] transition-colors hover:text-yellow">
                    {item.label}
                  </Link>
                ))}
                <Link href="/blog" className="py-1 text-[15px] leading-[1.5] transition-colors hover:text-yellow">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="h4 mb-2 py-1 text-[19px] text-ivory">Services</p>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="py-1 text-[15px] leading-[1.5] transition-colors hover:text-yellow sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap">
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* The tagline, on its own between the columns and the legal note:
            one sentence per line, large and faint, in the heading face. */}
        <div className="pb-4 md:pb-10">
          <p className="font-heading text-[clamp(25px,7.4vw,96px)] leading-[1.1] text-ivory/20">
            {SITE_TAGLINE.split(". ").map((sentence, i, all) => (
              <span key={sentence} className="block">
                {i < all.length - 1 ? `${sentence}.` : sentence}
              </span>
            ))}
          </p>
        </div>
        <div className="border-t border-ivory/20 pt-4 md:pt-6">
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
