"use client";

import React from "react";
import { imageUrl } from "../../lib/media";
import { PROFILE_IMAGE } from "../../config/media";
import { useMedia } from "./MediaProvider";

/** Hero photo from public/images/profile.* ; shows initials if it is missing. */
const ProfilePhoto = ({ name }: { name: string }) => {
  const { manifest } = useMedia();
  const src = imageUrl(manifest, PROFILE_IMAGE);

  if (!src) {
    const initials = name
      .replace(/^Md\.?\s+/i, "")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1a1240] bg-grid-pattern">
        <span className="text-6xl md:text-7xl font-bold text-[#00f0ff]/70 tracking-widest">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
  );
};

export default ProfilePhoto;
