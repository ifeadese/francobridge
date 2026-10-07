# FrancoBridge

The website for FrancoBridge Consulting Inc., a language education and
professional development firm in Ottawa: French language coaching, exam
preparation, immigration pathway support and translation, online across
North America. Built with Next.js, deployed on Vercel.

- Live site: https://francobridge.vercel.app
- Brand book: `brand/brand-book.html` (open it in a browser)

## Pages

Home, About, Services, FAQ, Contact, Consultation (booking), and one page per service under `/services/`:
TCF/TEF and DELF/DALF exam preparation, Language coaching A1–C1, Government
of Canada Second Language Evaluation preparation, Professional French,
Interview preparation for bilingual roles, Academic support, French
immigration pathway support, Translation. The blog from the starter lives on
at `/blog` and `/posts/<slug>`.

Service copy lives in `src/lib/services.ts`; site-wide words (who we are,
mission, vision, values, the founder, the phone lines), the cal.com handles
and the consultation price in `src/lib/constants.ts`. The services and the
words are the client's own, from the pamphlet, banner and business card in
`brand/source/`.

## Booking

Every booking button goes to `/consultation`, which has two cards: **Book a
consultation** for new students, and **Book a lesson** for current students,
who pick their program and get that program's calendar. Buttons open the right
card through the query (`/consultation?book=lesson&service=general-french`).
The calendars are cal.com inline embeds; the links live in `CAL` in
`src/lib/constants.ts`.

They are placeholders: every link points at ADESE's discovery call until the
client has a cal.com account. Then create a `consultation` event (60 min,
CAD 100, paid on booking) and one event per program, and swap the links in.

## Design

The layout follows a light, editorial school template: fixed white header with
a hairline, a 1280px column, 80px between sections, display type in Figtree
semibold (the closest open face to the Avenir Next of the client's wordmark),
blue buttons, and white cards with a pattern strip. The palette is four
colours and nothing else: blue `#283990`, white, gold `#D2AC66` and red
`#C42040`. Tailwind's default colours are replaced, not extended, so no other
colour can slip in; lighter shades are the blue at reduced opacity, and the one
gradient runs from blue to white. Tokens live in `tailwind.config.ts` and
`src/app/globals.css`. Photos are Wikimedia Commons placeholders listed in
`IMAGES` in `src/lib/constants.ts` and credited in `public/images/CREDITS.md`.

## Brand

The identity is the client's own: the FB monogram with "FrancoBridge" in
red and "Consulting Inc." in blue, set in Avenir, in blue, white, gold and red.

- `brand/source/`: the client's artwork and collateral as supplied: the logo (4500 px JPEG), the pamphlet, the banner and the business card.
- `brand/brand-book.html`: one self-contained page. Story, the mark, signatures, don'ts, colour and type, in use.
- `src/app/_components/logo.tsx`: the logo as code, drawing `src/lib/logo-paths.ts`: `variant="lockup"` (mark and wordmark) or `"mark"`, `on="white"`, `"blue"` or `"mono"`.
- `public/brand/`: SVG and PNG exports, social avatar, Open Graph image, icons.
- `brand/tools/build-logo.py`: the source of truth. It redraws the monogram as clean stroke geometry measured from the artwork, traces the client's two lines from it into outlines (Avenir is not a free font, so the SVGs need none), sets "Inc." from the Avenir that ships with macOS, enlarges the wordmark by `WORDMARK_SCALE`, opens its lines by `LINE_GAP`, sizes the mark in the lockup to `MARK_TO_TEXT` times the text block with the lines centred on it, `MARK_GAP` strokes clear, and writes the app icon. It needs a Mac for that font.
- `brand/tools/export-logo.mjs`: renders PNGs and icons with sharp and inlines the SVGs into the book.

To regenerate after a change to the geometry or the artwork:

```bash
python3 -m venv .venv && .venv/bin/pip install numpy pillow potracer fonttools uharfbuzz
.venv/bin/python brand/tools/build-logo.py
node brand/tools/export-logo.mjs
```

## Writing a post

Posts live in `_posts/` as markdown files with front matter:

```md
---
title: "Post title"
excerpt: "One or two sentences shown on the blog page."
coverImage: "/assets/blog/<slug>/cover.jpg"
date: "2026-09-29T12:00:00.000Z"
author:
  name: FrancoBridge Team
  picture: "/assets/blog/authors/francobridge.svg"
ogImage:
  url: "/assets/blog/<slug>/cover.jpg"
---

Post body in markdown.
```

## Deploying

Push to `main` and Vercel builds and deploys to production. Any other branch gets a preview URL.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
