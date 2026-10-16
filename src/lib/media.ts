/**
 * Turns the scanned folder contents (MediaManifest) plus the registry in
 * src/config/media.ts into the items each section displays.
 * Pure functions: safe to use on the server and in the browser.
 */
import {
  CERTIFICATES,
  CERTIFICATE_CATEGORY_PREFIXES,
  CERTIFICATE_CATEGORY_ORDER,
  GALLERY_PHOTOS,
  GALLERY_CATEGORY_PREFIXES,
  GALLERY_CATEGORY_ORDER,
  MEDIA_SETTINGS,
  PROJECT_IMAGE_PREFIX,
} from "../config/media";

export interface MediaFile {
  image?: string;
  imageExt?: string;
  pdf?: string;
}
export type MediaFiles = Record<string, MediaFile>;
export interface MediaManifest {
  certificates: MediaFiles;
  images: MediaFiles;
}

/** One thing the viewer can show: a certificate or a photo. */
export interface ViewerItem {
  key: string;
  kind: "certificate" | "photo";
  title: string;
  subtitle?: string;
  category?: string;
  date?: string;
  image?: string;
  pdf?: string;
}

/** A section entry can point to one certificate or several. */
export type CertificateRef = string | string[];

/** "Edu HSC.jpg", "edu_hsc" and "EDU-HSC" all become "edu-hsc". Used for filenames and for refs in data.ts. */
export const normaliseRef = (key: string) =>
  key
    .trim()
    .toLowerCase()
    // "edu-hsc.jpg.jpg" (Windows hides extensions) -> "edu-hsc"
    .replace(/(\.(?:jpe?g|png|webp|avif|gif|pdf))+$/, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export const toList = (ref?: CertificateRef) => (ref ? (Array.isArray(ref) ? ref : [ref]) : []).map(normaliseRef);

export const hasFile = (item: ViewerItem) => Boolean(item.image || item.pdf);

/** Items to actually render: files that exist, plus placeholders when that setting is on. */
export const visibleItems = (items: ViewerItem[]) =>
  MEDIA_SETTINGS.showPlaceholders ? items : items.filter(hasFile);

const ACRONYMS: Record<string, string> = {
  ieee: "IEEE", diu: "DIU", iot: "IoT", ai: "AI", ml: "ML", bsc: "B.Sc.", hsc: "HSC", ssc: "SSC",
  iit: "IIT", bcc: "BCC", esrc: "ESRC", sb: "SB", cs: "CS", cse: "CSE", ui: "UI", ux: "UX",
};

/** "hackathon-champion-2027" -> "Hackathon Champion 2027" */
export const prettifyName = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => ACRONYMS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const trailingYear = (slug: string) => slug.match(/(?:^|-)((?:19|20)\d{2})$/)?.[1];

/* ------------------------------ certificates ------------------------------ */

const certificatePrefix = (key: string) => {
  const prefix = Object.keys(CERTIFICATE_CATEGORY_PREFIXES)
    .sort((a, b) => b.length - a.length)
    .find((p) => key.startsWith(`${p}-`));
  return prefix;
};

export function resolveCertificate(manifest: MediaManifest, rawKey: string): ViewerItem {
  const key = normaliseRef(rawKey);
  const def = CERTIFICATES[key];
  const files = manifest.certificates[key] ?? {};
  const prefix = certificatePrefix(key);
  const category = def?.category ?? (prefix ? CERTIFICATE_CATEGORY_PREFIXES[prefix] : "Other");
  const bare = prefix ? key.slice(prefix.length + 1) : key;
  return {
    key,
    kind: "certificate",
    title: def?.title ?? prettifyName(trailingYear(bare) ? bare.replace(/-?(?:19|20)\d{2}$/, "") || bare : bare),
    subtitle: def?.issuer,
    date: def?.date ?? trailingYear(bare),
    category,
    image: files.image,
    pdf: files.pdf,
  };
}

/** Certificates for one section entry (only the ones that exist, unless placeholders are on). */
export const certificatesFor = (manifest: MediaManifest, ref?: CertificateRef, includeMissing = false) => {
  const items = toList(ref).map((k) => resolveCertificate(manifest, k));
  return includeMissing ? items : visibleItems(items);
};

/** Everything for the Certificates gallery: registry order first, then any extra uploaded files. */
export function certificateGallery(manifest: MediaManifest): ViewerItem[] {
  const registered = Object.entries(CERTIFICATES)
    .filter(([, def]) => def.gallery !== false)
    .map(([key]) => resolveCertificate(manifest, key));

  const extras = Object.keys(manifest.certificates)
    .filter((key) => !(key in CERTIFICATES))
    .sort()
    .map((key) => resolveCertificate(manifest, key));

  return visibleItems([...registered, ...extras]);
}

export const sortByCategoryOrder = (categories: string[], order: string[]) =>
  [...new Set(categories)].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.localeCompare(b);
  });

export const CERTIFICATE_ORDER = CERTIFICATE_CATEGORY_ORDER;
export const GALLERY_ORDER = GALLERY_CATEGORY_ORDER;

/* --------------------------------- images --------------------------------- */

export const imageUrl = (manifest: MediaManifest, key: string) => manifest.images[normaliseRef(key)]?.image;

/** project-<slug>.jpg (cover), project-<slug>-2.jpg, project-<slug>-3.jpg ... in that order. */
export function projectPhotos(
  manifest: MediaManifest,
  slug: string,
  title: string,
  subtitle?: string
): ViewerItem[] {
  const base = `${PROJECT_IMAGE_PREFIX}${normaliseRef(slug)}`;
  const found: { n: number; key: string; url: string }[] = [];
  for (const [key, file] of Object.entries(manifest.images)) {
    if (!file.image) continue;
    if (key === base) found.push({ n: 1, key, url: file.image });
    else {
      const m = key.match(new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(\\d+)$`));
      if (m) found.push({ n: Number(m[1]), key, url: file.image });
    }
  }
  return found
    .sort((a, b) => a.n - b.n)
    .map((f) => ({ key: f.key, kind: "photo" as const, title, subtitle, category: "Projects", image: f.url }));
}

const galleryPrefix = (key: string) => {
  if (!key.startsWith("gallery-")) return undefined;
  const rest = key.slice("gallery-".length);
  return Object.keys(GALLERY_CATEGORY_PREFIXES).find((p) => rest.startsWith(`${p}-`) || rest === p);
};

/**
 * One gallery photo. `base` is the entry it belongs to: for "gallery-events-iit-bombay-2"
 * the base is "gallery-events-iit-bombay", so it gets that entry's title and category.
 */
function resolveGalleryPhoto(manifest: MediaManifest, key: string, base = key): ViewerItem {
  const def = GALLERY_PHOTOS[base];
  const prefix = galleryPrefix(base);
  const bare = prefix ? base.slice(`gallery-${prefix}-`.length) : base.replace(/^gallery-/, "");
  return {
    key,
    kind: "photo",
    title: def?.title ?? prettifyName(bare),
    subtitle: def?.subtitle,
    category: prefix ? GALLERY_CATEGORY_PREFIXES[prefix] : "Other",
    image: manifest.images[key]?.image,
  };
}

/** Everything for the Images gallery. */
export function photoGallery(
  manifest: MediaManifest,
  projects: { title: string; subtitle?: string; photos?: string }[]
): ViewerItem[] {
  // Extra photos of an entry: "<entry>-2", "<entry>-3" ... (1 or 2 digits, so a year like -2026 is not one).
  const extraPhotos = new Map<string, { n: number; key: string }[]>();
  const standalone: string[] = [];
  for (const key of Object.keys(manifest.images)) {
    if (!key.startsWith("gallery-") || key in GALLERY_PHOTOS) continue;
    const m = key.match(/^(.*)-(\d{1,2})$/);
    if (m && (m[1] in GALLERY_PHOTOS || m[1] in manifest.images)) {
      const list = extraPhotos.get(m[1]) ?? [];
      list.push({ n: Number(m[2]), key });
      extraPhotos.set(m[1], list);
    } else {
      standalone.push(key);
    }
  }

  // Each entry, followed by its extra photos in number order
  const withExtras = (base: string) => [
    resolveGalleryPhoto(manifest, base),
    ...(extraPhotos.get(base) ?? [])
      .sort((a, b) => a.n - b.n)
      .map(({ key }) => resolveGalleryPhoto(manifest, key, base)),
  ];

  const registered = Object.keys(GALLERY_PHOTOS).flatMap(withExtras);
  const extras = standalone.sort().flatMap(withExtras);

  const projectItems = MEDIA_SETTINGS.includeProjectPhotosInGallery
    ? projects.flatMap((p) => (p.photos ? projectPhotos(manifest, p.photos, p.title, p.subtitle) : []))
    : [];

  return [...visibleItems([...registered, ...extras]), ...projectItems];
}
