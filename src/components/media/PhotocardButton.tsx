"use client";

import React from "react";
import { FiImage } from "react-icons/fi";
import { imageUrl, normaliseRef, ViewerItem } from "../../lib/media";
import { MEDIA_SETTINGS } from "../../config/media";
import { useMedia } from "./MediaProvider";

interface PhotocardButtonProps {
  /**
   * Photocard image(s) in public/images, by filename without extension.
   * One: "gallery-leadership-esrc-ags"   Several: ["gallery-leadership-esrc-ags", "gallery-leadership-esrc-ags-2"]
   */
  photocard?: string | string[];
  /** Shown under the image in the viewer */
  title: string;
  subtitle?: string;
  category?: string;
  /** Button text. Default: "View Photocard" */
  label?: string;
  className?: string;
}

/**
 * "View Photocard" button for any section entry that has a `photocard` in data.ts.
 * It appears only when the image is uploaded to public/images
 * (or always, if MEDIA_SETTINGS.alwaysShowPhotoButtons is true).
 */
const PhotocardButton = ({
  photocard,
  title,
  subtitle,
  category = "Leadership",
  label = "View Photocard",
  className = "",
}: PhotocardButtonProps) => {
  const { manifest, openViewer } = useMedia();

  const keys = (photocard ? (Array.isArray(photocard) ? photocard : [photocard]) : []).map(normaliseRef);
  const all = keys.map(
    (key): ViewerItem => ({ key, kind: "photo", title, subtitle, category, image: imageUrl(manifest, key) })
  );
  const uploaded = all.filter((item) => item.image);
  // Nothing uploaded yet: show nothing, or a "Photo will be added soon" card if that setting is on.
  const items = uploaded.length ? uploaded : MEDIA_SETTINGS.alwaysShowPhotoButtons ? all.slice(0, 1) : [];
  if (!items.length) return null;

  const text = uploaded.length > 1 ? `${label.replace(/Photocard$/, "Photocards")} (${uploaded.length})` : label;

  return (
    <button
      type="button"
      onClick={() => openViewer(items, 0)}
      className={`inline-flex items-center gap-1.5 font-mono text-xs text-[#00f0ff] border border-[#00f0ff]/40 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${className}`}
    >
      <FiImage className="text-sm" />
      {text}
    </button>
  );
};

export default PhotocardButton;
