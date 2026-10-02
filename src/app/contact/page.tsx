import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { RequestForm } from "@/app/_components/request-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell FrancoBridge where you are heading and we will reply with what we would suggest and what it costs.",
};

// The contact page is the form and nothing else: a title, one line, the
// fields and the button, all on one centred column. Booking lives in the
// header on every page.
export default function Contact() {
  return (
    <main>
      <Hero
        title="Tell us where you are heading"
        text="An exam date, a job, a study programme, a move. Write a few lines and we will reply with what we would suggest and what it costs."
        compact
        align="center"
      />
      <section className="mt-0">
        <div className="container-fb">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
