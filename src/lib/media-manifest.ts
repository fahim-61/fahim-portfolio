/**
 * SERVER ONLY. Scans public/certificates and public/images when the site is
 * built (on every deploy) and when a page is requested in `npm run dev`.
 *
 * Each file is keyed by its normalised name without extension, so
 * "Edu-HSC.JPG", "edu_hsc.png" and "edu hsc.pdf" all become "edu-hsc".
 * URLs carry a short content hash (?v=...) so a replaced file with the
 * same name is never served from an old browser cache.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { normaliseRef as normaliseKey, type MediaManifest, type MediaFiles } from "./media";

const IMAGE_EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png", "gif"];
const DOCUMENT_EXTENSIONS = ["pdf"];

function scanFolder(folder: string): MediaFiles {
  const dir = path.join(process.cwd(), "public", folder);
  const result: MediaFiles = {};
  let names: string[] = [];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return result; // folder missing: nothing uploaded yet
  }

  // Deterministic: when two images share a name, the earlier extension in IMAGE_EXTENSIONS wins.
  const rank = (ext: string) => {
    const i = IMAGE_EXTENSIONS.indexOf(ext);
    return i === -1 ? 99 : i;
  };

  for (const name of names.sort()) {
    if (name.startsWith(".") || /^readme/i.test(name)) continue;
    const full = path.join(dir, name);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (!stat.isFile()) continue;

    const dot = name.lastIndexOf(".");
    if (dot <= 0) continue;
    const ext = name.slice(dot + 1).toLowerCase();
    const isImage = IMAGE_EXTENSIONS.includes(ext);
    const isDoc = DOCUMENT_EXTENSIONS.includes(ext);
    if (!isImage && !isDoc) continue;

    const key = normaliseKey(name.slice(0, dot));
    const hash = crypto.createHash("md5").update(fs.readFileSync(full)).digest("hex").slice(0, 8);
    const url = `/${folder}/${encodeURIComponent(name)}?v=${hash}`;

    const entry = (result[key] ??= {});
    if (isImage) {
      if (!entry.image || rank(ext) < rank(entry.imageExt ?? "")) {
        entry.image = url;
        entry.imageExt = ext;
      }
    } else {
      entry.pdf = url;
    }
  }
  return result;
}

export function getMediaManifest(): MediaManifest {
  return {
    certificates: scanFolder("certificates"),
    images: scanFolder("images"),
  };
}
