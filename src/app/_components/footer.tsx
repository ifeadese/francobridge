import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { CONTACT, LEGAL_NAME, LOCATION, NAV, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// On the light grey: the mark, tagline and contact at the left, the links at
// the right, then the legal line.
export function Footer() {
  return (
    <footer className="bg-grey-3 pb-28 pt-16">
      <div className="container-fb">
        <div className="mb-20 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Logo variant="stacked" on="ivory" className="w-64" />
            <p className="regular-m mt-4 max-w-[320px]">{SITE_TAGLINE}</p>
            <p className="fr-line text-[18px]" lang="fr">
              {SITE_TAGLINE_FR}
            </p>
            <p className="regular-m mt-4">{LOCATION.city}</p>
            <a href={`mailto:${CONTACT.email}`} className="regular-m self-start underline decoration-black/40 underline-offset-4 hover:decoration-black">
              {CONTACT.email}
            </a>
          </div>
          <div className="grid gap-12 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <p className="h4 text-[24px]">Services</p>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="regular-m py-1 transition-colors hover:text-blue">
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
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-grey-8 pt-6">
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
