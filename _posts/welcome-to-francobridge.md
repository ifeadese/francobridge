---
title: "Welcome to Francobridge"
excerpt: "Our first post. This site is a simple markdown blog that we are using to test the end-to-end pipeline: commit to GitHub, build on Vercel, live at francobridge.vercel.app."
coverImage: "/assets/blog/welcome/cover.jpg"
date: "2026-09-29T12:00:00.000Z"
author:
  name: Francobridge Team
  picture: "/assets/blog/authors/francobridge.svg"
ogImage:
  url: "/assets/blog/welcome/cover.jpg"
---

Welcome to the Francobridge blog. This is our first post, and its main job is to prove that the publishing pipeline works end to end.

## How publishing works

Every post is a markdown file in the `_posts` folder of the repository. To publish something new:

1. Add a markdown file to `_posts` with a title, excerpt, date, and author in the front matter.
2. Commit it and push to the `main` branch on GitHub.
3. Vercel picks up the push, builds the site, and deploys it to [francobridge.vercel.app](https://francobridge.vercel.app).

Pushing to any other branch produces a preview deployment with its own URL, so drafts can be reviewed before they go live.

## What comes next

This post exists to test the flow. Real content will follow once the pipeline is confirmed working. If you can read this on the live site, the test passed.
