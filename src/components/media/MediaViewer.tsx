"use client";

import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiDownload, FiExternalLink, FiX } from "react-icons/fi";
import { ViewerItem } from "../../lib/media";
import MediaPlaceholder from "../ui/MediaPlaceholder";
import Portal from "../ui/Portal";
import { usePdfPreview } from "./PdfPreview";

interface MediaViewerProps {
  items: ViewerItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const navBtn =
  "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#334155] bg-[#0f172a]/90 text-[#cbd5e1] hover:text-[#00f0ff] hover:border-[#00f0ff] flex items-center justify-center cursor-pointer transition-colors";

const linkBtn =
  "inline-flex items-center gap-2 font-mono text-xs text-[#00f0ff] border border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 px-3 py-1.5 rounded-md transition-colors";

/** A PDF certificate in the viewer: page 1 drawn as a picture; the browser's own PDF view if drawing fails. */
const PdfPage = ({ url, title }: { url: string; title: string }) => {
  const { src, failed } = usePdfPreview(url);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={title}
        className="max-w-full max-h-[70vh] object-contain rounded-lg border border-[#334155] shadow-2xl bg-white"
      />
    );
  }

  if (failed) {
    return (
      // <object> shows the fallback below on browsers that cannot display PDFs inline (most phones)
      <object
        data={`${url}#view=FitH`}
        type="application/pdf"
        aria-label={title}
        className="w-[min(1000px,92vw)] h-[70vh] rounded-lg border border-[#334155] bg-[#0b1222] shadow-2xl"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
          <div className="relative w-[min(420px,70vw)] aspect-[1.414]">
            <MediaPlaceholder variant="pdf" />
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 bg-[#00f0ff] text-[#0a0f1d] font-semibold text-sm px-5 py-2.5 rounded-md shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <FiExternalLink /> Open PDF certificate
          </a>
        </div>
      </object>
    );
  }

  // Loading
  return (
    <div className="relative w-[min(860px,88vw)] aspect-[1.414] max-h-[70vh] rounded-lg overflow-hidden border border-[#334155]">
      <MediaPlaceholder variant="pdf" large />
      <span className="absolute inset-x-0 bottom-6 text-center font-mono text-xs text-[#94a3b8]">
        Loading certificate…
      </span>
    </div>
  );
};

/** Full-screen viewer shared by every "View Certificate", "View Photos" and gallery card. */
const MediaViewer = ({ items, index, onClose, onIndexChange }: MediaViewerProps) => {
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  const fullSize = item?.image ?? item?.pdf;

  return (
    <Portal>
      <AnimatePresence>
        {open && item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex flex-col bg-[#0a0f1d]/95 backdrop-blur-md"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-5 md:px-10 pt-5 md:pt-8"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs md:text-sm text-[#94a3b8]">
                {items.length > 1 ? `${index! + 1} / ${items.length}` : ""}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-[#94a3b8] hover:text-[#00f0ff] transition-all p-2 cursor-pointer rounded-full hover:bg-[rgba(0,240,255,0.1)]"
                aria-label="Close"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Media */}
            <div className="relative flex-grow flex items-center justify-center px-4 md:px-24 py-3 min-h-0">
              <motion.div
                key={`${item.key}-${index}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg border border-[#334155] shadow-2xl"
                  />
                ) : item.pdf ? (
                  <PdfPage url={item.pdf} title={item.title} />
                ) : (
                  <div className="relative w-[min(860px,88vw)] aspect-[16/10] max-h-[70vh] rounded-lg overflow-hidden border border-[#334155]">
                    <MediaPlaceholder
                      variant={item.kind === "certificate" ? "certificate" : "photo"}
                      large
                      note={item.kind === "certificate" ? "Certificate will be added soon" : "Photo will be added soon"}
                    />
                  </div>
                )}
              </motion.div>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className={`${navBtn} left-2 md:left-8`}
                    aria-label="Previous"
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className={`${navBtn} right-2 md:right-8`}
                    aria-label="Next"
                  >
                    <FiChevronRight className="text-xl" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="px-6 pb-7 md:pb-9 text-center" onClick={(e) => e.stopPropagation()}>
              {item.category && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00f0ff] mb-1.5">
                  {item.category}
                </p>
              )}
              <h3 className="text-lg md:text-2xl font-bold text-white">{item.title}</h3>
              {(item.subtitle || item.date) && (
                <p className="text-sm text-[#94a3b8] mt-1">
                  {item.subtitle}
                  {item.subtitle && item.date && " · "}
                  {item.date && <span className="font-mono">{item.date}</span>}
                </p>
              )}
              {fullSize && (
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <a href={fullSize} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                    <FiExternalLink /> Open full size
                  </a>
                  {item.image && item.pdf && (
                    <a href={item.pdf} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                      <FiDownload /> PDF version
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default MediaViewer;
