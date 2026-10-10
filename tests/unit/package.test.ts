import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

test("ffmpeg-static is optional so a failed binary download can't break deploys", () => {
  assert.equal(pkg.devDependencies?.["ffmpeg-static"], undefined);
  assert.equal(pkg.dependencies?.["ffmpeg-static"], undefined);
  assert.ok(pkg.optionalDependencies?.["ffmpeg-static"]);
});
