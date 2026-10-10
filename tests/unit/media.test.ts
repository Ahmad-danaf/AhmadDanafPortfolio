import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { EXPERIENCE } from "../../content/experience.ts";
import { PROJECTS } from "../../content/projects.ts";
import { BACKGROUNDS, BEYOND_CODE, HERO, ID_CARD } from "../../content/site.ts";
import { collectStrings } from "./helpers.ts";

const BUDGET: Record<string, number> = { ".webp": 200_000, ".webm": 1_500_000 };

const inScope = (_p: string) => true;

const mediaPaths = [
  ...new Set(
    collectStrings([EXPERIENCE, PROJECTS, HERO, ID_CARD, BACKGROUNDS, BEYOND_CODE]).filter((s) =>
      s.startsWith("/media/"),
    ),
  ),
].filter(inScope);

test("content references media files", () => {
  assert.ok(mediaPaths.length > 0);
});

for (const p of mediaPaths) {
  test(`${p} exists and fits its size budget`, () => {
    const file = path.join("public", p);
    assert.ok(existsSync(file), `missing ${file}`);
    const budget = BUDGET[path.extname(p)];
    assert.ok(budget, `no budget for ${p}`);
    const size = statSync(file).size;
    assert.ok(size <= budget, `${p} is ${size} bytes, budget ${budget}`);
  });
}
