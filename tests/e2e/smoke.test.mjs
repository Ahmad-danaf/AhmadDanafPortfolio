// Smoke tests against the production build. Run with `npm run test:e2e`.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";

import { chromium } from "playwright";

const PORT = 3123;
const BASE = `http://localhost:${PORT}`;
let server;
let browser;

async function waitForServer(url, ms = 30_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`server not up at ${url}`);
}

before(async () => {
  server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
    stdio: "ignore",
  });
  await waitForServer(BASE);
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.kill();
});

// Vercel analytics scripts 404 outside Vercel; everything else is a real error.
const isNoise = (text) => text.includes("_vercel");

async function openPage(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    const where = m.location()?.url ?? "";
    if (m.type() === "error" && !isNoise(m.text()) && !isNoise(where)) errors.push(m.text());
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  return { page, context, errors };
}

// Polls fn until it returns something truthy or time runs out.
async function until(fn, ms = 8000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await fn()) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

// The element's box once it has stopped moving (springs settled).
async function settledBox(locator) {
  let last;
  let steady = 0;
  await until(async () => {
    const box = await locator.boundingBox();
    const same = last && Math.abs(box.x - last.x) < 0.5 && Math.abs(box.y - last.y) < 0.5;
    steady = same ? steady + 1 : 0;
    last = box;
    return steady >= 3;
  });
  return last;
}

// The Flip button renders once the card is interactive (after hydration).
async function idCard(page) {
  const card = page.locator("#about-me [data-id-card]");
  const flip = card.getByRole("button", { name: "Flip card" });
  await flip.waitFor();
  return {
    card,
    flip,
    front: card.locator('[data-face="front"]'),
    back: card.locator('[data-face="back"]'),
  };
}

test("hero states the current role and links to experience and contact", async () => {
  const { page, context, errors } = await openPage();
  assert.equal(await page.title(), "Ahmad Danaf — Full-Stack Software Engineer");
  assert.match(await page.locator("h1").first().innerText(), /web and mobile apps that real people use/i);
  assert.ok((await page.locator('#about-me a[href="#experience"]').count()) > 0);
  assert.ok((await page.locator('#about-me a[href="#contact"]').count()) > 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test("navbar links point at the new sections", async () => {
  const { page, context } = await openPage();
  const hrefs = await page.locator("nav[aria-label='Primary'] a").evaluateAll((as) =>
    as.map((a) => a.getAttribute("href")),
  );
  assert.deepEqual(hrefs, ["#experience", "#projects", "#skills", "#contact"]);
  await context.close();
});

test("mobile menu fits and closes", async () => {
  const { page, context } = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.getByRole("button", { name: "Open menu" }).click();
  const width = await page.locator("nav[aria-label='Primary']").evaluate((el) => el.getBoundingClientRect().width);
  assert.ok(width <= 390, `menu is ${width}px wide`);
  await page.locator("nav[aria-label='Primary'] a").first().click();
  assert.equal(await page.locator("nav[aria-label='Primary']").isVisible(), false);
  await context.close();
});

test("open graph image is served", async () => {
  const res = await fetch(`${BASE}/opengraph-image`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /image\/png/);
});

test("experience lists the three roles in order with the honest agent status", async () => {
  const { page, context, errors } = await openPage();
  const orgs = await page.locator("#experience [data-timeline-item] h3").allInnerTexts();
  assert.deepEqual(orgs, ["Volunteen", "Arab AI Club", "Meruba"]);
  const text = await page.locator("#experience").innerText();
  assert.match(text, /building the core of an AI agent/);
  assert.match(text, /8200 Alumni Association/);
  assert.match(text, /4th place/);
  assert.equal(await page.locator("#experience [data-abstract-card]").count(), 1);
  assert.deepEqual(errors, []);
  await context.close();
});

test("projects show the three featured builds with honest links", async () => {
  const { page, context, errors } = await openPage();
  const titles = await page.locator("#projects article h3").allInnerTexts();
  assert.deepEqual(titles, ["Dilsever", "xedown", "Sheet-Cell"]);
  const hrefs = await page.locator("#projects a").evaluateAll((as) => as.map((a) => a.href));
  assert.ok(hrefs.some((h) => h.startsWith("https://www.dilsever.com")));
  assert.ok(hrefs.some((h) => h.includes("github.com/Ahmad-danaf/xedown")));
  assert.ok(!hrefs.some((h) => /FunLearn-Projects-Hub|GameDev/.test(h)));
  assert.deepEqual(errors, []);
  await context.close();
});

test("external links open safely in a new tab", async () => {
  const { page, context } = await openPage();
  const bad = await page.locator('a[href^="http"]').evaluateAll((as) =>
    as
      .filter((a) => a.target !== "_blank" || !(a.rel || "").includes("noopener"))
      .map((a) => a.href),
  );
  assert.deepEqual(bad, []);
  await context.close();
});

test("posters stay visible when clips fail", async () => {
  const { page, context } = await openPage();
  await page.route("**/*.webm", (route) => route.abort());
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#projects").scrollIntoViewIfNeeded();
  const card = page.locator("#projects article").first();
  // Let React hydrate, then move the pointer onto the media itself so the
  // (failing) clip is actually activated.
  await page.waitForTimeout(800);
  const box = await card.locator("video").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
  await page.waitForTimeout(1000);
  const state = await card.locator("video").evaluate((v) => ({
    errored: v.error !== null,
    shown: getComputedStyle(v).opacity === "1",
    poster: v.getAttribute("poster"),
  }));
  assert.ok(state.errored && state.shown, JSON.stringify(state));
  assert.match(state.poster ?? "", /\/media\/captures\/.+\.webp$/);
  const posters = await page.locator("#projects article img").evaluateAll((imgs) =>
    imgs.map((i) => i.complete && i.naturalWidth > 0),
  );
  assert.ok(posters.length > 0 && posters.every(Boolean), JSON.stringify(posters));
  await context.close();
});

test("touch devices play clips when in view", async () => {
  const { page, context } = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const card = page.locator("#projects article").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  const paused = await card.locator("video").evaluate((v) => v.paused);
  assert.equal(paused, false);
  await context.close();
});

test("skills show every icon and the names toggle", async () => {
  const { page, context, errors } = await openPage();
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page.waitForTimeout(3500);
  const icons = await page.locator("#skills img").evaluateAll((imgs) =>
    imgs.map((i) => i.complete && i.naturalWidth > 0),
  );
  assert.equal(icons.length, 25);
  assert.ok(icons.every(Boolean));
  await page.getByRole("button", { name: "Show names" }).click();
  // The icon grid fades out before the list mounts.
  await page.getByText("Cloud & DevOps: AWS", { exact: false }).waitFor();
  assert.match(await page.locator("#skills").innerText(), /Cloud & DevOps: AWS, GitHub Actions, Linux, Nginx/);
  assert.doesNotMatch(await page.locator("#skills").innerText(), /Azure|MySQL|Spring Boot|Docker/);
  assert.deepEqual(errors, []);
  await context.close();
});

test("contact offers email, LinkedIn and GitHub, and no phone", async () => {
  const { page, context } = await openPage();
  assert.equal(await page.locator('#contact a[href="mailto:ahmad.danf@gmail.com"]').count(), 1);
  assert.equal(await page.locator('#contact a[href*="linkedin.com/in/ahmad-danaf"]').count(), 1);
  assert.equal(await page.locator('#contact a[href="https://github.com/Ahmad-danaf"]').count(), 1);
  assert.doesNotMatch(await page.locator("body").innerText(), /\+972|\b0\d{1,2}-?\d{3}-?\d{4}\b/);
  await context.close();
});

test("beyond-code shows three astrophotos with a caption", async () => {
  const { page, context } = await openPage();
  assert.equal(await page.locator("#beyond-code img").count(), 3);
  assert.match(await page.locator("#beyond-code figcaption").innerText(), /From my night-sky trips/);
  await context.close();
});

test("hero ID card shows the headshot, name, title and three facts", async () => {
  const { page, context, errors } = await openPage();
  const { front } = await idCard(page);
  const text = await front.innerText();
  for (const t of [/Ahmad Danaf/, /Full-Stack Software Engineer/, /Languages/i, /Hebrew · Arabic · English/, /Degree/i, /B\.Sc\. CS, 2026/, /Contact/i]) {
    assert.match(text, t);
  }
  assert.doesNotMatch(text, /status|open to|available/i);
  assert.doesNotMatch(text, /Specialty|Based in|Founding engineer|React Native/i);
  assert.equal(await front.locator('a[href="mailto:ahmad.danf@gmail.com"]').count(), 1);
  const photo = front.locator('img[alt="Portrait of Ahmad Danaf"]');
  assert.ok(await photo.evaluate((i) => i.complete && i.naturalWidth > 0), "headshot did not load");
  assert.deepEqual(errors, []);
  await context.close();
});

test("the ID card flips on click and from the keyboard", async () => {
  const { page, context, errors } = await openPage();
  const { flip, front, back } = await idCard(page);
  assert.equal(await back.getAttribute("aria-hidden"), "true");
  await settledBox(front);
  await front.click();
  assert.ok(await until(async () => (await back.getAttribute("aria-hidden")) === "false"), "click did not flip");
  assert.equal(await flip.getAttribute("aria-pressed"), "true");
  await flip.focus();
  await page.keyboard.press("Enter");
  assert.ok(await until(async () => (await front.getAttribute("aria-hidden")) === "false"), "Enter did not flip back");
  assert.deepEqual(errors, []);
  await context.close();
});

test("dragging the ID card moves it, and it swings back to rest", async () => {
  const { page, context, errors } = await openPage();
  const { flip, front } = await idCard(page);
  const rest = await settledBox(front);
  const x = rest.x + rest.width / 2;
  const y = rest.y + rest.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 140, y + 60, { steps: 12 });
  const pulled = await front.boundingBox();
  assert.ok(pulled.x - rest.x > 60, `card did not follow the pointer (moved ${pulled.x - rest.x}px)`);
  await page.mouse.up();
  const after = await settledBox(front);
  assert.ok(Math.abs(after.x - rest.x) < 2 && Math.abs(after.y - rest.y) < 2, "card did not return to rest");
  assert.equal(await flip.getAttribute("aria-pressed"), "false", "a drag must not flip the card");
  assert.deepEqual(errors, []);
  await context.close();
});

test("on touch screens the ID card only swings sideways, so the page still scrolls", async () => {
  const { page, context } = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const { card } = await idCard(page);
  const touchAction = await card.locator("[data-swing]").evaluate((el) => getComputedStyle(el).touchAction);
  assert.equal(touchAction, "pan-y");
  await context.close();
});

test("with reduced motion the ID card stays put but still flips", async () => {
  const { page, context } = await openPage({ reducedMotion: "reduce" });
  const { flip, front, back } = await idCard(page);
  const rest = await front.boundingBox();
  const x = rest.x + rest.width / 2;
  const y = rest.y + rest.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 140, y + 60, { steps: 12 });
  const pulled = await front.boundingBox();
  await page.mouse.up();
  assert.ok(Math.abs(pulled.x - rest.x) < 1, "card moved under reduced motion");
  assert.equal(await flip.getAttribute("aria-pressed"), "false", "a drag attempt must not flip the card");
  await flip.click();
  assert.ok(await until(async () => (await back.getAttribute("aria-hidden")) === "false"), "Flip card did not flip");
  await context.close();
});

test("no horizontal scroll at 390px", async () => {
  const { page, context } = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
  });
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(width <= 390, `page is ${width}px wide`);
  await context.close();
});

test("reduced motion renders no video", async () => {
  const { page, context } = await openPage({ reducedMotion: "reduce" });
  await page.waitForTimeout(500);
  assert.equal(await page.locator("video").count(), 0);
  await context.close();
});

test("server HTML contains the key content", async () => {
  const html = await (await fetch(BASE)).text();
  for (const text of [
    "I ship web and mobile apps that real people use.",
    // Role-only strings: the org names also appear in the hero intro.
    "Founding Software Engineer", "send-rate gate", "personalized learning plans",
    "Dilsever", "xedown", "Sheet-Cell",
    "Let&#x27;s talk",
    "8200 Alumni SCoTCH venture",
  ]) {
    assert.ok(html.includes(text), `missing in SSR HTML: ${text}`);
  }
});

test("no broken images after scrolling the whole page", async () => {
  const { page, context, errors } = await openPage();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
  });
  await page.waitForTimeout(1500);
  const broken = await page.locator("img").evaluateAll((imgs) =>
    imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.currentSrc || i.src),
  );
  assert.deepEqual(broken, []);
  assert.deepEqual(errors, []);
  await context.close();
});

test("star field is a composited image layer, not WebGL", async () => {
  const { page, context, errors } = await openPage();
  await page.waitForTimeout(3500);
  assert.equal(await page.locator("canvas").count(), 0);
  assert.equal(await page.locator("[data-starfield]").count(), 1);
  assert.deepEqual(errors, []);
  await context.close();
});

test("fonts are self-hosted, not render-blocking Google CSS", async () => {
  const html = await (await fetch(BASE)).text();
  const css = await Promise.all(
    [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)].map(async ([, href]) => (await fetch(BASE + href)).text()),
  );
  assert.ok(!css.some((c) => c.includes("fonts.googleapis.com")));
});

test("content is visible without JavaScript", async () => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE);
  // Opacity multiplies down the tree, so check every ancestor too.
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('h1, [data-timeline-item], #projects article, [data-face="front"]')]
      .filter((el) => {
        let opacity = 1;
        for (let n = el; n; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
        return opacity === 0;
      })
      .map((el) => el.tagName),
  );
  assert.equal(await page.locator('[data-face="front"]').count(), 1, "ID card is not server-rendered");
  assert.deepEqual(hidden, []);
  await context.close();
});

test("phones never download the desktop-only hero video", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const requested = [];
  page.on("request", (r) => requested.push(r.url()));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  for (const name of ["hero-loop", "card-banner-loop"]) {
    assert.ok(!requested.some((u) => u.includes(name)), `${name}.webm was requested`);
  }
  await context.close();
});

test("hero carries the proof line and the stats block is gone", async () => {
  const { page, context, errors } = await openPage();
  const hero = await page.locator("#about-me").innerText();
  assert.match(hero, /iOS & Android apps in the stores/);
  assert.match(hero, /API response 3\.8 s → under 300 ms/);
  assert.match(hero, /Volunteen: 8200 Alumni SCoTCH venture/);
  assert.equal(await page.locator("#stats").count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test("contact plays the nebula loop", async () => {
  const { page, context } = await openPage();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('#contact video source[src="/media/art/nebula-loop.webm"]').count(), 1);
  await context.close();
});

test("desktop plays the site's own hero loop and the card's foil loop", async () => {
  const { page, context, errors } = await openPage();
  await page.locator('#about-me video source[src="/media/art/hero-loop.webm"]').waitFor({ state: "attached" });
  await page.locator('[data-id-card] video source[src="/media/art/card-banner-loop.webm"]').waitFor({ state: "attached" });
  assert.equal(await page.locator('video source[src*="blackhole"]').count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
});
