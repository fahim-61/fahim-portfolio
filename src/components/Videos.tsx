"use client";

import React, { useEffect, useState } from "react";
import Portal from "./ui/Portal";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { VIDEOS } from "../config/data";
import { VideoItem } from "../types";
import SectionHeading from "./ui/SectionHeading";
import MediaPlaceholder from "./ui/MediaPlaceholder";
import { useMedia } from "./media/MediaProvider";
import { imageUrl, MediaManifest } from "../lib/media";
import { MEDIA_SETTINGS, VIDEO_IMAGE_PREFIX } from "../config/media";

/** Custom thumbnail public/images/video-<key>.* first, then YouTube's own thumbnail. */
const thumbnailFor = (manifest: MediaManifest, v: VideoItem) =>
  imageUrl(manifest, `${VIDEO_IMAGE_PREFIX}${v.key}`) ||
  (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` : "");

const hasSource = (v: VideoItem) => Boolean(v.youtubeId || v.embedUrl || v.src);

const Videos = ({ index: sectionIndex = "11" }: { index?: string }) => {
  const { manifest } = useMedia();
  const [open, setOpen] = useState<VideoItem | null>(null);
  const videos = MEDIA_SETTINGS.showPlaceholders ? VIDEOS : VIDEOS.filter(hasSource);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!videos.length) return null;

  return (
    <section id="videos" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading
          index={sectionIndex}
          title="Videos"
          meta={
            <>
              {videos.length} {videos.length === 1 ? "video" : "videos"} <span className="text-[#475569]">·</span>{" "}
              Select any video to play it
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {videos.map((video, index) => {
            const thumb = thumbnailFor(manifest, video);
            return (
              <button
                key={video.key}
                type="button"
                onClick={() => setOpen(video)}
                className="relative aspect-video rounded-xl overflow-hidden border border-[#1e293b] hover:border-[#00f0ff]/50 transition-colors group cursor-pointer text-left"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={video.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <MediaPlaceholder variant="video" />
                )}

                {/* Play button */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-[#0a0f1d]/70 border border-[#00f0ff]/60 text-[#00f0ff] flex items-center justify-center backdrop-blur-sm shadow-[0_0_25px_rgba(0,240,255,0.25)] group-hover:scale-110 group-hover:bg-[#00f0ff] group-hover:text-[#0a0f1d] transition-all duration-300">
                    <TbPlayerPlayFilled className="text-2xl ml-0.5" />
                  </span>
                </span>

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0f1d] to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-base md:text-lg font-bold text-white leading-tight">{video.title}</h3>
                  <p className="text-xs md:text-sm text-[#cbd5e1] mt-0.5">
                    {video.subtitle ? `${video.subtitle} · ` : ""}
                    <span className="text-[#00f0ff]/80">{video.category}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#0a0f1d]/95 backdrop-blur-md p-4 md:p-10"
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute top-5 right-5 md:top-8 md:right-10 text-[#94a3b8] hover:text-[#00f0ff] p-2 rounded-full hover:bg-[rgba(0,240,255,0.1)] cursor-pointer"
                aria-label="Close"
              >
                <FiX className="text-2xl" />
              </button>

              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#334155] bg-black shadow-2xl">
                  {open.youtubeId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${open.youtubeId}?autoplay=1&rel=0`}
                      title={open.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : open.embedUrl ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={open.embedUrl}
                      title={open.title}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : open.src ? (
                    <video className="absolute inset-0 w-full h-full" src={open.src} controls autoPlay />
                  ) : (
                    <>
                      <MediaPlaceholder variant="video" large />
                      <div className="absolute inset-0 flex items-end justify-center pb-10">
                        <p className="font-mono text-sm text-[#94a3b8] bg-[#0a0f1d]/80 px-4 py-2 rounded border border-[#1e293b]">
                          Video link will appear here once it is added
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-center mt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00f0ff] mb-1.5">
                    {open.category}
                  </p>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{open.title}</h3>
                  {open.subtitle && <p className="text-sm text-[#94a3b8] mt-1">{open.subtitle}</p>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
};

export default Videos;
