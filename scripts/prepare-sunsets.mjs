/**
 * Converts raw photos dropped into public/sunsets/ (HEIC, JPEG, PNG) into
 * resized, metadata-stripped WebPs named sunset-NN.webp, then moves the
 * originals to sunsets-originals/ (gitignored) so they are never deployed.
 *
 * HEIC decoding uses macOS `sips` (sharp cannot read HEIC).
 *
 * Usage: npm run sunsets
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const SUNSETS_DIR = path.join(ROOT, "public", "sunsets");
const ORIGINALS_DIR = path.join(ROOT, "sunsets-originals");

const PROCESSED_RE = /^sunset-(\d+)\.webp$/;
const RAW_RE = /\.(heic|heif|jpe?g|png)$/i;
const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 82;

const entries = fs.readdirSync(SUNSETS_DIR);
const rawFiles = entries.filter((f) => RAW_RE.test(f)).sort();
let nextNumber =
  Math.max(
    0,
    ...entries
      .map((f) => PROCESSED_RE.exec(f))
      .filter(Boolean)
      .map((m) => parseInt(m[1], 10)),
  ) + 1;

if (rawFiles.length === 0) {
  console.log("Nothing to convert: public/sunsets has no raw HEIC/JPEG/PNG files.");
  process.exit(0);
}

fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sunsets-"));

for (const file of rawFiles) {
  const src = path.join(SUNSETS_DIR, file);
  let decodable = src;

  if (/\.hei[cf]$/i.test(file)) {
    if (process.platform !== "darwin") {
      console.error(`Skipping ${file}: HEIC conversion requires macOS (sips).`);
      continue;
    }
    decodable = path.join(tmpDir, `${file}.jpg`);
    execFileSync("sips", [
      "-Z", String(MAX_DIMENSION * 2),
      "-s", "format", "jpeg",
      "-s", "formatOptions", "95",
      src,
      "--out", decodable,
    ], { stdio: "ignore" });
  }

  const outName = `sunset-${String(nextNumber).padStart(2, "0")}.webp`;
  const outPath = path.join(SUNSETS_DIR, outName);

  // sharp strips EXIF/GPS metadata by default; rotate() bakes in EXIF orientation first
  const info = await sharp(decodable)
    .rotate()
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  fs.renameSync(src, path.join(ORIGINALS_DIR, file));
  console.log(`${file} -> ${outName} (${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB)`);
  nextNumber += 1;
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log(`Done. Originals moved to sunsets-originals/.`);
