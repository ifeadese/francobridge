import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { BookButton } from "@/app/_components/book-button";
import { CalInline } from "@/app/_components/cal-inline";
import { PageHero } from "@/app/_components/page-hero";
import { RequestForm } from "@/app/_components/request-form";
import { CONSULTATION, CONTACT, LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation, book a lesson, or request information from FrancoBridge Consulting Inc. in Ottawa and online.",
};

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Book a time, or ask a question."
        sub={`The fastest way to start is a consultation: ${CONSULTATION.label}, including your French level assessment. For anything else, write to us.`}
        fr={"« Réservez un moment, ou posez-nous une question. »"}
      >
        <BookButton event="lesson" size="lg" />
        <a href={`mailto:${CONTACT.email}`} className="btn-secondary btn-lg">
          Email {CONTACT.email}
        </a>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Book a consultation</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-4xl">
                Pick a time that suits you.
              </h2>
              <p className="mt-4 text-ink/80">
                {CONSULTATION.minutes} minutes online. ${CONSULTATION.price} {CONSULTATION.currency}, paid when you
                book. You will get a video link by email.
              </p>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                <div className="py-4">
                  <dt className="eyebrow">Where</dt>
                  <dd className="mt-1 font-semibold">{LOCATION.city}</dd>
                  <dd className="text-ink/70">{LOCATION.reach}</dd>
                </div>
                <div className="py-4">
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${CONTACT.email}`} className="font-semibold text-blue hover:underline">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="eyebrow">Lessons</dt>
                  <dd className="mt-1 text-ink/80">Private now, semi-private as groups form.</dd>
                  <dd className="mt-3">
                    <BookButton event="lesson" />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-8">
              <CalInline event="consultation" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Request information</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-4xl">
                Not sure which programme? Tell us where you are heading.
              </h2>
              <p className="mt-4 max-w-prose text-ink/80">
                An exam date, a job, a study programme, a move. Write a few lines and we will reply with what
                we would suggest and what it costs.
              </p>
            </div>
            <div className="md:col-span-7">
              <RequestForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
