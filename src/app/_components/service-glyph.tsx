// One simple line glyph per service, in currentColor. Placeholders until the
// icon set is drawn; each is built on the same 48-unit grid and 2.5 stroke.
const glyphs: Record<string, React.ReactNode> = {
  "tcf-tef-preparation": (
    // a checked sheet
    <>
      <path d="M12 6h18l8 8v28H12z" />
      <path d="M30 6v8h8M18 26l5 5 9-10" />
    </>
  ),
  "professional-french": (
    // a briefcase
    <>
      <rect x="6" y="16" width="36" height="24" rx="3" />
      <path d="M18 16v-5h12v5M6 27h36" />
    </>
  ),
  "general-french": (
    // stacked steps: A1 to C1
    <>
      <path d="M6 40h9V30H6zM19.5 40h9V22h-9zM33 40h9V12h-9z" />
    </>
  ),
  "career-pathway-guidance": (
    // a signpost
    <>
      <path d="M24 44V10M24 14h14l4 4-4 4H24M24 26H10l-4 4 4 4h14" />
    </>
  ),
  "immigration-pathways": (
    // a maple leaf, simplified
    <>
      <path d="M24 6l3 7 5-3-1 8 7-2-4 7 6 3-8 3 3 6-8-2-3 8-3-8-8 2 3-6-8-3 6-3-4-7 7 2-1-8 5 3z" />
    </>
  ),
  translation: (
    // two speech marks, A and F
    <>
      <path d="M6 10h20v14H14l-6 5v-5H6zM22 24h20v14h-2v5l-6-5H22z" />
      <path d="M12 20l3-7 3 7M13.5 17.5h3M28 35v-7h5M28 31.5h4" />
    </>
  ),
};

export function ServiceGlyph({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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
