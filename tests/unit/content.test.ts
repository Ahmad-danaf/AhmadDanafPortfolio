import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { EXPERIENCE } from "../../content/experience.ts";
import { PROJECTS } from "../../content/projects.ts";
import {
  BEYOND_CODE,
  CONTACT,
  HERO,
  ID_CARD,
  NAV_LINKS,
  SHOW_RESUME,
  SITE,
  SOCIALS,
} from "../../content/site.ts";
import { SKILL_GROUPS } from "../../content/skills.ts";
import { collectStrings } from "./helpers.ts";

const ALL = collectStrings([
  EXPERIENCE, PROJECTS, SITE, SOCIALS, NAV_LINKS, HERO, ID_CARD, CONTACT, BEYOND_CODE, SKILL_GROUPS,
]);

// Wording rules for everything the site prints.
const FORBIDDEN: [RegExp, string][] = [
  [/\bAzure\b|\bMySQL\b|Spring Boot|\bDocker\b|FastAPI|GitLab/, "not on the skills list"],
  [/\+972|\b0\d{1,2}-?\d{3}-?\d{4}\b/, "no phone number on the site"],
  [/Sanidhya/i, "template leftover"],
  [/final year/i, "the degree is complete"],
  [/\d\+?\s*(years|yrs)\b/i, "no years-of-experience claim; the dates say it"],
  [/grew to/i, "platform numbers describe the product"],
  [/main contributor|lead engineer/i, "name what you own instead"],
  [/\d+\s*(unit\s+)?tests\b/i, "no test counts"],
];

// More rules live in a git-ignored local file, since they name private facts.
const LOCAL_RULES = new URL("./private-rules.local.json", import.meta.url);
if (existsSync(LOCAL_RULES)) {
  const rules: [string, string, string][] = JSON.parse(readFileSync(LOCAL_RULES, "utf8"));
  for (const [source, flags, why] of rules) FORBIDDEN.push([new RegExp(source, flags), why]);
}

test("no forbidden claims anywhere in the content", () => {
  for (const [pattern, why] of FORBIDDEN) {
    const hit = ALL.find((s) => pattern.test(s));
    assert.equal(hit, undefined, `${pattern} (${why}) found in: ${hit}`);
  }
});

test("experience is Volunteen, Arab AI Club, Meruba in that order", () => {
  assert.deepEqual(EXPERIENCE.map((r) => r.id), ["volunteen", "arab-ai-club", "meruba"]);
});

test("each role has 2-4 short bullets and a visual", () => {
  for (const role of EXPERIENCE) {
    assert.ok(role.bullets.length >= 2 && role.bullets.length <= 4, role.id);
    for (const b of role.bullets) assert.ok(b.length <= 240, `${role.id}: bullet too long`);
    assert.ok(role.media || role.mediaFallback, `${role.id}: needs media or mediaFallback`);
  }
});

test("the Volunteen agent stays present tense until it reaches production", () => {
  const volunteen = EXPERIENCE.find((r) => r.id === "volunteen")!;
  const agent = volunteen.bullets.find((b) => /AI agent/.test(b))!;
  assert.match(agent, /building the core of an AI agent/);
  assert.doesNotMatch(agent, /shipped|launched|in production/i);
});

test("the hero badge uses the CV and card title", () => {
  assert.ok(HERO.badge.startsWith(ID_CARD.title), HERO.badge);
});

test("projects are Dilsever, xedown, Sheet-Cell in that order", () => {
  assert.deepEqual(PROJECTS.map((p) => p.id), ["dilsever", "xedown", "sheet-cell"]);
});

test("AI-assisted projects disclose it", () => {
  for (const id of ["dilsever", "xedown"]) {
    const p = PROJECTS.find((x) => x.id === id)!;
    assert.match(p.footnote ?? "", /working with AI coding agents/, id);
  }
});

test("links are https, mailto, or site-relative, and skip the toy repos", () => {
  const urls = [
    ...EXPERIENCE.flatMap((r) => r.links.map((l) => l.url)),
    ...PROJECTS.flatMap((p) => p.links.map((l) => l.url)),
    ...SOCIALS.map((s) => s.url),
    ...NAV_LINKS.map((n) => n.link),
  ];
  for (const url of urls) {
    assert.match(url, /^(https:\/\/|mailto:|\/|#)/, url);
    assert.doesNotMatch(url, /FunLearn-Projects-Hub|GameDev/, url);
  }
});

test("Dilsever links to the live site, not the private repo", () => {
  const dilsever = PROJECTS.find((p) => p.id === "dilsever")!;
  for (const l of dilsever.links) assert.doesNotMatch(l.url, /github\.com/);
});

test("the card back and Beyond code caption the photos the same way", () => {
  assert.equal(ID_CARD.back.caption, BEYOND_CODE.credit);
});

test("the card's contact row is a mailto link to the site email", () => {
  const contact = ID_CARD.facts.find((f) => f.href);
  assert.equal(contact?.href, `mailto:${SITE.email}`);
  assert.equal(contact?.value, SITE.email);
});

test("the ID card has no availability status (Ahmad's call)", () => {
  assert.doesNotMatch(collectStrings(ID_CARD).join(" | "), /status|open to|available|looking for/i);
});

test("the ID card barcode spells the site's own domain", () => {
  assert.equal(ID_CARD.barcode, new URL(SITE.url).hostname.replace(/^www\./, "").toUpperCase());
});

test("resume stays hidden", () => {
  assert.equal(SHOW_RESUME, false);
});

test("Sheet-Cell shows no fake screenshot", () => {
  // The old image was an AI mock-up with garbled UI text. Add media here only
  // with a real screenshot of the JavaFX app.
  const sheetCell = PROJECTS.find((p) => p.id === "sheet-cell")!;
  assert.equal(sheetCell.media, undefined);
  assert.ok(sheetCell.mediaFallback);
});

test("every project has a visual", () => {
  for (const p of PROJECTS) assert.ok(p.media || p.mediaFallback, p.id);
});

test("hero proof line has three short facts", () => {
  assert.equal(HERO.proof.length, 3);
  for (const p of HERO.proof) assert.ok(p.length <= 40, p);
});
