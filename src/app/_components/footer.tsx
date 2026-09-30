import Link from "next/link";
import Container from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";
import { BookButton } from "@/app/_components/book-button";
import { CONTACT, LEGAL_NAME, LOCATION, NAV, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export function Footer() {
  return (
    <footer className="bg-blue text-ivory">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="stacked" on="blue" className="w-44" />
            <p className="mt-8 font-heading text-2xl leading-snug">{SITE_TAGLINE}</p>
            <p className="fr-line mt-1 text-ivory/70" lang="fr">
              {SITE_TAGLINE_FR}
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-ivory/60">Services</p>
            <ul className="mt-4 space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:underline">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/60">Site</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/60">Contact</p>
            <p className="mt-4">{LOCATION.city}</p>
            <p className="text-ivory/70">{LOCATION.reach}</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-3 block hover:underline">
              {CONTACT.email}
            </a>
            <div className="mt-6">
              <BookButton look="on-blue" />
            </div>
          </div>
        </div>
        <p className="border-t border-ivory/15 py-8 text-sm text-ivory/60">
          &copy; {new Date().getFullYear()} {LEGAL_NAME}. Preparation fees do not include official TCF or TEF
          examination fees. Immigration information only; regulated advice is referred to an authorized
          professional.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
