import Link from "next/link";
import { Logo } from "@/app/_components/logo";
import { BookButton } from "@/app/_components/book-button";
import { CONSULTATION, CONTACT, LEGAL_NAME, LOCATION, NAV, SITE_TAGLINE_FR } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// On the light grey: one last ask for the consultation at the left, the link
// columns at the right, then the lockup with the French line, then the legal
// lines. Option D from the footer canvas.
export function Footer() {
  return (
    <footer className="bg-grey-3 pb-8 pt-12 md:pt-16">
      <div className="container-fb flex flex-col gap-9 md:gap-12">
        <div className="grid gap-9 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col gap-4 md:col-span-6 md:gap-5 md:pr-16">
            <p className="h2 max-w-[560px]">Start with a one-hour consultation. Leave with your level and a plan.</p>
            <p className="regular-s text-grey-80 md:text-[15px]">{CONSULTATION.label} · includes your French level assessment</p>
            <BookButton className="self-start" />
          </div>
          <div className="grid grid-cols-2 gap-7 border-t border-grey-8 pt-7 md:col-span-6 md:grid-cols-3 md:border-t-0 md:pt-0">
            <div className="flex flex-col gap-3">
              <p className="h4 text-[22px] md:text-[24px]">Services</p>
              <div className="flex flex-col gap-2.5">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="regular-s transition-colors hover:text-blue md:text-[15px]">
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h4 text-[22px] md:text-[24px]">School</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/" className="regular-s transition-colors hover:text-blue md:text-[15px]">
                  Home
                </Link>
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} className="regular-s transition-colors hover:text-blue md:text-[15px]">
                    {item.label}
                  </Link>
                ))}
                <Link href="/blog" className="regular-s transition-colors hover:text-blue md:text-[15px]">
                  Blog
                </Link>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
              <p className="h4 text-[22px] md:text-[24px]">Contact</p>
              <div className="flex flex-col gap-2">
                <p className="regular-s md:text-[15px]">{LOCATION.city}</p>
                <a href={`mailto:${CONTACT.email}`} className="regular-s self-start underline decoration-black/40 underline-offset-4 hover:decoration-black md:text-[15px]">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-grey-8 pt-5 md:flex-row md:items-center md:justify-between md:pt-6">
          <Link href="/" aria-label="FrancoBridge home" className="self-start">
            <Logo variant="horizontal" on="ivory" className="h-9 w-auto md:h-10" />
          </Link>
          <p className="fr-line text-[17px] md:text-[18px]" lang="fr">
            {SITE_TAGLINE_FR}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 md:flex-row md:items-start md:justify-between md:gap-12">
          <p className="regular-s text-grey-80">
            &copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
          </p>
          <p className="regular-s max-w-[640px] text-grey-80 md:text-right">
            Preparation fees do not include official TCF or TEF examination fees. Immigration information only;
            regulated advice is referred to an authorized professional. Photographs: Wikimedia Commons contributors,
            CC licences.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
