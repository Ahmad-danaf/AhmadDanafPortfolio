import { test } from "node:test";
import assert from "node:assert/strict";

import { toIco } from "../../scripts/media/icons.mjs";

test("packs PNGs behind an icon directory, in order", () => {
  const ico = toIco([
    { size: 16, png: Buffer.from([1, 2, 3]) },
    { size: 32, png: Buffer.from([4, 5]) },
  ]);
  // Header: reserved 0, type 1 (icon), 2 images.
  assert.deepEqual([...ico.subarray(0, 6)], [0, 0, 1, 0, 2, 0]);
  // Entries: width, height, 0 colours, reserved, 1 plane, 32 bpp, byte size, offset.
  assert.deepEqual([...ico.subarray(6, 22)], [16, 16, 0, 0, 1, 0, 32, 0, 3, 0, 0, 0, 38, 0, 0, 0]);
  assert.deepEqual([...ico.subarray(22, 38)], [32, 32, 0, 0, 1, 0, 32, 0, 2, 0, 0, 0, 41, 0, 0, 0]);
  assert.deepEqual([...ico.subarray(38)], [1, 2, 3, 4, 5]);
});

test("stores a 256px image as size 0, as the format requires", () => {
  const ico = toIco([{ size: 256, png: Buffer.from([9]) }]);
  assert.deepEqual([...ico.subarray(6, 8)], [0, 0]);
});
