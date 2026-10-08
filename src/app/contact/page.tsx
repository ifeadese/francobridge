import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { RequestForm } from "@/app/_components/request-form";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell FrancoBridge where French needs to take you, and we will reply with what we would suggest and what it costs.",
};

const LINK =
  "underline decoration-blue/40 underline-offset-4 transition-colors hover:text-blue/70 hover:decoration-blue";

// The contact page: a title, one line on what to write, one line with the
// phone numbers and the email for anyone who would rather talk, then the
// form, on the page column, as wide as the header and footer. Booking lives
// in the header on every page.
export default function Contact() {
  const [first, second] = CONTACT.phones;
  return (
    <main>
      <Hero
        title="How can we help?"
        text="An exam date, a job, a study program, a move. Write a few lines and we will reply with what we would suggest and what it costs."
        compact
        wide
      >
        <p className="regular-l">
          Rather talk it through? Call{" "}
          <a href={`tel:${first.tel}`} className={`whitespace-nowrap ${LINK}`}>
            {first.display}
          </a>{" "}
          or{" "}
          <a href={`tel:${second.tel}`} className={`whitespace-nowrap ${LINK}`}>
            {second.display}
          </a>
          , or email{" "}
          <a href={`mailto:${CONTACT.email}`} className={`break-words ${LINK}`}>
            {CONTACT.email}
          </a>
          .
        </p>
      </Hero>
      <section className="section-tight">
        <div className="container-fb">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
