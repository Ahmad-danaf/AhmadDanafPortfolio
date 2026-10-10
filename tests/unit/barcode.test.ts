import { test } from "node:test";
import assert from "node:assert/strict";

import { code39 } from "../../lib/barcode.ts";

// Hand-checked Code 39 patterns: 1 = bar module, 0 = space module, a wide
// element is 3 modules. One character from each of the four table rows.
const STAR = "100010111011101"; // start/stop
const ZERO = "101000111011101";
const A = "111010100010111";
const M = "111011101010001";
const DOT = "111000101011101";

const cases: [string, string][] = [
  ["0", ZERO],
  ["A", A],
  ["M", M],
  [".", DOT],
];

for (const [char, pattern] of cases) {
  test(`encodes "${char}" between start and stop characters`, () => {
    assert.equal(code39(char), `${STAR}0${pattern}0${STAR}`);
  });
}

test("separates characters with one narrow space", () => {
  assert.equal(code39("AM"), `${STAR}0${A}0${M}0${STAR}`);
});

test("rejects characters Code 39 cannot encode", () => {
  assert.throws(() => code39("A@"), /cannot encode "@"/);
  assert.throws(() => code39("a"), /cannot encode "a"/);
});
