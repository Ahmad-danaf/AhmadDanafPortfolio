// Code 39 barcode. Each character is 5 bars and 4 spaces, three of them wide.
// Returns modules for an SVG to draw: 1 = bar, 0 = space, wide = 3 modules.

// Which 2 of the 5 bars are wide, for the ten characters of each table row.
const WIDE_BARS = ["10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010", "00110"];

// Each row of ten characters shares the position of its one wide space.
const ROWS: readonly [string, number][] = [
  ["1234567890", 1],
  ["ABCDEFGHIJ", 2],
  ["KLMNOPQRST", 3],
  ["UVWXYZ-. *", 0],
];

function encodeChar(char: string): string {
  for (const [chars, wideSpace] of ROWS) {
    const i = chars.indexOf(char);
    if (i === -1) continue;
    let out = "";
    for (let k = 0; k < 5; k++) {
      out += WIDE_BARS[i][k] === "1" ? "111" : "1";
      if (k < 4) out += k === wideSpace ? "000" : "0";
    }
    return out;
  }
  throw new Error(`Code 39 cannot encode "${char}"`);
}

export function code39(text: string): string {
  return `*${text}*`.split("").map(encodeChar).join("0");
}
