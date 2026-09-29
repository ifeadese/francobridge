import Container from "@/app/_components/container";
import { REPO_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-soft-white">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <h3 className="font-heading font-semibold text-4xl lg:text-[2.5rem] tracking-tighter leading-tight">
              {SITE_NAME}.
            </h3>
            <p className="mt-2 text-soft-white/80">{SITE_TAGLINE}</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="/"
              className="mx-3 bg-red hover:bg-soft-white hover:text-red border border-red text-white font-semibold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Latest posts
            </a>
            <a
              href={REPO_URL}
              className="mx-3 font-semibold underline decoration-1 underline-offset-4 hover:text-soft-white/70"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <p className="pb-10 text-center text-sm text-soft-white/60">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Built with Next.js and
          deployed on Vercel.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
