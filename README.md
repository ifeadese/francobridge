# FrancoBridge

The website and brand for FrancoBridge Consulting Inc., a French language
education, TCF/TEF preparation and pathway guidance centre in Ottawa. Built
with Next.js, deployed on Vercel.

- Live site: https://francobridge.vercel.app
- Brand book: `brand/brand-book.html` (open it in a browser)

## Pages

Home, About, Services, FAQ, Contact, Consultation (booking), and one page per service under `/services/`:
TCF & TEF preparation, Professional French, General French A1–C1, Career &
education pathway guidance, Immigration pathway information, Translation.
The blog from the starter lives on at `/blog` and `/posts/<slug>`.

Service copy lives in `src/lib/services.ts`; site-wide words, the cal.com
handles and the consultation price in `src/lib/constants.ts`.

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
a hairline, split hero with the photo filling the right half and a yellow card
on it, 176px between sections, serif display type in Marcellus (the face of the logo),
black pill buttons, grey blocks, photo service tiles, and pastel banners with a
pattern strip drawn from the mark. Tokens live in `tailwind.config.ts` and
`src/app/globals.css`. Photos are Lorem Picsum placeholders listed in `IMAGES`
in `src/lib/constants.ts`.

## Brand

- `brand/brand-book.html`: one self-contained page. Story, the mark, signatures, don'ts, colour and type, in use.
- `src/app/_components/logo.tsx`: the mark as code, drawing `src/lib/logo-paths.ts`.
- `public/brand/`: SVG and PNG exports, social avatar, Open Graph image, icons.
- `brand/tools/build-logo.py`: the source of truth for the logo geometry, the arch bridge with the Peace Tower. It outlines the name and descriptor from Marcellus, so the SVGs need no fonts, and writes the app icon.
- `brand/tools/export-logo.mjs`: renders PNGs and icons with sharp and inlines the SVGs into the book.

To regenerate after a geometry change:

```bash
python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
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
