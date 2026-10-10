// Turns raw screenshots, recordings and generated art into web-ready media.
// Usage:
//   node scripts/media/encode.mjs poster <input> <output.webp> [width]
//   node scripts/media/encode.mjs clip <input> <output.webm> [startSec] [durationSec] [crf]
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

export async function toPoster(input, output, width = 1280) {
  mkdirSync(path.dirname(output), { recursive: true });
  await sharp(input, { animated: false })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);
}

export function toClip(input, output, { start = 0, duration = 7, width = 1280, crf = 42 } = {}) {
  mkdirSync(path.dirname(output), { recursive: true });
  execFileSync(
    ffmpegPath,
    [
      "-y", "-ss", String(start), "-t", String(duration), "-i", input,
      "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(crf), "-row-mt", "1",
      "-pix_fmt", "yuv420p", "-vf", `scale=${width}:-2`, output,
    ],
    { stdio: "inherit" },
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [kind, input, output, a, b, c] = process.argv.slice(2);
  if (kind === "poster") await toPoster(input, output, a ? Number(a) : undefined);
  else if (kind === "clip")
    toClip(input, output, {
      start: Number(a ?? 0),
      duration: Number(b ?? 7),
      crf: c ? Number(c) : undefined,
    });
  else {
    console.error("usage: encode.mjs poster|clip <input> <output> [...]");
    process.exit(1);
  }
}
