"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";
import { MEDIA_SETTINGS } from "../config/media";
import { CERTIFICATE_ORDER, certificateGallery, sortByCategoryOrder } from "../lib/media";
import SectionHeading from "./ui/SectionHeading";
import FilterChips from "./ui/FilterChips";
import MediaThumb from "./media/MediaThumb";
import { useMedia } from "./media/MediaProvider";
import { useFilteredGallery } from "./ui/useFilteredGallery";

const INITIAL_VISIBLE = MEDIA_SETTINGS.certificatesInitiallyVisible;

/** Every certificate in public/certificates, grouped by the filename prefix. */
const Certificates = ({ index = "09" }: { index?: string }) => {
  const { manifest, openViewer } = useMedia();
  const all = useMemo(() => certificateGallery(manifest), [manifest]);
  const categories = useMemo(() => sortByCategoryOrder(all.map((c) => c.category ?? "Other"), CERTIFICATE_ORDER), [all]);
  const { active, changeFilter, counts, filtered, visible, hiddenCount, expanded, setExpanded } = useFilteredGallery(
    all.map((c) => ({ ...c, category: c.category ?? "Other" })),
    INITIAL_VISIBLE
  );

  if (!all.length) return null;

  return (
    <section id="certificates" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading
          index={index}
          title="Certificates"
          meta={
            <>
              {all.length} {all.length === 1 ? "document" : "documents"} <span className="text-[#475569]">·</span>{" "}
              Select any card to open it full size
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visible.map((cert, i) => (
            <button
              key={cert.key}
              type="button"
              onClick={() => openViewer(filtered, i)}
              className="text-left bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden hover:border-[#00f0ff]/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[10/7] overflow-hidden border-b border-[#1e293b]">
                <MediaThumb item={cert} className="transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0a0f1d]/80 border border-[#334155] text-[#00f0ff] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiMaximize2 className="text-sm" />
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#64748b] mb-2">{cert.category}</p>
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#00f0ff] transition-colors">
                  {cert.title}
                </h3>
                {cert.subtitle && <p className="text-sm text-[#94a3b8] mt-1 leading-snug">{cert.subtitle}</p>}
                {cert.date && <p className="font-mono text-xs text-[#475569] mt-auto pt-3">{cert.date}</p>}
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
              {expanded ? "Show less" : `Show all ${filtered.length} certificates`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
