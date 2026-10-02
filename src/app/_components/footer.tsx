import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { Marquee } from "@/app/_components/marquee";
import { CONTACT, LEGAL_NAME, NAV, SITE_TAGLINE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// The light blue of the service cards, in navy ink: the marquee along the
// top, then the mark, tagline, contact and copyright at the left, the links
// at the right, and the fee and advice note under a rule.
export function Footer() {
  return (
    <footer className="bg-blue-light pb-8 text-navy md:pb-10">
      <Marquee />
      <div className="container-fb pt-8 md:pt-12">
        <div className="mb-8 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-stretch lg:gap-20">
          <div className="order-last flex min-w-0 flex-col gap-3 lg:order-none lg:justify-between">
            <Logo variant="stacked" on="ivory" className="h-20 w-auto self-start md:h-[108px]" />
            <div className="mt-5 flex flex-col gap-1">
              <p className="regular-s py-1">
                &copy; {new Date().getFullYear()} {LEGAL_NAME}
              </p>
              <p className="regular-s py-1">All rights reserved.</p>
              <a href={`mailto:${CONTACT.email}`} className="regular-s self-start py-1 underline decoration-navy/40 underline-offset-4 hover:decoration-navy">
                {CONTACT.email}
              </a>
              <p className="regular-s py-1">Ottawa, Canada</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-20 lg:shrink-0">
            <div className="flex flex-col gap-1">
              <p className="h4 mb-2 py-1 text-[24px] text-navy">FrancoBridge</p>
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
            <div className="flex flex-col gap-1">
              <p className="h4 mb-2 py-1 text-[24px] text-navy">Services</p>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="regular-m py-1 transition-colors hover:text-blue sm:whitespace-nowrap">
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
          <p className="font-heading text-[clamp(25px,7.4vw,96px)] leading-[1.1] text-navy/20">
            {SITE_TAGLINE.split(". ").map((sentence, i, all) => (
              <span key={sentence} className="block">
                {i < all.length - 1 ? `${sentence}.` : sentence}
              </span>
            ))}
          </p>
        </div>
        <div className="border-t border-navy/20 pt-4 md:pt-6">
          <p className="regular-s max-w-[760px] text-navy/70">
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
