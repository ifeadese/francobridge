# Francobridge

A simple markdown blog for Francobridge, built with Next.js and deployed on Vercel.

- Live site: https://francobridge.vercel.app
- Based on the Next.js [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) example

## Writing a post

Posts live in `_posts/` as markdown files with front matter:

```md
---
title: "Post title"
excerpt: "One or two sentences shown on the home page."
coverImage: "/assets/blog/<slug>/cover.jpg"
date: "2026-09-29T12:00:00.000Z"
author:
  name: Francobridge Team
  picture: "/assets/blog/authors/francobridge.svg"
ogImage:
  url: "/assets/blog/<slug>/cover.jpg"
---

Post body in markdown.
```

Put the cover image under `public/assets/blog/<slug>/`.

## Deploying

Push to `main` and Vercel builds and deploys to production. Any other branch gets a preview URL.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
