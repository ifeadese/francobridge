import type { Metadata } from "next";
import { BookButton } from "@/app/_components/book-button";
import { CalInline } from "@/app/_components/cal-inline";
import { Hero } from "@/app/_components/hero";
import { RequestForm } from "@/app/_components/request-form";
import { ServiceGlyph } from "@/app/_components/service-glyph";
import { Tertiary } from "@/app/_components/tertiary";
import { CAL, CONSULTATION, CONTACT, IMAGES, LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation, book a lesson, or request information from FrancoBridge Consulting Inc. in Ottawa and online.",
};

const WAYS = [
  ["map", "Find us", `${LOCATION.city}. ${LOCATION.reach}: every consultation and lesson runs online, with in-person options in Ottawa as the school grows.`, "View on map", "https://maps.google.com/?q=Ottawa,+Ontario"],
  ["mail", "Email us", "Whether you are weighing an exam, a job or a study programme, write a few lines and we will reply with what we would suggest and what it costs.", "Send email", `mailto:${CONTACT.email}`],
  ["calendar", "Book a lesson", "Private lessons now, semi-private as groups form. One booking link shows the options available.", "Open bookings", `https://cal.com/${CAL.lesson}`],
] as const;

export default function Contact() {
  return (
    <main>
      <Hero
        title="Book a time, or ask a question"
        text={`The fastest way to start is a consultation: ${CONSULTATION.label}, including your French level assessment.`}
        image={IMAGES.heroContact}
      >
        <BookButton />
      </Hero>

      <section className="section">
        <div className="container-fb">
          <h2 className="h2 mb-14 max-w-[432px]">Stay connected with the school</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {WAYS.map(([glyph, title, text, link, href]) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block bg-grey-3 transition-colors hover:bg-grey-8">
                <ServiceGlyph slug={glyph} className="mb-10 h-10 w-10 text-black" />
                <div className="mb-8 max-w-[420px]">
                  <h4 className="h4 mb-4">{title}</h4>
                  <p className="regular-m">{text}</p>
                </div>
                <Tertiary as="span">{link}</Tertiary>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-fb grid gap-12 md:grid-cols-[4.1fr_7fr] md:gap-[120px]">
          <div className="flex flex-col gap-6">
            <h2 className="h2">Pick a time that suits you</h2>
            <p className="regular-l max-w-[420px]">
              {CONSULTATION.minutes} minutes online. ${CONSULTATION.price} {CONSULTATION.currency}, paid when you book.
              You will get a video link by email.
            </p>
          </div>
          <CalInline event="consultation" />
        </div>
      </section>

      <section className="section">
        <div className="container-fb grid gap-12 md:grid-cols-[4.1fr_7fr] md:gap-[120px]">
          <div className="flex flex-col gap-6">
            <h2 className="h2">Reach out to us</h2>
            <p className="regular-l max-w-[420px]">
              Not sure which programme? Tell us where you are heading: an exam date, a job, a study programme, a
              move.
            </p>
          </div>
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
