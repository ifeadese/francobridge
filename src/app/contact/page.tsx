import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { RequestForm } from "@/app/_components/request-form";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell FrancoBridge where French needs to take you, and we will reply with what we would suggest and what it costs.",
};

// The contact page: a title, one line, the ways to reach us, then the form
// on the page column, as wide as the header and footer. Booking lives in
// the header on every page.
export default function Contact() {
  return (
    <main>
      <Hero
        title="How can we help?"
        text="An exam date, a job, a study program, a move. Write a few lines and we will reply with what we would suggest and what it costs."
        compact
        wide
      />
      {/* Phone and email, between rules, from the business card. */}
      <section className="mt-0">
        <div className="container-fb">
          <dl className="grid border-t border-blue md:grid-cols-2">
            <div className="flex flex-col gap-2 border-b border-blue py-5 md:border-r md:pr-8">
              <dt className="regular-s text-blue/70">Call</dt>
              <dd className="flex flex-col items-start gap-1">
                {CONTACT.phones.map((phone) => (
                  <a key={phone.tel} href={`tel:${phone.tel}`} className="regular-m whitespace-nowrap underline decoration-blue/40 underline-offset-4 transition-colors hover:text-blue/70 hover:decoration-blue">
                    {phone.display}
                  </a>
                ))}
              </dd>
            </div>
            <div className="flex flex-col gap-2 border-b border-blue py-5 md:pl-8">
              <dt className="regular-s text-blue/70">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} className="regular-m break-all underline decoration-blue/40 underline-offset-4 transition-colors hover:text-blue/70 hover:decoration-blue">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-fb">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
