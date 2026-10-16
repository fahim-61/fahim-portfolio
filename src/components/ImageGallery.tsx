"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MEDIA_SETTINGS } from "../config/media";
import { PROJECTS } from "../config/data";
import { GALLERY_ORDER, photoGallery, sortByCategoryOrder } from "../lib/media";
import SectionHeading from "./ui/SectionHeading";
import FilterChips from "./ui/FilterChips";
import MediaThumb from "./media/MediaThumb";
import { useMedia } from "./media/MediaProvider";
import { useFilteredGallery } from "./ui/useFilteredGallery";

const INITIAL_VISIBLE = MEDIA_SETTINGS.photosInitiallyVisible;

/** gallery-*.jpg files (plus project photos) from public/images. */
const ImageGallery = ({ index = "10" }: { index?: string }) => {
  const { manifest, openViewer } = useMedia();
  const all = useMemo(
    () => photoGallery(manifest, PROJECTS).map((p) => ({ ...p, category: p.category ?? "Other" })),
    [manifest]
  );
  const categories = useMemo(() => sortByCategoryOrder(all.map((p) => p.category), GALLERY_ORDER), [all]);
  const { active, changeFilter, counts, filtered, visible, hiddenCount, expanded, setExpanded } = useFilteredGallery(
    all,
    INITIAL_VISIBLE
  );

  if (!all.length) return null;

  return (
    <section id="images" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading
          index={index}
          title="Images"
          meta={
            <>
              {all.length} {all.length === 1 ? "photo" : "photos"} <span className="text-[#475569]">·</span> Select any
              photo to open it full size
            </>
          }
        />

        <div className="mb-8" data-aos="fade-up">
          <FilterChips categories={categories} counts={counts} total={all.length} active={active} onChange={changeFilter} />
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((photo, i) => (
            <button
              key={photo.key}
              type="button"
              onClick={() => openViewer(filtered, i)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#1e293b] hover:border-[#00f0ff]/50 transition-colors group cursor-pointer text-left"
            >
              <MediaThumb item={photo} fit="cover" className="transition-transform duration-700 group-hover:scale-105" />

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h3 className="text-base md:text-lg font-bold text-white leading-tight group-hover:text-[#00f0ff] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs md:text-sm text-[#cbd5e1] mt-0.5">
                  {photo.subtitle ? `${photo.subtitle} · ` : ""}
                  <span className="text-[#00f0ff]/80">{photo.category}</span>
                </p>
              </div>
            </button>
          ))}
        </motion.div>

        {(hiddenCount > 0 || expanded) && filtered.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="font-mono text-sm text-[#00f0ff] border border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 px-6 py-2.5 rounded-md transition-colors cursor-pointer"
            >
              {expanded ? "Show less" : `Show all ${filtered.length} photos`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;
