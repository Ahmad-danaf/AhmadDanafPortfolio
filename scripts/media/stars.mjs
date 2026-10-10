// Renders a seamless, transparent star tile for the CSS star field.
// Usage: node scripts/media/stars.mjs   → public/media/art/stars.webp
import sharp from "sharp";

const SIZE = 800;
const COUNT = 420;

// Small deterministic PRNG so the tile is reproducible.
let seed = 42;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const circles = [];
for (let i = 0; i < COUNT; i++) {
  const x = rand() * SIZE;
  const y = rand() * SIZE;
  const r = rand() < 0.9 ? 0.6 + rand() * 0.5 : 1.1 + rand() * 0.6;
  const a = (0.35 + rand() * 0.65).toFixed(2);
  // Draw wrapped copies near the edges so the tile repeats without seams.
  for (const dx of [-SIZE, 0, SIZE])
    for (const dy of [-SIZE, 0, SIZE])
      circles.push(`<circle cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="${r.toFixed(2)}" fill="#fff" fill-opacity="${a}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">${circles.join("")}</svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 80, alphaQuality: 80 }).toFile("public/media/art/stars.webp");
console.log("wrote public/media/art/stars.webp");
