/**
 * ONE-TIME image resizer (v2 — fixed for Windows).
 *
 * v1 failed with "UNKNOWN: unknown error, open ...webp" on every file: that's
 * libvips (inside sharp) failing to open the path directly on Windows. The fix:
 * Node reads each file into a Buffer itself, and sharp processes the Buffer —
 * so libvips never touches the filesystem.
 *
 * Shrinks every webp in public/images to longest edge <= 1920px, quality 78
 * (~4 MB -> ~200 KB, no visible loss at display size). Logos are left alone.
 *
 * RUN (from the `berry` project root, where package.json is):
 *   1.  (sharp is already installed from before)
 *   2.  STOP the dev server first (Ctrl+C in the `npm run dev` terminal) so no
 *       process is holding the image files while we overwrite them.
 *   3.  node resize-images.mjs
 *   4.  Remove-Item -Recurse -Force .next   (then `npm run dev`, hard-refresh)
 *
 * Edits files IN PLACE. Copy public/images somewhere first if you want a backup.
 */

import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DIR = "public/images";
const MAX_EDGE = 1920;
const QUALITY = 78;

const files = readdirSync(DIR).filter((f) => /\.webp$/i.test(f));
if (!files.length) {
  console.error(`No .webp files found in ${DIR} - run this from the project root.`);
  process.exit(1);
}

let totalBefore = 0, totalAfter = 0, done = 0, skipped = 0, failed = 0;

for (const f of files) {
  const p = join(DIR, f);
  const before = statSync(p).size;
  try {
    // Node reads the path (handles spaces / Windows quirks); sharp gets a Buffer.
    const input = readFileSync(p);

    const meta = await sharp(input).metadata();
    const longest = Math.max(meta.width || 0, meta.height || 0);

    if (longest <= MAX_EDGE && before <= 400 * 1024) {
      skipped++; totalBefore += before; totalAfter += before; continue;
    }

    const out = await sharp(input)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    writeFileSync(p, out);
    done++; totalBefore += before; totalAfter += out.length;
    console.log(`${f.padEnd(34)} ${longest}px  ${(before/1e6).toFixed(2)}MB -> ${(out.length/1e3).toFixed(0)}KB`);
  } catch (e) {
    failed++;
    console.error(`  ! failed on ${f}: ${e.message}`);
  }
}

console.log(`\nDone. resized ${done}, already-fine ${skipped}, failed ${failed}.  Total: ${(totalBefore/1e6).toFixed(1)}MB -> ${(totalAfter/1e6).toFixed(1)}MB`);
if (failed) console.log("\nIf files still failed: stop the dev server (it can lock the files), then run this again.");
