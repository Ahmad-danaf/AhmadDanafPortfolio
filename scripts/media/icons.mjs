// Builds the navbar logo and the favicon set from one transparent logo.
// Usage: node scripts/media/icons.mjs <logo.png>
//   public/media/brand/logo-ad.png  navbar mark, trimmed
//   app/icon1.png       16px favicon
//   app/icon2.png       32px favicon
//   app/favicon.ico     16, 32 and 48px
//   app/apple-icon.png  180px on the site background (iOS turns transparency black)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

// Packs PNG images into one .ico file (PNG entries, supported since Windows Vista).
export function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// The logo trimmed of its empty margin and centred on a square canvas.
async function square(input, size, padding, background = CLEAR) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(input).trim().resize(inner, inner, { fit: "contain", background: CLEAR }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [input] = process.argv.slice(2);
  if (!input) {
    console.error("usage: icons.mjs <logo.png>");
    process.exit(1);
  }
  await sharp(input).trim().resize({ width: 400 }).png().toFile("public/media/brand/logo-ad.png");
  const icon16 = await square(input, 16, 0);
  const icon32 = await square(input, 32, 0.03);
  writeFileSync("app/icon1.png", icon16);
  writeFileSync("app/icon2.png", icon32);
  writeFileSync(
    "app/favicon.ico",
    toIco([
      { size: 16, png: icon16 },
      { size: 32, png: icon32 },
      { size: 48, png: await square(input, 48, 0.05) },
    ]),
  );
  writeFileSync("app/apple-icon.png", await square(input, 180, 0.16, "#030014"));
  console.log("wrote public/media/brand/logo-ad.png, app/icon1.png, app/icon2.png, app/favicon.ico, app/apple-icon.png");
}
