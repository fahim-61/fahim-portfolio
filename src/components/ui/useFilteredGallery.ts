"use client";

import { useMemo, useState } from "react";

/** Filtering + "show more" state shared by the certificate and photo galleries. */
export function useFilteredGallery<T extends { category: string }>(items: T[], initialVisible: number) {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const item of items) c[item.category] = (c[item.category] ?? 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  const visible = expanded ? filtered : filtered.slice(0, initialVisible);
  const hiddenCount = filtered.length - visible.length;

  const changeFilter = (category: string) => {
    setActive(category);
    setExpanded(false);
  };

  return { active, changeFilter, counts, filtered, visible, hiddenCount, expanded, setExpanded };
}
