import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { CONTACT } from "@/lib/constants";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What happens in the consultation, what a program costs and how long it runs, which levels we teach, and what is not included.",
};

// Each question is a native disclosure: the summary row carries the question
// and a ringed plus that turns into a minus when open. No script needed.
export default function Faq() {
  return (
    <main>
      <Hero title="Some questions you probably have…" compact />

      <section className="mt-0">
        <div className="container-fb">
          <div className="max-w-[880px] border-t border-navy">
            {FAQS.map((item) => (
              <details key={item.q} className="group border-b border-navy">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="h4">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy text-navy transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-ivory" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
                      <path d="M2 7h10" />
                      <path d="M7 2v10" className="group-open:hidden" />
                    </svg>
                  </span>
                </summary>
                <div className="flex flex-col gap-4 pb-8 pr-14">
                  {item.a.map((p) => (
                    <p key={p} className="regular-l max-w-[760px]">
                      {p}
                    </p>
                  ))}
                  {item.cta === "consultation" && <BookButton className="self-start" />}
                  {item.cta === "lesson" && <BookButton event="lesson" className="self-start" />}
                  {item.cta === "contact" && (
                    <Link href="/contact" className="button-secondary button-small self-start">
                      Ask a question
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
          <p className="regular-l mt-10 max-w-[760px]">
            Something else? Send us a message at{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline decoration-navy/40 underline-offset-4 transition-colors hover:text-blue hover:decoration-blue">
              {CONTACT.email}
            </a>{" "}
            and we’ll be happy to assist.
          </p>
        </div>
      </section>
    </main>
  );
}
