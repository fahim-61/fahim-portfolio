"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Renders children into <body> so modals sit above the navbar and the
 * railway frame (the <main> wrapper creates its own stacking context).
 */
const Portal = ({ children }: { children: ReactNode }) => {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  if (!isClient) return null;
  return createPortal(children, document.body);
};

export default Portal;
