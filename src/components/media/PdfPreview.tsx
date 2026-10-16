"use client";

/**
 * Draws page 1 of a PDF certificate as a normal picture, so PDF certificates
 * look like image certificates in the Certificates gallery and the viewer.
 * pdf.js (Mozilla's PDF reader) is loaded only when a PDF is actually shown.
 */
import React, { useEffect, useState } from "react";
import MediaPlaceholder from "../ui/MediaPlaceholder";

type PdfJs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

/** Pixel width of the rendered page: sharp enough for the full-screen viewer, reused for thumbnails. */
const RENDER_WIDTH = 1600;

let pdfjsPromise: Promise<PdfJs> | null = null;
const loadPdfJs = () => {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/legacy/build/pdf.mjs").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      return pdfjs;
    });
  }
  return pdfjsPromise;
};

// One render per PDF for the whole page, done one at a time so phones stay smooth.
const cache = new Map<string, Promise<string>>();
let queue: Promise<unknown> = Promise.resolve();

export function renderPdfFirstPage(url: string): Promise<string> {
  const cached = cache.get(url);
  if (cached) return cached;

  const job = queue.then(async () => {
    const pdfjs = await loadPdfJs();
    const doc = await pdfjs.getDocument({ url }).promise;
    try {
      const page = await doc.getPage(1);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: RENDER_WIDTH / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not available");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
      return canvas.toDataURL("image/jpeg", 0.9);
    } finally {
      void doc.destroy();
    }
  });

  queue = job.catch(() => undefined);
  cache.set(url, job);
  job.catch(() => cache.delete(url));
  return job;
}

/** Rendered page-1 image for a PDF url: { src } when ready, { failed } if it cannot be drawn. */
export function usePdfPreview(url?: string) {
  const [result, setResult] = useState<{ url?: string; src?: string; failed?: boolean }>({});

  useEffect(() => {
    if (!url) return;
    let active = true;
    renderPdfFirstPage(url).then(
      (src) => active && setResult({ url, src }),
      () => active && setResult({ url, failed: true }),
    );
    return () => {
      active = false;
    };
  }, [url]);

  return result.url === url ? result : {};
}

/** Card thumbnail for a PDF certificate: the real first page, or the PDF tile while it loads / if it fails. */
export const PdfThumb = ({ url, alt, className = "" }: { url: string; alt: string; className?: string }) => {
  const { src } = usePdfPreview(url);
  if (!src) return <MediaPlaceholder variant="pdf" />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover object-top ${className}`} />
  );
};
