import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";

import { SKILL_GROUPS } from "../../content/skills.ts";

test("every skill icon exists in public/skills", () => {
  for (const group of SKILL_GROUPS)
    for (const skill of group.skills)
      assert.ok(existsSync(`public/skills/${skill.icon}`), `${skill.name}: missing ${skill.icon}`);
});

test("no unused icons are left in public/skills", () => {
  const used = new Set(SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.icon)));
  const orphans = readdirSync("public/skills").filter((f) => !used.has(f));
  assert.deepEqual(orphans, []);
});
