import Container from "@/app/_components/container";
import { BookButton } from "@/app/_components/book-button";
import { Logo } from "@/app/_components/logo";
import { CONSULTATION } from "@/lib/constants";

// Closes a page: the one thing to do, on blue.
export function CtaBand({
  title = "Start with a consultation.",
  text = "One hour online with your instructor. We find your French level, talk through your goals and leave you with a plan and a programme that fits. Paid when you book.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-blue text-ivory">
      <Container>
        <div className="grid items-center gap-10 py-20 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tighter md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-prose text-lg text-ivory/80">{text}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ivory/60">
              {CONSULTATION.label} · includes your French level assessment
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton size="lg" />
              <BookButton event="lesson" look="on-blue" size="lg" />
            </div>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <Logo variant="mark" on="blue" className="ml-auto w-56" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CtaBand;
