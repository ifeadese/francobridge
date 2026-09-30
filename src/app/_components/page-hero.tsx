import Container from "@/app/_components/container";

type Props = {
  eyebrow?: string;
  title: string;
  sub?: string;
  fr?: string;
  children?: React.ReactNode;
};

// The first screen of an inner page: eyebrow, headline, one line under it,
// the French line, then any actions.
export function PageHero({ eyebrow, title, sub, fr, children }: Props) {
  return (
    <section className="border-b border-line">
      <Container>
        <div className="max-w-3xl py-16 md:py-24">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.05] tracking-tighter text-blue md:text-6xl">
            {title}
          </h1>
          {sub && <p className="mt-5 max-w-prose text-lg text-ink/85 md:text-xl">{sub}</p>}
          {fr && (
            <p className="fr-line mt-2 text-lg" lang="fr">
              {fr}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
