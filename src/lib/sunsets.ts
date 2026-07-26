import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { data } from "@/data/data";

export interface SunsetPhoto {
  src: string;
  alt: string;
  /** Tiny base64 preview used as next/image's blur placeholder. */
  blurDataURL?: string;
}

const IMAGE_RE = /\.(webp|jpe?g|png|avif)$/i;

/**
 * Generates a tiny blurred base64 preview so next/image can render a
 * placeholder in the SSR HTML — visible before hydration and while the
 * full photo streams in. Returns undefined if the file can't be read.
 */
async function makeBlurDataURL(file: string): Promise<string | undefined> {
  try {
    const buffer = await sharp(file)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    return `data:image/webp;base64,${buffer.toString("base64")}`;
  } catch {
    return undefined;
  }
}

/**
 * Lists every web-ready image in public/sunsets at build time.
 * Alt text comes from the curated list in data.tsx when available.
 * Raw HEIC/oversized photos must first be converted via `npm run sunsets`.
 */
export async function getSunsetPhotos(): Promise<SunsetPhoto[]> {
  const dir = path.join(process.cwd(), "public", "sunsets");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return Promise.all(
    files
      .filter((file) => IMAGE_RE.test(file))
      .sort()
      .map(async (file) => {
        const src = `/sunsets/${file}`;
        const curated = data.sunsets.find((photo) => photo.src === src);
        return {
          src,
          alt: curated?.alt ?? "Landscape photograph",
          blurDataURL: await makeBlurDataURL(path.join(dir, file)),
        };
      }),
  );
}
