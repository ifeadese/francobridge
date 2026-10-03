import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/app/_components/hero";
import { BookingPaths } from "@/app/_components/booking-paths";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Book a consultation to find your French level and your program, or, if you already study with FrancoBridge, book your next lesson.",
};

// Two ways to book: the consultation for new students, a lesson for current
// ones. Both live in BookingPaths, which reads the card to open from the
// query, so it waits on the browser behind a Suspense boundary.
export default function Consultation() {
  return (
    <main>
      <Hero
        title="Start with a conversation"
        text="New to FrancoBridge? Book a consultation and we will find your level and your program together. Already studying with us? Book your next lesson."
        compact
        wide="80%"
      />
      <section className="mt-6 md:mt-8">
        <Suspense>
          <BookingPaths />
        </Suspense>
      </section>
    </main>
  );
}
