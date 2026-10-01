// Exports the logo SVGs in public/brand/ to PNG, builds the app icons and the
// social images, and inlines the SVGs into brand/brand-book.html.
//
//   node brand/tools/export-logo.mjs
//
// Run brand/tools/build-logo.py first if the geometry changed.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const brandDir = path.join(root, "public", "brand");
const appDir = path.join(root, "src", "app");

const BLUE = "#0E397F";
const svgs = fs.readdirSync(brandDir).filter((f) => f.endsWith(".svg"));

// 1. PNGs: every SVG at 1x (600 px wide) and 2x (1200 px wide), transparent.
for (const file of svgs) {
  const src = fs.readFileSync(path.join(brandDir, file));
  const base = file.replace(/\.svg$/, "");
  for (const [suffix, width] of [["", 600], ["@2x", 1200]]) {
    await sharp(src, { density: 300 })
      .resize({ width })
      .png()
      .toFile(path.join(brandDir, `${base}${suffix}.png`));
  }
}

// 2. Social avatar: the mark on a blue square, 1024 px.
const mark = fs.readFileSync(path.join(brandDir, "francobridge-mark-on-blue.svg"));
const markPng = await sharp(mark, { density: 300 }).resize({ width: 680 }).png().toBuffer();
const markMeta = await sharp(markPng).metadata();
await sharp({ create: { width: 1024, height: 1024, channels: 4, background: BLUE } })
  .composite([{ input: markPng, left: (1024 - markMeta.width) / 2, top: Math.round((1024 - markMeta.height) / 2) }])
  .png()
  .toFile(path.join(brandDir, "francobridge-social-avatar.png"));

// 3. Open Graph image: the stacked lockup on blue, 1200 x 630.
const stacked = fs.readFileSync(path.join(brandDir, "francobridge-stacked-on-blue.svg"));
const stackedPng = await sharp(stacked, { density: 300 }).resize({ height: 400 }).png().toBuffer();
const stackedMeta = await sharp(stackedPng).metadata();
const og = sharp({ create: { width: 1200, height: 630, channels: 4, background: BLUE } })
  .composite([{ input: stackedPng, left: Math.round((1200 - stackedMeta.width) / 2), top: Math.round((630 - stackedMeta.height) / 2) }])
  .png();
await og.clone().toFile(path.join(brandDir, "francobridge-og.png"));
await og.clone().toFile(path.join(appDir, "opengraph-image.png"));

// 4. App icons. The favicon is the mark on a blue square; Apple gets 180 px.
const iconSvg = fs.readFileSync(path.join(appDir, "icon.svg"));
await sharp(iconSvg, { density: 300 }).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));
for (const size of [192, 512]) {
  await sharp(iconSvg, { density: 300 }).resize(size, size).png().toFile(path.join(brandDir, `francobridge-icon-${size}.png`));
}

// 5. Inline the SVGs into the brand book, so it stays one self-contained page.
const bookPath = path.join(root, "brand", "brand-book.html");
if (fs.existsSync(bookPath)) {
  let book = fs.readFileSync(bookPath, "utf8");
  let count = 0;
  book = book.replace(
    /(<(?:div|span)([^>]*)\sdata-logo="([^"]+)"([^>]*)>)([\s\S]*?)(<\/(?:div|span)>)/g,
    (m, open, _a, name, _b, _inner, close) => {
      const file = path.join(brandDir, `francobridge-${name}.svg`);
      if (!fs.existsSync(file)) return m;
      count++;
      const svg = fs.readFileSync(file, "utf8").trim().replace(/\swidth="[^"]*"\sheight="[^"]*"/, "");
      return `${open}${svg}${close}`;
    },
  );
  fs.writeFileSync(bookPath, book);
  console.log(`inlined ${count} logos into brand/brand-book.html`);
}

console.log("exported", svgs.length, "svgs to png, plus avatar, og image and icons");
