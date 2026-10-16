"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MediaManifest, ViewerItem } from "../../lib/media";
import MediaViewer from "./MediaViewer";

interface MediaContextValue {
  manifest: MediaManifest;
  /** Open the full-screen viewer on a list of items, starting at `index`. */
  openViewer: (items: ViewerItem[], index?: number) => void;
}

const MediaContext = createContext<MediaContextValue | null>(null);

/** Holds the scanned folder contents and the one shared full-screen viewer. */
export function MediaProvider({ manifest, children }: { manifest: MediaManifest; children: React.ReactNode }) {
  const [viewer, setViewer] = useState<{ items: ViewerItem[]; index: number } | null>(null);

  const openViewer = useCallback((items: ViewerItem[], index = 0) => {
    if (items.length) setViewer({ items, index });
  }, []);
  const close = useCallback(() => setViewer(null), []);
  const setIndex = useCallback((index: number) => setViewer((v) => (v ? { ...v, index } : v)), []);

  const value = useMemo(() => ({ manifest, openViewer }), [manifest, openViewer]);

  return (
    <MediaContext.Provider value={value}>
      {children}
      <MediaViewer items={viewer?.items ?? []} index={viewer ? viewer.index : null} onClose={close} onIndexChange={setIndex} />
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error("useMedia must be used inside <MediaProvider>");
  return ctx;
}
