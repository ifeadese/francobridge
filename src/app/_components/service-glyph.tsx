// One simple line glyph per service or audience, in currentColor, on a
// 48-unit grid with a 1.5 stroke. Placeholders until the icon set is drawn.
const glyphs: Record<string, React.ReactNode> = {
  "tcf-tef-preparation": (
    <>
      <path d="M12 6h18l8 8v28H12z" />
      <path d="M30 6v8h8M18 26l5 5 9-10" />
    </>
  ),
  "professional-french": (
    <>
      <rect x="6" y="16" width="36" height="24" rx="3" />
      <path d="M18 16v-5h12v5M6 27h36" />
    </>
  ),
  "general-french": <path d="M6 40h9V30H6zM19.5 40h9V22h-9zM33 40h9V12h-9z" />,
  "bilingual-interview-preparation": <path d="M24 44V10M24 14h14l4 4-4 4H24M24 26H10l-4 4 4 4h14" />,
  "academic-support": <path d="M4 18l20-8 20 8-20 8zM12 22v10c0 3 6 6 12 6s12-3 12-6V22M40 18v10" />,
  "sle-preparation": (
    <>
      <rect x="6" y="16" width="36" height="24" rx="3" />
      <path d="M18 16v-5h12v5M6 27h36" />
    </>
  ),
  "immigration-pathways": (
    <path d="M24 6l3 7 5-3-1 8 7-2-4 7 6 3-8 3 3 6-8-2-3 8-3-8-8 2 3-6-8-3 6-3-4-7 7 2-1-8 5 3z" />
  ),
  translation: (
    <>
      <path d="M6 10h20v14H14l-6 5v-5H6zM22 24h20v14h-2v5l-6-5H22z" />
      <path d="M12 20l3-7 3 7M13.5 17.5h3M28 35v-7h5M28 31.5h4" />
    </>
  ),
  // audiences
  immigrants: <path d="M8 40V18l16-10 16 10v22M18 40V28h12v12M6 40h36" />,
  newcomers: <path d="M24 6a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 42c2-8 8-12 16-12s14 4 16 12" />,
  students: <path d="M4 18l20-8 20 8-20 8zM12 22v10c0 3 6 6 12 6s12-3 12-6V22M40 18v10" />,
  professionals: <path d="M6 14h36v26H6zM18 14v-4h12v4M6 26h36M20 26v4h8v-4" />,
  // steps and contact
  clock: <path d="M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM24 14v10l7 5" />,
  map: <path d="M24 44s14-12 14-24a14 14 0 1 0-28 0c0 12 14 24 14 24zM24 26a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />,
  mail: <path d="M6 12h36v24H6zM6 14l18 13 18-13" />,
  calendar: <path d="M6 12h36v30H6zM6 20h36M16 6v10M32 6v10" />,
};

export function ServiceGlyph({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyphs[slug]}
    </svg>
  );
}

export default ServiceGlyph;
