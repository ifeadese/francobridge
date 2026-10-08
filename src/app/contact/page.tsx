import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { RequestForm } from "@/app/_components/request-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with FrancoBridge. Tell us a little about what you need, and we’ll get back to you.",
};

// The contact page: a title, one line on what to write, then the form, on
// the page column, as wide as the header and footer. The phone numbers and
// email are in the footer; booking lives in the header on every page.
export default function Contact() {
  return (
    <main>
      <Hero
        title="How can we help?"
        text="Tell us a little about what you need, and we’ll get back to you."
        compact
        wide
      />
      <section className="mt-4">
        <div className="container-fb">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
