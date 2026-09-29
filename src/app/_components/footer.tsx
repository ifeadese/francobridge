import Container from "@/app/_components/container";
import { REPO_URL, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            {SITE_NAME}.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="/"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Latest posts
            </a>
            <a href={REPO_URL} className="mx-3 font-bold hover:underline">
              View on GitHub
            </a>
          </div>
        </div>
        <p className="pb-10 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Built with Next.js and
          deployed on Vercel.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
