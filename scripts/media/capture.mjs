// Records a poster screenshot and a slow-scroll loop of each live product.
// Usage: node scripts/media/capture.mjs [id ...]   (no ids = all targets)
import { mkdirSync, renameSync } from "node:fs";
import path from "node:path";

import { chromium } from "playwright";

import { toClip, toPoster } from "./encode.mjs";

const RAW = "scripts/media/.raw";
const OUT = "public/media/captures";
const VIEWPORT = { width: 1280, height: 800 };
const TARGETS = [
  { id: "dilsever", url: "https://www.dilsever.com/" },
  { id: "arabaiclub", url: "https://app.arabaiclub.com/" },
  // Poster only: no scrolling.
  { id: "volunteen", url: "https://www.volunteen.site/", clip: false },
];

async function capture(browser, { id, url, clip = true }) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: RAW, size: VIEWPORT },
  });
  const startedAt = Date.now();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  // Some apps keep a live connection open, so "networkidle" never fires.
  await page.waitForTimeout(3500);
  const png = path.join(RAW, `${id}.png`);
  await page.screenshot({ path: png });

  // The clip starts here, so the encoder skips the page load.
  const scrollStart = (Date.now() - startedAt) / 1000;
  for (let i = 0; i < 70; i++) {
    await page.mouse.wheel(0, 16);
    await page.waitForTimeout(100);
  }
  const video = page.video();
  await context.close();

  const rawClip = path.join(RAW, `${id}.webm`);
  renameSync(await video.path(), rawClip);
  await toPoster(png, path.join(OUT, `${id}.webp`));
  if (clip) toClip(rawClip, path.join(OUT, `${id}.webm`), { start: scrollStart, duration: 7 });
  console.log(`${id}: poster${clip ? " + clip" : ""} written (clip starts at ${scrollStart.toFixed(1)}s)`);
}

const wanted = process.argv.slice(2);
mkdirSync(RAW, { recursive: true });
const browser = await chromium.launch();
try {
  for (const t of TARGETS.filter((t) => wanted.length === 0 || wanted.includes(t.id))) {
    await capture(browser, t);
  }
} finally {
  await browser.close();
}
